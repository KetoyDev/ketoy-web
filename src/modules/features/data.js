export const subnavItems = [
  { id: 'components', label: 'Composables' },
  { id: 'constructors', label: 'Constructors' },
  { id: 'modifiers', label: 'Modifiers' },
  { id: 'tokens', label: 'Tokens & icons' },
  { id: 'kotlin', label: 'Kotlin language' },
  { id: 'viewmodels', label: 'ViewModels' },
  { id: 'non-goals', label: 'Compile-time errors' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'bundle', label: 'Bundle & tooling' },
  { id: 'gradle', label: 'Gradle plugin' },
];

export const statusCards = [
  { num: 16, h: 'Composable adapters', p: 'Fully routed Material3 + Foundation + Coil components, KSP-generated.' },
  { num: 27, h: 'Modifier operations', p: 'Named-arg modifier folding - padding, fill, size, background, clickable.' },
  { num: 67, h: 'Built-in capabilities', p: 'Network, storage, navigation, platform, dispatchers, Flow operators.' },
  { num: 106, h: 'KBC opcodes', p: 'Logic, coroutine, Compose state, control flow, VM lifecycle.' },
];

export const compCards = [
  { name: 'Text', id: '0x0001', desc: '15-param canonical String overload (post-1.5; minLines at position 14). AnnotatedString overload and the 16-arg deprecated overload deliberately not picked.', params: ['modifier','color','fontSize','fontStyle','fontWeight','fontFamily','letterSpacing','textDecoration','textAlign','lineHeight','overflow','softWrap','maxLines','minLines'] },
  { name: 'Column', id: '0x0002', desc: 'Content slot resolves via KBCParamSet.getContentSlot.', params: ['modifier','verticalArrangement','horizontalAlignment'] },
  { name: 'Row', id: '0x0003', desc: 'Same shape as Column.', params: ['modifier','horizontalArrangement','verticalAlignment'] },
  { name: 'Box', id: '0x0004', desc: 'Content slot at source-position 3.', params: ['modifier','contentAlignment','propagateMinConstraints'] },
  { name: 'Scaffold', id: '0x0007', desc: 'Full Material3 signature with the trailing PaddingValues content slot.', params: ['topBar','bottomBar','snackbarHost','floatingActionButton','fabPosition','containerColor','contentColor','contentWindowInsets'] },
  { name: 'Surface', id: '0x0008', desc: 'Non-clickable overload - the clickable variant is excluded.', params: ['modifier','shape','color','contentColor','tonalElevation','shadowElevation','border'] },
  { name: 'Card', id: '0x0009', desc: '6-param non-clickable overload. Colors and elevation built via CardDefaults object factories.', params: ['modifier','shape','colors','elevation','border'] },
  { name: 'Spacer', id: '0x000B', desc: 'Modifier-only. Width/height live in the modifier chain (Modifier.height(20.dp)).', params: ['modifier'] },
  { name: 'Button', id: '0x000C', desc: 'Full Material3 shape with content slot at source position 9.', params: ['onClick','modifier','enabled','shape','colors','elevation','border','contentPadding','interactionSource'] },
  { name: 'IconButton', id: '0x000F', desc: 'Full signature with honour-default enabled.', params: ['onClick','modifier','enabled','colors','interactionSource'] },
  { name: 'TextField', id: '0x0012', desc: 'String overload picked explicitly. 22 parameters end-to-end.', params: ['value','onValueChange','modifier','enabled','readOnly','textStyle','label','placeholder','leadingIcon','trailingIcon','prefix','suffix','supportingText','isError','visualTransformation','keyboardOptions','keyboardActions','singleLine','maxLines','minLines','interactionSource','shape','colors'] },
  { name: 'Checkbox', id: '0x0014', desc: 'Full signature.', params: ['checked','onCheckedChange','modifier','enabled','colors','interactionSource'] },
  { name: 'Switch', id: '0x0016', desc: 'Full signature with thumbContent slot.', params: ['checked','onCheckedChange','modifier','thumbContent','enabled','colors','interactionSource'] },
  { name: 'AsyncImage', id: '0x0018', desc: 'Coil 16-arg post-1.x overload (clipToBounds at pos 14).', params: ['model','contentDescription','modifier','placeholder','error','fallback','onLoading','onSuccess','onError','alignment','contentScale','alpha','colorFilter','filterQuality','clipToBounds'] },
  { name: 'Icon', id: '0x0019', desc: 'ImageVector overload - picked via nullability-aware disambiguator over Painter / ImageBitmap variants. Resolved at runtime via a host-provided KBCImageVectorResolver.', params: ['imageVector','contentDescription','modifier','tint'] },
  { name: 'TopAppBar', id: '0x001D', desc: 'Post-1.2 overload with expandedHeight: Dp. Colors/insets/scrollBehavior fall through to Compose defaults. Requires @OptIn(ExperimentalMaterial3Api::class) in KBC source.', params: ['title','modifier','navigationIcon','actions','expandedHeight'] },
];

export const reservedComps = [
  'LAZY_COLUMN · 0x0005','LAZY_ROW · 0x0006','ELEVATED_CARD · 0x000A','OUTLINED_BUTTON · 0x000D','TEXT_BUTTON · 0x000E','FAB · 0x0010','EXTENDED_FAB · 0x0011','OUTLINED_TEXT_FIELD · 0x0013','RADIO_BUTTON · 0x0015','SLIDER · 0x0017','DIVIDER · 0x001A','CIRCULAR_PROGRESS · 0x001B','LINEAR_PROGRESS · 0x001C','NAVIGATION_BAR · 0x001E','TAB_ROW · 0x001F','ALERT_DIALOG · 0x0020','BOTTOM_SHEET · 0x0021','LAZY_VERTICAL_GRID · 0x0022','HORIZONTAL_PAGER · 0x0023',
];

export const constructorRows = [
  ['0x0004', 'KeyboardOptions(…)', 'constructor'],
  ['0x0005', 'KeyboardActions(…)', 'constructor'],
  ['0x0007', 'RoundedCornerShape(corner: Dp)', 'factory'],
  ['0x0021', 'RoundedCornerShape(percent: Int)', 'factory'],
  ['0x0022', 'RoundedCornerShape(Dp×4)', 'per-corner factory'],
  ['0x0023', 'RoundedCornerShape(Int×4)', 'percent-per-corner factory'],
  ['0x0012', 'CardDefaults.cardColors(…)', 'object factory · runs in composition'],
  ['0x0013', 'CardDefaults.cardElevation(Dp×6)', 'object factory'],
  ['0x0014', 'ButtonDefaults.buttonColors(Color×4)', 'object factory'],
  ['0x0015', 'ButtonDefaults.buttonElevation(Dp×5)', 'object factory'],
  ['0x0020', 'TopAppBarDefaults.topAppBarColors(Color×5)', 'object factory'],
];

export const modifierGroups = [
  { h: 'Padding & sizing', ops: ['Padding','PaddingAll','PaddingHorizontal','PaddingVertical','PaddingValuesRef','FillMaxWidth','FillMaxHeight','FillMaxSize','Size','WidthIn','HeightIn','WrapContentWidth','WrapContentHeight','WrapContentSize'] },
  { h: 'Appearance', ops: ['Background','Clip','Border','Shadow','ClipToBounds','Blur','Alpha'] },
  { h: 'Interaction & layout', ops: ['Clickable','Offset','ZIndex','TestTag','Weight*'] },
];

export const tokenCards = [
  { num: 'FontWeight', h: '9 entries', p: 'Thin → Black' },
  { num: 'Color', h: '17 entries', p: 'Named Compose colors + ARGB literals' },
  { num: 'Arrangement', h: '7 entries', p: 'Start, Center, SpaceBetween, SpaceEvenly…' },
  { num: 'Alignment', h: '12 entries', p: 'Top/Center/Bottom × Start/Center/End' },
  { num: 'ContentScale', h: '6 entries', p: 'Fit, Crop, Inside, FillBounds…' },
  { num: 'KeyboardType', h: '10 entries', p: 'Text, Email, Number, Password, Phone…' },
  { num: 'ImeAction', h: '7 entries', p: 'Done, Next, Search, Send, Go…' },
  { num: 'TextAlign / Overflow / Decoration / FontStyle / Typography', h: 'remaining 20', p: 'Full Material typography scale' },
];

export const kotlinCards = [
  { num: '2.2', h: 'Primitives & arithmetic', p: 'Int, Long, Float, Double, Boolean, String, Unit, null, Char. Full arithmetic, comparison, boolean ops, Int↔Long/Float/Double conversions, nullable boxing/unboxing.', chips: ['ADD_INT','SUB_INT','MUL_INT','DIV_INT','MOD_INT','NEG_INT','_LONG','_FLOAT','_DOUBLE'] },
  { num: '2.3', h: 'Strings', p: 'Variadic STRING_CONCAT - every +, interpolation, or multi-arg concat collapses to one opcode. Per-bundle deduplicated string pool.', chips: ['STRING_CONCAT','STRING_LENGTH','STRING_SUBSTR','INT_TO_STRING'] },
  { num: '2.4', h: 'Control flow', p: 'if, when, while, do-while, break, continue, return, throw, and try/catch.', extra: 'Caveat: catch is currently catch-all - multi-catch collapses to the first handler. Rethrow inside a catch works correctly.' },
  { num: '2.5', h: 'Lambdas & closures', p: 'val onClick = { }, list.forEach { }, lambda parameters to adapters. Closures with captured outer-scope locals are fully supported via KBCValue.ClosureRef - capture values snapshot eagerly at slot resolution time.', extra: 'Audited against 6 capture patterns: single, multi, navigation-onClick, nested two-level, branch, non-capturing baseline.' },
  { num: '2.6', h: 'Coroutines', p: 'State-machine lowering with SUSPEND_POINT/RESUME_VALUE chains. Structured concurrency via SupervisorJob. CancellationException is preserved.', chips: ['LAUNCH','ASYNC','AWAIT','WITH_CONTEXT','FLOW_EMIT','FLOW_COLLECT','COLLECT_AS_STATE'] },
  { num: '2.8', h: 'Collections', p: 'listOf, mapOf, mutableListOf intrinsified. Bigger stdlib ops (map, filter, reduce) flow through INVOKE_VIRTUAL against the KBC heap.', chips: ['LIST_NEW','LIST_ADD','LIST_GET','LIST_SIZE','LIST_FOR_EACH','MAP_NEW','MAP_PUT','MAP_GET'] },
];

export const typeRows = [
  ['Full', 'data class', 'equals · hashCode · toString · copy · componentN'],
  ['Full', 'sealed class / interface', 'when exhaustiveness, is, as, as?'],
  ['Full', 'enum class', 'values() / valueOf() via stdlib intrinsics'],
  ['Full', 'object declarations', 'Companions resolved via ComposeTokenRegistry / stdlib allowlist'],
  ['Full', 'extension functions', 'Top-level extensions; receiver becomes register 0'],
  ['Full', 'top-level functions', 'Auto-included in the closure walk'],
  ['Full', 'inline functions', 'Frontend-inlined; emitter sees inlined body. Reified params work for concrete use'],
  ['Limited', 'inheritance / interfaces', 'No virtual-dispatch table beyond INVOKE_VIRTUAL for stdlib + KBC heap'],
  ['Erased', 'generics', 'Erased at IR; type checks only match erased type'],
  ['Partial', 'value / inline class', 'Compose Dp, Sp, Color, TextUnit via tokens. User-defined value classes reach the emitter as their unboxed primitive form'],
];

export const nonGoalRows = [
  ['DirectAndroidApiAccess', 'android.* / androidx.* calls outside the catalog'],
  ['ReflectionUsage', 'kotlin.reflect.*, java.lang.Class.get*, java.lang.reflect.*'],
  ['FileIoUsage', 'java.io.*, java.nio.*, kotlin.io.*'],
  ['GlobalScopeUsage', 'GlobalScope.*, runBlocking, raw CoroutineScope() factory'],
  ['UnregisteredCapability', '@KetoyCapabilityStub referencing an ID not in the host’s registry JSON'],
  ['UnregisteredComposable', '@Composable callee not in the catalog or AdapterFqNameRegistry'],
  ['NonKbcConstructor', 'Compose-domain constructor without a registered adapter'],
  ['UnregisteredCall', 'Anything else - includes up to 3 fuzzy-match suggestions'],
];

export const capabilityRows = [
  { cat: 'Network', small: '0x0500 – 0x0506 · Ktor + OkHttp', chips: ['HTTP_GET','HTTP_POST','HTTP_PUT','HTTP_DELETE','HTTP_REQUEST','SSE_SUBSCRIBE','WEBSOCKET_CONNECT · reserved'], count: '6 active' },
  { cat: 'Storage · DataStore KV', small: '0x0600 – 0x0605', chips: ['KV_GET','KV_SET','KV_DELETE','KV_GET_ALL','KV_CLEAR','KV_OBSERVE'], count: '6' },
  { cat: 'Storage · Room bridge', small: '0x0610 – 0x0614 + host range 0x4000+', chips: ['suspendCapability','flowCapability','syncCapability','observeList','mutate','findOne'], count: 'DSL + 5 generic' },
  { cat: 'Navigation', small: '0x0700 – 0x0708 · wraps Compose NavController', chips: ['NAV_PUSH','NAV_POP','NAV_REPLACE','NAV_POP_TO','NAV_DEEP_LINK','NAV_SET_RESULT','NAV_GET_RESULT','NAV_CAN_POP','NAV_CURRENT_ROUTE'], count: '9' },
  { cat: 'Platform', small: '0x0900 – 0x090A', chips: ['ANALYTICS_TRACK','TOAST','VIBRATE','CLIPBOARD_SET','CLIPBOARD_GET','OPEN_URL','REQUEST_PERMISSION','CHECK_PERMISSION','DEVICE_LOCALE','APP_VERSION','LOG'], count: '11' },
  { cat: 'ViewModel state', small: '0x0A00 – 0x0A03', chips: ['VM_GET_STATE','VM_SET_STATE','VM_OBSERVE_STATE','VM_DISPATCH'], count: '4' },
  { cat: 'Coroutine dispatchers', small: '0x0B00 – 0x0B03', chips: ['DISPATCHER_IO','DISPATCHER_DEFAULT','DISPATCHER_MAIN','DISPATCHER_UNCONFINED'], count: '4' },
  { cat: 'Flow operators', small: '0x0C00 – 0x0C08', chips: ['FLOW_MAP','FLOW_FILTER','FLOW_FLAT_MAP_LATEST','FLOW_COMBINE','FLOW_TAKE','FLOW_DEBOUNCE','FLOW_DISTINCT_UNTIL_CHANGED','STATE_FLOW_CREATE','SHARED_FLOW_CREATE'], count: '9' },
  { cat: 'App-specific', small: '0x4000 – 0x7FFF · your domain', chips: ['Room DAOs','Retrofit endpoints','DataStore flows','Bluetooth / camera / WorkManager / location','Analytics SDK','Payments'], count: '16K slots' },
];
