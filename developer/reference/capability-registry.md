# Capability Registry

The full table of standard library `CapabilityIds` plus the app-specific
range. Every ID below is from
`dev.ketoy.capabilities.core.CapabilityIds` (or the navigation /
runtime modules where noted).

For the **what** and **why**, see the guides (Networking, DataStore,
Room, Navigation, Custom Capability). This page is the **what** in
table form.

---

## ID ranges

| Range | Owner | Purpose |
|---|---|---|
| `0x0001`–`0x00FF` | Layout (legacy) | First-pass capabilities, superseded by adapters in most cases. Don't add new IDs here. |
| `0x0100`–`0x01FF` | Text (legacy) | Same as above. |
| `0x0200`–`0x02FF` | Buttons (legacy) | Same. |
| `0x0300`–`0x03FF` | Media (legacy) | Same. |
| `0x0500`–`0x05FF` | Network | HTTP/SSE. |
| `0x0600`–`0x06FF` | Storage KV | DataStore Preferences. |
| `0x0610`–`0x06FF` | Storage Room | Generic Room operations (typed via `KBCRoomBridge`). |
| `0x0700`–`0x07FF` | Navigation | `NAV_*`. |
| `0x0800`–`0x08FF` | Modifier | Generic Modifier ops (reserved). |
| `0x0900`–`0x09FF` | Platform | Toast / vibrate / clipboard / locale / log. |
| `0x0A00`–`0x0AFF` | ViewModel state | `VM_GET_STATE`, etc. |
| `0x0B00`–`0x0BFF` | Dispatchers | `DISPATCHER_*`. |
| `0x0C00`–`0x0CFF` | Flow operators | `FLOW_MAP`, etc. |
| `0x4000`–`0x7FFF` | **App-specific** | Your custom capabilities. |

`APP_SPECIFIC_START = 0x4000`. `KBCRoomBridge` enforces `id >= 0x4000`
on all three registration helpers (`suspendCapability`, `flowCapability`,
`syncCapability`).

---

## Network (`0x0500–0x05FF`)

Registered by `CapabilityRegistry.registerNetworkCapabilities(client)`,
which is called transitively by `registerCoreCapabilities(...)`.

| ID | Name | Kind | Signature |
|---|---|---|---|
| `0x0500` | `HTTP_GET` | suspend | `(url: String) -> String` |
| `0x0501` | `HTTP_POST` | suspend | `(url: String, body: String) -> String` |
| `0x0502` | `HTTP_PUT` | suspend | `(url: String, body: String) -> String` |
| `0x0503` | `HTTP_DELETE` | suspend | `(url: String) -> String` |
| `0x0504` | `HTTP_REQUEST` | suspend | `(request: KetoyHttpRequest) -> KetoyHttpResponse` |
| `0x0505` | `SSE_SUBSCRIBE` | flow | `(url: String) -> Flow<String>` |
| `0x0506` | `WEBSOCKET_CONNECT` | reserved | not registered today |

---

## Storage, KV (`0x0600–0x0605`)

Registered by `registerCoreCapabilities(...)` when you pass a
`DataStore<Preferences>`.

| ID | Name | Kind | Signature |
|---|---|---|---|
| `0x0600` | `KV_GET` | suspend | `(key: String) -> Any?` |
| `0x0601` | `KV_SET` | suspend | `(key: String, value: Any?) -> Unit` |
| `0x0602` | `KV_DELETE` | suspend | `(key: String) -> Unit` |
| `0x0603` | `KV_OBSERVE` | flow | `(key: String) -> Flow<Any?>` |
| `0x0604` | `KV_GET_ALL` | suspend | `() -> Map<String, Any?>` |
| `0x0605` | `KV_CLEAR` | suspend | `() -> Unit` |

Supported value types: `String`, `Int`, `Long`, `Float`, `Double`,
`Boolean`. Anything else throws `KetoyException` on `KV_SET`.

---

## Storage, Room (`0x0610–0x0614`)

Generic IDs. Typed Room operations are app-specific (`0x4000+`) via
`KBCRoomBridge`.

| ID | Name | Kind | Signature |
|---|---|---|---|
| `0x0610` | `DB_QUERY` | suspend | `(query: KBCDbQuery) -> List<Any?>` |
| `0x0611` | `DB_INSERT` | suspend | `(entityClass: String, fields: Map<String, Any?>) -> Long` |
| `0x0612` | `DB_UPDATE` | suspend | `(entityClass: String, id: Long, fields: Map<String, Any?>) -> Int` |
| `0x0613` | `DB_DELETE` | suspend | `(entityClass: String, id: Long) -> Int` |
| `0x0614` | `DB_OBSERVE` | flow | `(query: KBCDbQuery) -> Flow<List<Any?>>` |

In practice, prefer `KBCRoomBridge` + per-operation app-specific IDs.

---

## Navigation (`0x0700–0x0708`)

Registered by
`CapabilityRegistry.registerNavigationCapabilities(navigator)` from
`dev.ketoy.vm:ketoy-capabilities-navigation`.

| ID | Name | Kind | Signature |
|---|---|---|---|
| `0x0700` | `NAV_PUSH` | sync | `(route: String) -> Unit` |
| `0x0701` | `NAV_POP` | sync | `() -> Unit` |
| `0x0702` | `NAV_REPLACE` | sync | `(route: String) -> Unit` |
| `0x0703` | `NAV_POP_TO` | sync | `(route: String, inclusive: Boolean) -> Boolean` |
| `0x0704` | `NAV_DEEP_LINK` | sync | `(uri: String) -> Unit` |
| `0x0705` | `NAV_SET_RESULT` | sync | `(key: String, value: Any?) -> Unit` |
| `0x0706` | `NAV_GET_RESULT` | suspend | `(key: String) -> Any?` |
| `0x0707` | `NAV_CAN_POP` | sync | `() -> Boolean` |
| `0x0708` | `NAV_CURRENT_ROUTE` | sync | `() -> String?` |

---

## Platform (`0x0900–0x090A`)

Registered by `registerPlatformCapabilities(context, analyticsTracker?)`.

| ID | Name | Kind | Signature |
|---|---|---|---|
| `0x0900` | `ANALYTICS_TRACK` | sync | `(event: String, props: Map<String, Any?>) -> Unit` |
| `0x0901` | `TOAST` | sync | `(text: String) -> Unit` |
| `0x0904` | `VIBRATE` | sync | `(durationMs: Long) -> Unit` |
| `0x0902` | `CLIPBOARD_SET` | sync | `(text: String) -> Unit` |
| `0x0903` | `CLIPBOARD_GET` | suspend | `() -> String` |
| `0x0905` | `OPEN_URL` | sync | `(url: String) -> Unit` |
| `0x0906` | `REQUEST_PERMISSION` | suspend | `(permission: String) -> Boolean` |
| `0x0907` | `CHECK_PERMISSION` | sync | `(permission: String) -> Boolean` |
| `0x0908` | `DEVICE_LOCALE` | sync | `() -> String` |
| `0x0909` | `APP_VERSION` | sync | `() -> String` |
| `0x090A` | `LOG` | sync | `(level: Int, tag: String, msg: String) -> Unit` |

`VIBRATE` requires the host APK to declare
`<uses-permission android:name="android.permission.VIBRATE" />`.
`REQUEST_PERMISSION` requires the activity to inherit
`androidx.activity.ComponentActivity` (which `KetoyScreen`'s host
already does).

---

## ViewModel state (`0x0A00–0x0A03`)

Registered by `registerViewModelStateCapabilities(viewModel)`, done
automatically by `KetoyScreen` when it instantiates a
`KetoyVirtualViewModel`.

| ID | Name | Kind | Signature |
|---|---|---|---|
| `0x0A00` | `VM_GET_STATE` | sync | `(key: String) -> Any?` |
| `0x0A01` | `VM_SET_STATE` | sync | `(key: String, value: Any?) -> Unit` |
| `0x0A02` | `VM_OBSERVE_STATE` | flow | `(key: String) -> Flow<Any?>` |
| `0x0A03` | `VM_DISPATCH` | sync | `(eventName: String, payload: Any?) -> Unit` |

---

## Dispatchers (`0x0B00–0x0B03`)

Registered by `registerDispatcherCapabilities()`.

| ID | Name | Kind | Returns |
|---|---|---|---|
| `0x0B00` | `DISPATCHER_IO` | sync | `Dispatchers.IO` |
| `0x0B01` | `DISPATCHER_DEFAULT` | sync | `Dispatchers.Default` |
| `0x0B02` | `DISPATCHER_MAIN` | sync | `Dispatchers.Main` |
| `0x0B03` | `DISPATCHER_UNCONFINED` | sync | `Dispatchers.Unconfined` |

Used as the dispatcher argument to `WITH_CONTEXT` opcodes.

---

## Flow operators (`0x0C00–0x0C08`)

Registered by `registerFlowCapabilities(flowEngine)`.

| ID | Name | Kind |
|---|---|---|
| `0x0C00` | `FLOW_MAP` | flow operator |
| `0x0C01` | `FLOW_FILTER` | flow operator |
| `0x0C02` | `FLOW_FLAT_MAP_LATEST` | flow operator |
| `0x0C03` | `FLOW_COMBINE` | flow operator |
| `0x0C04` | `FLOW_TAKE` | flow operator |
| `0x0C05` | `FLOW_DEBOUNCE` | flow operator |
| `0x0C06` | `FLOW_DISTINCT_UNTIL_CHANGED` | flow operator |
| `0x0C07` | `STATE_FLOW_CREATE` | sync constructor |
| `0x0C08` | `SHARED_FLOW_CREATE` | sync constructor |

These don't usually appear in KBC source directly, the compiler
recognises `.map { }`, `.filter { }`, etc. and lowers them onto these
IDs through `KBCFlowEngine`.

---

## `registerCoreCapabilities(...)`, one-stop bootstrap

```kotlin
fun CapabilityRegistry.registerCoreCapabilities(
    context: Context,
    dataStore: DataStore<Preferences>? = null,
    httpClient: KetoyHttpClient = KetoyHttpClient.build(),
    analyticsTracker: (String, Map<String, Any?>) -> Unit = { _, _ -> }
)
```

Registers, in order:
1. Network (always).
2. Storage KV (only if `dataStore != null`).
3. Platform (always; analytics tracker is optional).
4. Dispatchers (always).

**Not** registered by `registerCoreCapabilities`:
- Navigation, call `registerNavigationCapabilities(navigator)`.
- ViewModel state, registered by `KetoyVirtualViewModel`.
- Flow operators, registered by `KetoyVM` against its `KBCFlowEngine`.
- Room, register per-DAO via `KBCRoomBridge`.

---

## Capability JSON schema

```json
{
  "version": 1,
  "allowedStdlibFqNames": [ "kotlin.let", "kotlin.collections.listOf", ... ],
  "capabilities": [
    {
      "id": 16384,
      "name": "OBSERVE_TODOS",
      "fqName": "com.example.myapp.ketoyscreens.observeTodos",
      "kind": "FLOW",
      "parameterTypes": [],
      "returnType": "kotlinx.coroutines.flow.Flow"
    }
  ]
}
```

| Field | Meaning |
|---|---|
| `version` | Schema version. Always `1` for now. |
| `allowedStdlibFqNames` | Stdlib FQ names the validator permits as `INVOKE_VIRTUAL`/`INVOKE_STATIC` calls. |
| `capabilities[].id` | Decimal ID. Hex equivalent shown above for readability. |
| `capabilities[].kind` | `SYNC`, `SUSPEND`, `FLOW`, or `COMPOSABLE`. |
| `capabilities[].parameterTypes` | FQ names of params (`kotlin.String`, `kotlin.Long`, etc.). |
| `capabilities[].returnType` | FQ name of return type. |

The compiler reads this at build time to validate each
`@KetoyCapabilityStub`'s ID and signature.

Next: [Compose Adapters →](compose-adapters.md)
