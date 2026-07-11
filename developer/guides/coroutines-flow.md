# Coroutines & Flow

KBC has a full coroutine runtime, `suspend` functions, structured
concurrency, `withContext`, `async` / `await`, `Flow` operators, and
`StateFlow` / `SharedFlow`. Everything is wired to the screen's
`viewModelScope`, so cancellation cascades cleanly when the user
navigates away.

---

## Suspend functions

Write them like normal Kotlin:

```kotlin
@KetoyCapabilityStub(id = 0x4001, name = "FIND_TODO")
suspend fun findTodo(id: Long): List<Any?>? = error(STUB_MSG)

@KetoyViewModel
class TodoDetailViewModel : ViewModel() {
    private val _todo = MutableStateFlow<List<Any?>?>(null)
    val todo: StateFlow<List<Any?>?> = _todo.asStateFlow()

    fun load(id: Long) {
        viewModelScope.launch {
            _todo.value = findTodo(id)      // suspends
        }
    }
}
```

The compiler lowers each suspend call site into a state machine using
the `INVOKE_CAPABILITY_SUSPEND → SUSPEND_POINT(contId) → RESUME_VALUE(dst)`
opcode chain. Each site gets a unique continuation ID; the runtime
continuation table dispatches resumption.

### What suspends?

- Any `@KetoyCapabilityStub` declared `suspend`.
- `withContext(Dispatchers.IO) { … }`, recognised via the
  `DISPATCHER_IO` / `DISPATCHER_DEFAULT` / `DISPATCHER_MAIN` /
  `DISPATCHER_UNCONFINED` capabilities (IDs `0x0B00`–`0x0B03`).
- `Flow.collect { … }`.
- KBC→KBC suspend calls (with a small extra-allocation cost; see
  [KNOWN_ISSUES.md](../../../KNOWN_ISSUES.md) #1).

---

## Structured concurrency

```kotlin
data class DashboardUiState(
    val users: List<Any?> = emptyList(),
    val orders: List<Any?> = emptyList(),
)

@KetoyViewModel
class DashboardViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(DashboardUiState())
    val uiState: StateFlow<DashboardUiState> = _uiState.asStateFlow()

    init {
        viewModelScope.launch {
            val users = async { fetchUsers() }
            val orders = async { fetchOrders() }
            _uiState.value = DashboardUiState(users.await(), orders.await())
        }
    }
}
```

The VM owns a `SupervisorJob`-backed child scope. Clearing the screen
cancels `viewModelScope`, which cascades to every coroutine launched inside.
`CancellationException` propagates correctly; other exceptions inside
`viewModelScope.launch { … }` are caught & logged (matching Android
`viewModelScope` semantics).

---

## `withContext`

```kotlin
suspend fun parseLargePayload(json: String): Result {
    return withContext(Dispatchers.IO) {
        // Heavy CPU work, runs on the IO dispatcher.
        Json.decodeFromString<Result>(json)
    }
}
```

`Dispatchers.IO` / `.Default` / `.Main` / `.Unconfined` are resolved
through the four standard dispatcher capabilities, your `KetoyConfig`
gets them for free via `registerCoreCapabilities`.

---

## Flow

### Collecting into state

```kotlin
@KetoyCapabilityStub(id = 0x4000, name = "OBSERVE_TODOS")
fun observeTodos(): Flow<List<Any?>> = error(STUB_MSG)

@KetoyViewModel
class TodoListViewModel : ViewModel() {
    private val _todos = MutableStateFlow<List<Any?>>(emptyList())
    val todos: StateFlow<List<Any?>> = _todos.asStateFlow()

    init {
        viewModelScope.launch {
            observeTodos().collect { todos ->
                _todos.value = todos
            }
        }
    }
}
```

When the screen leaves the back stack, `viewModelScope` cancels and the
collection stops automatically.

### `collectAsState` from `@KetoyComposable`

For a one-shot subscription inside a composable:

```kotlin
@KetoyComposable @KetoyEntryPoint
@Composable
fun TodoList() {
    val todos by observeTodos().collectAsState(initial = emptyList<Any?>())
    Column {
        todos.forEach { todo ->
            // …
        }
    }
}
```

Under the hood this becomes a `COLLECT_AS_STATE` opcode that returns a
`StateFlow` to the slot table.

### Operators

All standard `Flow` operators map onto KBC capabilities at IDs
`0x0C00`–`0x0C08`:

| Operator | Capability |
|---|---|
| `map` | `FLOW_MAP` |
| `filter` | `FLOW_FILTER` |
| `flatMapLatest` | `FLOW_FLAT_MAP_LATEST` |
| `combine` | `FLOW_COMBINE` |
| `take` | `FLOW_TAKE` |
| `debounce` | `FLOW_DEBOUNCE` |
| `distinctUntilChanged` | `FLOW_DISTINCT_UNTIL_CHANGED` |
| `MutableStateFlow(initial)` | `STATE_FLOW_CREATE` |
| `MutableSharedFlow(replay)` | `SHARED_FLOW_CREATE` |

Usage looks like vanilla Kotlin:

```kotlin
viewModelScope.launch {
    observeTodos()
        .map { it.size }
        .distinctUntilChanged()
        .collect { count -> _todoCount.value = count }
}
```

---

## `async` / `await`

```kotlin
viewModelScope.launch {
    val a = async { fetchA() }
    val b = async { fetchB() }
    val c = async { fetchC() }
    _result.value = listOf(a.await(), b.await(), c.await())
}
```

KBC opcodes used: `LAUNCH(fnIdx, args, scope)`,
`ASYNC(dst, fnIdx, args, scope)`, `AWAIT(dst, deferredReg)`.

---

## `MutableStateFlow` / `MutableSharedFlow` directly

```kotlin
@KetoyViewModel
class SearchViewModel : ViewModel() {

    private val queryFlow = MutableStateFlow("")
    private val _results = MutableStateFlow<List<Any?>>(emptyList())
    val results: StateFlow<List<Any?>> = _results.asStateFlow()

    init {
        viewModelScope.launch {
            queryFlow
                .debounce(300)
                .filter { it.isNotBlank() }
                .flatMapLatest { search(it) }
                .collect { _results.value = it }
        }
    }

    fun updateQuery(query: String) {
        queryFlow.value = query
    }
}
```

`MutableStateFlow(initial)` calls into the `STATE_FLOW_CREATE` capability
which returns a real `MutableStateFlow<Any?>` instance.

---

## What you can't do

| You write | Why it fails |
|---|---|
| `GlobalScope.launch { … }` | `GlobalScopeUsage` compile error, leaks across screens. |
| `runBlocking { … }` | `GlobalScopeUsage`. Use `viewModelScope.launch` instead. |
| `CoroutineScope(Dispatchers.Default).launch { … }` | `GlobalScopeUsage`. Custom scopes aren't structured. |
| `select { … }` | Not in the standard capability set. |
| Custom `CoroutineContext` elements | Same. |
| `coroutineScope { … }` block | Not yet supported. Use `viewModelScope.launch` + structured children. |

---

## Common patterns

### Cancellable polling

```kotlin
viewModelScope.launch {
    while (isActive) {
        _ping.value = pingServer()
        delay(5000)
    }
}
```

`isActive` is a property on `CoroutineScope`. `delay` is a built-in
suspend function. Both work in KBC.

### Refresh-on-pull

```kotlin
fun refresh() {
    viewModelScope.launch {
        _refreshing.value = true
        try {
            _data.value = fetchData()
        } catch (e: CancellationException) {
            throw e
        } catch (e: Throwable) {
            _error.value = e.message ?: "Unknown error"
        } finally {
            _refreshing.value = false
        }
    }
}
```

`try` / `catch` / `finally` works. **Caveat**: catch is currently
catch-all, multi-catch falls through to the first handler. Always
re-throw `CancellationException` explicitly to preserve structured
cancellation.

### Timeouts

```kotlin
viewModelScope.launch {
    try {
        withTimeout(3000) {
            _data.value = fetchData()
        }
    } catch (e: TimeoutCancellationException) {
        _error.value = "Took too long"
    }
}
```

`withTimeout` works because it's implemented in `kotlinx.coroutines`
using the standard suspend mechanism. (`TimeoutCancellationException`
is a `CancellationException` subclass, see the multi-catch caveat
above.)

Next: [Navigation →](navigation.md)
