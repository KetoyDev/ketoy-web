package com.developerstring.ketoy

import kotlinx.serialization.*
import kotlinx.serialization.json.*
import androidx.compose.runtime.Composable
import kotlinx.serialization.descriptors.buildClassSerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder

// Serializer for Any type values in component properties
object AnyValueSerializer : KSerializer<Any> {
    override val descriptor = buildClassSerialDescriptor("AnyValue")

    override fun serialize(encoder: Encoder, value: Any) {
        when (value) {
            is String -> encoder.encodeString(value)
            is Int -> encoder.encodeInt(value)
            is Float -> encoder.encodeFloat(value)
            is Boolean -> encoder.encodeBoolean(value)
            is Double -> encoder.encodeDouble(value)
            else -> encoder.encodeString(value.toString())
        }
    }

    override fun deserialize(decoder: Decoder): Any {
        return decoder.decodeString() // Default to string, can be improved later
    }
}

// Custom component annotation for marking composables that can be used in DSL
@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.RUNTIME)
annotation class KComponent(
    val name: String,
    val packageName: String = "",  // Optional package info for cross-module support
    val description: String = "",  // Optional description
    val version: String = "1.0"    // Version for compatibility
)

// Enhanced component information with metadata
@Serializable
data class KComponentInfo(
    val name: String,
    val packageName: String = "",
    val className: String = "",
    val description: String = "",
    val version: String = "1.0",
    val parameterTypes: Map<String, String> = emptyMap(),
    val requiredProps: List<String> = emptyList(),
    val optionalProps: List<String> = emptyList()
) {
    // Non-serializable renderer function
    @Transient
    var renderer: (@Composable (Map<String, Any>) -> Unit)? = null
}

// Component metadata for JSON serialization
@Serializable
data class KComponentMetadata(
    val name: String,
    val packageName: String = "",
    val className: String = "",
    val imports: List<String> = emptyList(),
    val version: String = "1.0"
)

// Enhanced global registry with automatic discovery
object KComponentRegistry {
    private val components = mutableMapOf<String, KComponentInfo>()
    private val componentMetadata = mutableMapOf<String, KComponentMetadata>()
    private var isInitialized = false
    
    /**
     * Initialize the registry by discovering all @KComponent annotated functions
     * Call this at app startup
     */
    fun initialize() {
        if (isInitialized) return
        
        try {
            discoverComponents()
            isInitialized = true
        } catch (e: Exception) {
            println("Warning: Could not auto-discover components: ${e.message}")
        }
    }
    
    /**
     * Discover all @KComponent annotated functions via reflection
     * This scans the entire classpath for components
     */
    private fun discoverComponents() {
        try {
            // Get the current package context
            val packageName = KComponentRegistry::class.java.packageName
            
            // Scan for @KComponent annotated functions
            // This is a simplified version - in production you'd want more robust scanning
            discoverComponentsInPackage(packageName)
            
        } catch (e: Exception) {
            println("Component discovery failed: ${e.message}")
        }
    }
    
    /**
     * Discover components in specific package
     */
    private fun discoverComponentsInPackage(packageName: String) {
        try {
            // Auto-register known components from CustomComponents.kt
            autoRegisterKnownComponents()
        } catch (e: Exception) {
            println("Package scanning failed: ${e.message}")
        }
    }
    
    /**
     * Auto-register known components (fallback when reflection scanning fails)
     */
    private fun autoRegisterKnownComponents() {
        // Register known custom components
        try {
            // UserCard component
            register(
                KComponentInfo(
                    name = "UserCard",
                    packageName = "com.developerstring.ketoy",
                    className = "CustomComponentsKt",
                    description = "User profile card component",
                    parameterTypes = mapOf(
                        "name" to "String",
                        "email" to "String",
                        "avatar" to "String",
                        "isOnline" to "Boolean"
                    ),
                    requiredProps = listOf("name"),
                    optionalProps = listOf("email", "avatar", "isOnline")
                ).apply {
                    renderer = { props -> 
                        // Call the actual UserCard function
                        UserCard(props)
                    }
                }
            )
            
            // StatsCard component
            register(
                KComponentInfo(
                    name = "StatsCard",
                    packageName = "com.developerstring.ketoy",
                    className = "CustomComponentsKt",
                    description = "Statistics card component",
                    parameterTypes = mapOf(
                        "title" to "String",
                        "value" to "String",
                        "icon" to "String",
                        "color" to "String"
                    ),
                    requiredProps = listOf("title", "value"),
                    optionalProps = listOf("icon", "color")
                ).apply {
                    renderer = { props -> 
                        StatsCard(props)
                    }
                }
            )
            
            // ActionButton component
            register(
                KComponentInfo(
                    name = "ActionButton",
                    packageName = "com.developerstring.ketoy",
                    className = "CustomComponentsKt",
                    description = "Custom action button component",
                    parameterTypes = mapOf(
                        "text" to "String",
                        "action" to "String",
                        "style" to "String",
                        "enabled" to "Boolean"
                    ),
                    requiredProps = listOf("text"),
                    optionalProps = listOf("action", "style", "enabled")
                ).apply {
                    renderer = { props -> 
                        ActionButton(props)
                    }
                }
            )
            
        } catch (e: Exception) {
            println("Auto-registration failed: ${e.message}")
        }
    }
    
    /**
     * Register component with full information
     */
    fun register(info: KComponentInfo) {
        components[info.name] = info
        
        // Also store metadata for JSON serialization
        componentMetadata[info.name] = KComponentMetadata(
            name = info.name,
            packageName = info.packageName,
            className = info.className,
            version = info.version
        )
    }
    
    /**
     * Register component with renderer function (legacy method)
     */
    fun register(
        name: String,
        renderer: @Composable (Map<String, Any>) -> Unit,
        parameterTypes: Map<String, String> = emptyMap(),
        packageName: String = "",
        className: String = ""
    ) {
        val info = KComponentInfo(
            name = name,
            packageName = packageName,
            className = className,
            parameterTypes = parameterTypes
        ).apply {
            this.renderer = renderer
        }
        register(info)
    }
    
    /**
     * Get component by name with automatic initialization
     */
    fun get(name: String): KComponentInfo? {
        if (!isInitialized) initialize()
        return components[name]
    }
    
    /**
     * Get all registered components
     */
    fun getAll(): Map<String, KComponentInfo> {
        if (!isInitialized) initialize()
        return components.toMap()
    }
    
    /**
     * Get component metadata for JSON serialization
     */
    fun getMetadata(name: String): KComponentMetadata? = componentMetadata[name]
    
    /**
     * Get all component metadata
     */
    fun getAllMetadata(): Map<String, KComponentMetadata> = componentMetadata.toMap()
    
    /**
     * Check if component is available
     */
    fun isAvailable(name: String): Boolean {
        if (!isInitialized) initialize()
        return components.containsKey(name)
    }
    
    /**
     * Load component dynamically from metadata
     */
    fun loadFromMetadata(metadata: KComponentMetadata): Boolean {
        try {
            if (isAvailable(metadata.name)) {
                return true // Already loaded
            }
            
            // Attempt dynamic loading based on package and class info
            return loadComponentDynamically(metadata)
            
        } catch (e: Exception) {
            println("Failed to load component ${metadata.name}: ${e.message}")
            return false
        }
    }
    
    /**
     * Dynamically load component (placeholder for actual implementation)
     */
    private fun loadComponentDynamically(metadata: KComponentMetadata): Boolean {
        // This would use reflection or other dynamic loading mechanisms
        println("Dynamic loading not yet implemented for: ${metadata.name}")
        return false
    }
    
    /**
     * Clear all registered components
     */
    fun clear() {
        components.clear()
        componentMetadata.clear()
        isInitialized = false
    }
    
    /**
     * Reset and reinitialize
     */
    fun reset() {
        clear()
        initialize()
    }
}

// Global Action Registry for button callbacks and other actions
object ActionRegistry {
    private val actions = mutableMapOf<String, () -> Unit>()
    private val textChangeActions = mutableMapOf<String, (String) -> Unit>()
    private var counter = 0

    fun register(action: () -> Unit): String {
        val id = "action_${counter++}"
        actions[id] = action
        return id
    }
    
    fun registerAction(id: String, action: () -> Unit) {
        actions[id] = action
    }
    
    fun registerTextChange(action: (String) -> Unit): String {
        val id = "textChange_${counter++}"
        textChangeActions[id] = action
        return id
    }
    
    fun registerTextChange(id: String, action: (String) -> Unit) {
        textChangeActions[id] = action
    }

    fun get(id: String): (() -> Unit)? = actions[id]
    
    fun getTextChange(id: String): ((String) -> Unit)? = textChangeActions[id]
    
    fun execute(id: String) {
        actions[id]?.invoke()
    }
    
    fun executeTextChange(id: String, value: String) {
        textChangeActions[id]?.invoke(value)
    }
    
    fun clear() {
        actions.clear()
        textChangeActions.clear()
        counter = 0
    }
}

// Sealed class hierarchy for all UI components
@JsonClassDiscriminator("type")
@Serializable
sealed class KNode

// Container Components
@Serializable
@SerialName("Column")
data class KColumnNode(
    val props: KColumnProps = KColumnProps(),
    val children: List<KNode> = emptyList()
) : KNode()

@Serializable
@SerialName("Row")
data class KRowNode(
    val props: KRowProps = KRowProps(),
    val children: List<KNode> = emptyList()
) : KNode()

@Serializable
@SerialName("Box")
data class KBoxNode(
    val props: KBoxProps = KBoxProps(),
    val children: List<KNode> = emptyList()
) : KNode()

@Serializable
@SerialName("Button")
data class KButtonNode(
    val props: KButtonProps = KButtonProps(),
    val children: List<KNode> = emptyList()
) : KNode()

@Serializable
@SerialName("LazyColumn")
data class KLazyColumnNode(
    val props: KLazyColumnProps = KLazyColumnProps(),
    val children: List<KNode> = emptyList()
) : KNode()

@Serializable
@SerialName("LazyRow")
data class KLazyRowNode(
    val props: KLazyRowProps = KLazyRowProps(),
    val children: List<KNode> = emptyList()
) : KNode()

// Leaf Components
@Serializable
@SerialName("Text")
data class KTextNode(
    val props: KTextProps = KTextProps()
) : KNode()

@Serializable
@SerialName("Spacer")
data class KSpacerNode(
    val props: KSpacerProps = KSpacerProps()
) : KNode()

@Serializable
@SerialName("Card")
data class KCardNode(
    val props: KCardProps = KCardProps(),
    val children: MutableList<KNode> = mutableListOf()
) : KNode()

@Serializable
@SerialName("TextField")
data class KTextFieldNode(
    val props: KTextFieldProps = KTextFieldProps()
) : KNode()

@Serializable
@SerialName("Image")
data class KImageNode(
    val props: KImageProps = KImageProps()
) : KNode()

// Scaffold Components
@Serializable
@SerialName("Scaffold")
data class KScaffoldNode(
    val props: KScaffoldProps = KScaffoldProps(),
    val children: List<KNode> = emptyList()
) : KNode()

@Serializable
@SerialName("TopAppBar")
data class KTopAppBarNode(
    val props: KTopAppBarProps = KTopAppBarProps(),
    val children: List<KNode> = emptyList()
) : KNode()

@Serializable
@SerialName("BottomAppBar")
data class KBottomAppBarNode(
    val props: KBottomAppBarProps = KBottomAppBarProps(),
    val children: List<KNode> = emptyList()
) : KNode()

@Serializable
@SerialName("NavigationBar")
data class KNavigationBarNode(
    val props: KNavigationBarProps = KNavigationBarProps(),
    val children: List<KNode> = emptyList()
) : KNode()

@Serializable
@SerialName("FloatingActionButton")
data class KFloatingActionButtonNode(
    val props: KFloatingActionButtonProps = KFloatingActionButtonProps(),
    val children: List<KNode> = emptyList()
) : KNode()

@Serializable
@SerialName("SnackBar")
data class KSnackBarNode(
    val props: KSnackBarProps = KSnackBarProps(),
    val children: List<KNode> = emptyList()
) : KNode()

@Serializable
@SerialName("SnackBarHost")
data class KSnackBarHostNode(
    val props: KSnackBarHostProps = KSnackBarHostProps()
) : KNode()

@Serializable
@SerialName("NavigationDrawerItem")
data class KNavigationDrawerItemNode(
    val props: KNavigationDrawerItemProps = KNavigationDrawerItemProps(),
    val children: List<KNode> = emptyList()
) : KNode()

@Serializable
@SerialName("CustomNavigationItem")
data class KCustomNavigationItemNode(
    val props: KCustomNavigationItemProps = KCustomNavigationItemProps(),
    val children: List<KNode> = emptyList()
) : KNode()

@Serializable
@SerialName("AppBarAction")
data class KAppBarActionNode(
    val props: KAppBarActionProps = KAppBarActionProps(),
    val children: List<KNode> = emptyList()
) : KNode()

// Enhanced Custom Component Node with metadata support
@Serializable
@SerialName("Component")
data class KComponentNode(
    val props: KComponentProps = KComponentProps(),
    val children: List<KNode> = emptyList(),
    @kotlinx.serialization.Transient  // Don't serialize metadata by default for backwards compatibility
    val metadata: KComponentMetadata? = null  // Component metadata for cross-screen usage
) : KNode()

// Image Source Types
@Serializable
sealed class KImageSource

@Serializable
@SerialName("res")
data class KResImageSource(
    val value: String // Resource name like "ic_launcher", "avatar_placeholder"
) : KImageSource()

@Serializable
@SerialName("url")
data class KUrlImageSource(
    val value: String // HTTP/HTTPS URL
) : KImageSource()

@Serializable
@SerialName("base64")
data class KBase64ImageSource(
    val value: String // Base64 encoded image string
) : KImageSource()

// Scale Type Constants for Images
object KScaleType {
    const val FitCenter = "fitCenter"     // Fit image inside bounds (default)
    const val CenterCrop = "centerCrop"   // Crop to fill bounds, center the image
    const val FillBounds = "fillBounds"   // Stretch to fill bounds exactly
    const val Inside = "inside"           // Fit inside without exceeding original size
    const val FillWidth = "fillWidth"     // Scale to fill width, maintain aspect ratio
    const val FillHeight = "fillHeight"   // Scale to fill height, maintain aspect ratio
}

// Properties Classes
@Serializable
data class KModifier(
    val fillMaxSize: Float? = null,        // true=1.0f, or custom fraction like 0.8f
    val fillMaxWidth: Float? = null,       // true=1.0f, or custom fraction like 0.5f
    val fillMaxHeight: Float? = null,      // true=1.0f, or custom fraction like 0.3f
    val weight: Float? = null,             // Weight for Row/Column layouts
    val size: Int? = null,
    val width: Int? = null,
    val height: Int? = null,
    val padding: KPadding? = null,
    val margin: KMargin? = null,
    val background: String? = null,
    val gradient: KGradient? = null,       // Gradient background support
    val border: KBorder? = null,
    val shape: String? = null,
    val cornerRadius: Int? = null,
    val shadow: KShadow? = null,
    val clickable: Boolean? = null,
    val scale: Float? = null,
    val rotation: Float? = null,
    val alpha: Float? = null
)

@Serializable
data class KPadding(
    val all: Int? = null,
    val horizontal: Int? = null,
    val vertical: Int? = null,
    val top: Int? = null,
    val bottom: Int? = null,
    val start: Int? = null,
    val end: Int? = null
)

@Serializable
data class KMargin(
    val all: Int? = null,
    val horizontal: Int? = null,
    val vertical: Int? = null,
    val top: Int? = null,
    val bottom: Int? = null,
    val start: Int? = null,
    val end: Int? = null
)

@Serializable
data class KBorder(
    val width: Int,
    val color: String,
    val shape: String? = null
)

@Serializable
data class KShadow(
    val elevation: Int,
    val color: String? = null,
    val offsetX: Float? = null,
    val offsetY: Float? = null,
    val blurRadius: Float? = null
)

// Component-specific properties
@Serializable
data class KColumnProps(
    val modifier: KModifier? = null,
    val verticalArrangement: String? = null,
    val horizontalAlignment: String? = null
)

@Serializable
data class KRowProps(
    val modifier: KModifier? = null,
    val horizontalArrangement: String? = null,
    val verticalAlignment: String? = null
)

@Serializable
data class KBoxProps(
    val modifier: KModifier? = null,
    val contentAlignment: String? = null
)

@Serializable
data class KLazyColumnProps(
    val modifier: KModifier? = null,
    val verticalArrangement: String? = null,
    val horizontalAlignment: String? = null,
    val userScrollEnabled: Boolean? = null,        // Enable/disable scrolling
    val reverseLayout: Boolean? = null,            // Reverse the direction of scrolling and layout
    val contentPadding: KPadding? = null,          // Padding around the whole content
    val beyondBoundsItemCount: Int? = null         // Number of items to compose and measure beyond visible bounds
)

@Serializable
data class KLazyRowProps(
    val modifier: KModifier? = null,
    val horizontalArrangement: String? = null,
    val verticalAlignment: String? = null,
    val userScrollEnabled: Boolean? = null,        // Enable/disable scrolling
    val reverseLayout: Boolean? = null,            // Reverse the direction of scrolling and layout
    val contentPadding: KPadding? = null,          // Padding around the whole content
    val beyondBoundsItemCount: Int? = null         // Number of items to compose and measure beyond visible bounds
)

@Serializable
data class KButtonProps(
    val modifier: KModifier? = null,
    val onClick: String = "function",
    val enabled: Boolean? = null,
    val containerColor: String? = null,
    val contentColor: String? = null,
    val elevation: Int? = null,
    val shape: String? = null
)

@Serializable
data class KTextProps(
    val text: String = "",
    val modifier: KModifier? = null,
    val fontSize: Int? = null,
    val fontWeight: String? = null,
    val color: String? = null,
    val textAlign: String? = null,
    val maxLines: Int? = null,
    val overflow: String? = null,
    val letterSpacing: Float? = null,
    val lineHeight: Float? = null
)

@Serializable
data class KSpacerProps(
    val modifier: KModifier? = null,
    val width: Int? = null,
    val height: Int? = null
)

@Serializable
data class KImageProps(
    val source: KImageSource? = null,
    val modifier: KModifier? = null,
    val contentDescription: String? = null,
    val scaleType: String? = KScaleType.FitCenter // Use KScaleType constants
)

@Serializable
data class KComponentProps(
    val name: String = "",                        // Component name
    val componentName: String = "",               // Legacy support - use name instead
    val properties: Map<String, @Serializable(with = AnyValueSerializer::class) Any> = emptyMap(), // Component properties
    val props: Map<String, @Serializable(with = AnyValueSerializer::class) Any> = emptyMap(), // Alternative props format
    val modifier: KModifier? = null,
    val version: String = "1.0",                  // Component version for compatibility
    val requiredImports: List<String> = emptyList(), // Required imports for this component
    val fallbackComponent: String? = null         // Fallback component if this one fails to load
)

@Serializable
data class KCardProps(
    val modifier: KModifier? = null,
    val shape: String? = null,                    // Card shape (rounded corners)
    val containerColor: String? = null,           // Background color
    val contentColor: String? = null,             // Content color
    val elevation: Int? = null,                   // Shadow elevation
    val border: KBorder? = null,                  // Card border
    val onClick: String? = null,                  // Click handler (makes card clickable)
    val enabled: Boolean? = null                  // Enable/disable interaction
)

// TextField Properties with composable content slots
@Serializable
data class KTextFieldProps(
    val value: String = "",
    val onValueChange: String? = null,            // Action ID for value change callback
    val modifier: KModifier? = null,
    val enabled: Boolean? = null,
    val readOnly: Boolean? = null,
    val textStyle: KTextStyle? = null,
    val labelContent: List<KNode>? = null,        // Composable label content
    val placeholderContent: List<KNode>? = null,  // Composable placeholder content
    val leadingIconContent: List<KNode>? = null,  // Composable leading icon content
    val trailingIconContent: List<KNode>? = null, // Composable trailing icon content
    val prefixContent: List<KNode>? = null,       // Composable prefix content
    val suffixContent: List<KNode>? = null,       // Composable suffix content
    val supportingTextContent: List<KNode>? = null, // Composable supporting text content
    val isError: Boolean? = null,
    val visualTransformation: KVisualTransformation? = null,
    val keyboardOptions: KKeyboardOptions? = null,
    val keyboardActions: KKeyboardActions? = null,
    val singleLine: Boolean? = null,
    val maxLines: Int? = null,
    val minLines: Int? = null,
    val interactionSource: KInteractionSource? = null,
    val shape: String? = null,                    // TextField shape
    val colors: KTextFieldColors? = null
)

// Text Style for TextField
@Serializable
data class KTextStyle(
    val color: String? = null,
    val fontSize: Int? = null,                    // In SP
    val fontWeight: String? = null,               // "normal", "bold", "light", "medium", "semibold", "black"
    val fontFamily: String? = null,               // Font family name
    val fontStyle: String? = null,                // "normal", "italic"
    val letterSpacing: Float? = null,             // In SP
    val textDecoration: String? = null,           // "none", "underline", "lineThrough"
    val textAlign: String? = null,                // "left", "right", "center", "justify", "start", "end"
    val lineHeight: Int? = null,                  // In SP
    val background: String? = null,               // Background color
    val textGeometricTransform: KTextGeometricTransform? = null,
    val localeList: String? = null,               // Locale string
    val textDirection: String? = null,            // "ltr", "rtl", "content", "contentOrLtr", "contentOrRtl"
    val shadow: KTextShadow? = null
)

// Text Geometric Transform
@Serializable
data class KTextGeometricTransform(
    val scaleX: Float? = null,
    val skewX: Float? = null
)

// Shadow for text
@Serializable
data class KTextShadow(
    val color: String? = null,
    val offsetX: Float? = null,                   // In DP
    val offsetY: Float? = null,                   // In DP
    val blurRadius: Float? = null                 // In DP
)

// Visual Transformation
@Serializable
data class KVisualTransformation(
    val type: String? = null,                     // "none", "password", "custom"
    val mask: Char? = null,                       // For password transformation
    val customPattern: String? = null              // For custom transformations
)

// Keyboard Options
@Serializable
data class KKeyboardOptions(
    val capitalization: String? = null,          // "none", "characters", "words", "sentences"
    val autoCorrect: Boolean? = null,
    val keyboardType: String? = null,             // "text", "ascii", "number", "phone", "uri", "email", "password", "numberPassword", "decimal"
    val imeAction: String? = null,                // "default", "none", "go", "search", "send", "previous", "next", "done"
    val platformImeOptions: KPlatformImeOptions? = null
)

// Platform IME Options
@Serializable
data class KPlatformImeOptions(
    val privateImeOptions: String? = null,
    val autoCorrect: Boolean? = null,
    val showPersonalizedSuggestions: Boolean? = null
)

// Keyboard Actions
@Serializable
data class KKeyboardActions(
    val onDone: String? = null,                   // Action ID for done action
    val onGo: String? = null,                     // Action ID for go action
    val onNext: String? = null,                   // Action ID for next action
    val onPrevious: String? = null,               // Action ID for previous action
    val onSearch: String? = null,                 // Action ID for search action
    val onSend: String? = null                    // Action ID for send action
)

// Interaction Source for tracking interactions
@Serializable
data class KInteractionSource(
    val id: String? = null                        // Interaction source identifier
)

// TextField Colors
@Serializable
data class KTextFieldColors(
    val focusedTextColor: String? = null,
    val unfocusedTextColor: String? = null,
    val disabledTextColor: String? = null,
    val errorTextColor: String? = null,
    val focusedContainerColor: String? = null,
    val unfocusedContainerColor: String? = null,
    val disabledContainerColor: String? = null,
    val errorContainerColor: String? = null,
    val cursorColor: String? = null,
    val errorCursorColor: String? = null,
    val selectionColors: KSelectionColors? = null,
    val focusedIndicatorColor: String? = null,
    val unfocusedIndicatorColor: String? = null,
    val disabledIndicatorColor: String? = null,
    val errorIndicatorColor: String? = null,
    val focusedLeadingIconColor: String? = null,
    val unfocusedLeadingIconColor: String? = null,
    val disabledLeadingIconColor: String? = null,
    val errorLeadingIconColor: String? = null,
    val focusedTrailingIconColor: String? = null,
    val unfocusedTrailingIconColor: String? = null,
    val disabledTrailingIconColor: String? = null,
    val errorTrailingIconColor: String? = null,
    val focusedLabelColor: String? = null,
    val unfocusedLabelColor: String? = null,
    val disabledLabelColor: String? = null,
    val errorLabelColor: String? = null,
    val focusedPlaceholderColor: String? = null,
    val unfocusedPlaceholderColor: String? = null,
    val disabledPlaceholderColor: String? = null,
    val errorPlaceholderColor: String? = null,
    val focusedSupportingTextColor: String? = null,
    val unfocusedSupportingTextColor: String? = null,
    val disabledSupportingTextColor: String? = null,
    val errorSupportingTextColor: String? = null,
    val focusedPrefixColor: String? = null,
    val unfocusedPrefixColor: String? = null,
    val disabledPrefixColor: String? = null,
    val errorPrefixColor: String? = null,
    val focusedSuffixColor: String? = null,
    val unfocusedSuffixColor: String? = null,
    val disabledSuffixColor: String? = null,
    val errorSuffixColor: String? = null
)

// Selection Colors
@Serializable
data class KSelectionColors(
    val handleColor: String? = null,
    val backgroundColor: String? = null
)

// ============================================
// SCAFFOLD COMPONENTS PROPERTIES
// ============================================

// Scaffold Properties - Main container
@Serializable
data class KScaffoldProps(
    val modifier: KModifier? = null,
    val topBar: List<KNode>? = null,                    // TopAppBar content
    val bottomBar: List<KNode>? = null,                 // BottomAppBar content  
    val snackbarHost: List<KNode>? = null,              // SnackbarHost content
    val floatingActionButton: List<KNode>? = null,      // FAB content
    val floatingActionButtonPosition: String? = null,   // FAB position
    val containerColor: String? = null,                 // Background color
    val contentColor: String? = null,                   // Content color
    val contentWindowInsets: KWindowInsets? = null      // Window insets
)

// TopAppBar Properties - Complete Material 3 support
@Serializable
data class KTopAppBarProps(
    val modifier: KModifier? = null,
    val title: List<KNode>? = null,                     // Title content
    val navigationIcon: List<KNode>? = null,            // Navigation icon content
    val actions: List<KNode>? = null,                   // Actions content
    val windowInsets: KWindowInsets? = null,            // Window insets
    val colors: KTopAppBarColors? = null,               // Colors
    val scrollBehavior: KTopAppBarScrollBehavior? = null, // Scroll behavior
    val type: String? = null,                           // "small", "medium", "large", "centerAligned"
    val expandedHeight: Int? = null                     // For Large/Medium TopAppBar
)

// BottomAppBar Properties
@Serializable
data class KBottomAppBarProps(
    val modifier: KModifier? = null,
    val containerColor: String? = null,                 // Background color
    val contentColor: String? = null,                   // Content color
    val tonalElevation: Int? = null,                    // Tonal elevation
    val contentPadding: KPadding? = null,               // Content padding
    val windowInsets: KWindowInsets? = null,            // Window insets
    val scrollBehavior: KBottomAppBarScrollBehavior? = null // Scroll behavior
)

// NavigationBar Properties (Bottom Navigation)
@Serializable
data class KNavigationBarProps(
    val modifier: KModifier? = null,
    val containerColor: String? = null,                 // Background color
    val contentColor: String? = null,                   // Content color
    val tonalElevation: Int? = null,                    // Tonal elevation
    val windowInsets: KWindowInsets? = null             // Window insets
)

// FloatingActionButton Properties - Complete Material 3 support
@Serializable
data class KFloatingActionButtonProps(
    val modifier: KModifier? = null,
    val onClick: String? = null,                        // Click action ID
    val shape: String? = null,                          // FAB shape
    val containerColor: String? = null,                 // Background color
    val contentColor: String? = null,                   // Content color
    val elevation: KFloatingActionButtonElevation? = null, // Elevation states
    val interactionSource: KInteractionSource? = null,  // Interaction source
    val type: String? = null                            // "regular", "small", "large", "extended"
)

// SnackBar Properties - Complete Material 3 support
@Serializable
data class KSnackBarProps(
    val modifier: KModifier? = null,
    val action: List<KNode>? = null,                    // Action button content
    val dismissAction: List<KNode>? = null,             // Dismiss button content
    val actionOnNewLine: Boolean? = null,               // Place action on new line
    val shape: String? = null,                          // SnackBar shape
    val containerColor: String? = null,                 // Background color
    val contentColor: String? = null,                   // Content color
    val actionContentColor: String? = null,             // Action button color
    val dismissActionContentColor: String? = null,      // Dismiss action color
    val message: String? = null,                        // Message text
    val duration: String? = null                        // "short", "long", "indefinite"
)

// SnackBarHost Properties
@Serializable
data class KSnackBarHostProps(
    val hostState: String? = null,                      // SnackBarHostState ID
    val modifier: KModifier? = null,
    val snackbar: List<KNode>? = null                   // Custom snackbar content
)

// NavigationDrawerItem Properties
@Serializable
data class KNavigationDrawerItemProps(
    val selected: Boolean? = null,                      // Selection state
    val onClick: String? = null,                        // Click action ID
    val icon: List<KNode>? = null,                      // Icon content
    val modifier: KModifier? = null,
    val enabled: Boolean? = null,                       // Enable/disable
    val label: List<KNode>? = null,                     // Label content
    val badge: List<KNode>? = null,                     // Badge content
    val colors: KNavigationDrawerItemColors? = null,   // Item colors
    val shape: String? = null                           // Shape
)

// Custom Navigation Item Properties (for flexible navigation)
@Serializable
data class KCustomNavigationItemProps(
    val selected: Boolean? = null,                      // Selection state
    val onClick: String? = null,                        // Click action ID
    val icon: List<KNode>? = null,                      // Icon content
    val selectedIcon: List<KNode>? = null,              // Selected icon content
    val modifier: KModifier? = null,
    val enabled: Boolean? = null,                       // Enable/disable
    val label: List<KNode>? = null,                     // Label content
    val alwaysShowLabel: Boolean? = null,               // Always show label
    val containerColor: String? = null,                 // Container color
    val contentColor: String? = null,                   // Content color
    val selectedContainerColor: String? = null,         // Selected container color
    val selectedContentColor: String? = null,           // Selected content color
    val indicatorColor: String? = null,                 // Selection indicator color
    val rippleColor: String? = null                     // Ripple color
)

// AppBar Action Properties (for TopAppBar actions)
@Serializable
data class KAppBarActionProps(
    val onClick: String? = null,                        // Click action ID
    val modifier: KModifier? = null,
    val enabled: Boolean? = null,                       // Enable/disable
    val colors: KIconButtonColors? = null,              // Icon button colors
    val interactionSource: KInteractionSource? = null   // Interaction source
)

// Supporting Data Classes
@Serializable
data class KWindowInsets(
    val left: Int? = null,
    val top: Int? = null,
    val right: Int? = null,
    val bottom: Int? = null,
    val type: String? = null                           // "statusBars", "navigationBars", "ime", "systemBars"
)

@Serializable
data class KTopAppBarColors(
    val containerColor: String? = null,
    val scrolledContainerColor: String? = null,
    val navigationIconContentColor: String? = null,
    val titleContentColor: String? = null,
    val actionIconContentColor: String? = null
)

@Serializable
data class KTopAppBarScrollBehavior(
    val type: String? = null,                          // "pinnedScroll", "enterAlwaysScroll", "exitUntilCollapsedScroll"
    val canScroll: Boolean? = null                     // Enable/disable scrolling
)

@Serializable
data class KBottomAppBarScrollBehavior(
    val type: String? = null,                          // "pinnedScroll", "enterAlwaysScroll", "exitUntilCollapsedScroll"
    val canScroll: Boolean? = null                     // Enable/disable scrolling  
)

@Serializable
data class KFloatingActionButtonElevation(
    val defaultElevation: Int? = null,
    val pressedElevation: Int? = null,
    val focusedElevation: Int? = null,
    val hoveredElevation: Int? = null,
    val disabledElevation: Int? = null
)

@Serializable
data class KNavigationDrawerItemColors(
    val selectedContainerColor: String? = null,       // Selected container color
    val unselectedContainerColor: String? = null,     // Unselected container color
    val selectedIconColor: String? = null,            // Selected icon color
    val unselectedIconColor: String? = null,          // Unselected icon color
    val selectedTextColor: String? = null,            // Selected text color
    val unselectedTextColor: String? = null,          // Unselected text color
    val selectedBadgeColor: String? = null,           // Selected badge color
    val unselectedBadgeColor: String? = null          // Unselected badge color
)

@Serializable
data class KIconButtonColors(
    val containerColor: String? = null,
    val contentColor: String? = null,
    val disabledContainerColor: String? = null,
    val disabledContentColor: String? = null
)

// ============================================
// DYNAMIC SCOPE SYSTEM - THE MAGIC HAPPENS HERE
// ============================================

// Base scope that all components can extend
abstract class KScope {
    val children = mutableListOf<KNode>()
    
    // Each component automatically adds itself to the current scope
    fun addChild(node: KNode) {
        children += node
    }
}

// Universal scope that works for all containers
open class KUniversalScope : KScope() {
    
    // Text component - works in any scope
    fun KText(
        text: String = "",
        modifier: KModifier? = null,
        fontSize: Int? = null,
        fontWeight: String? = null,
        color: String? = null,
        textAlign: String? = null,
        maxLines: Int? = null,
        overflow: String? = null,
        letterSpacing: Float? = null,
        lineHeight: Float? = null
    ) {
        addChild(KTextNode(
            props = KTextProps(
                text = text,
                modifier = modifier,
                fontSize = fontSize,
                fontWeight = fontWeight,
                color = color,
                textAlign = textAlign,
                maxLines = maxLines,
                overflow = overflow,
                letterSpacing = letterSpacing,
                lineHeight = lineHeight
            )
        ))
    }

    // Button component - works in any scope
    fun KButton(
        modifier: KModifier? = null,
        onClick: () -> Unit = {},
        enabled: Boolean? = null,
        containerColor: String? = null,
        contentColor: String? = null,
        elevation: Int? = null,
        shape: String? = null,
        content: KUniversalScope.() -> Unit = {}
    ) {
        // Register the onClick lambda and get action ID
        val actionId = ActionRegistry.register(onClick)
        
        val buttonScope = KUniversalScope().apply(content)
        addChild(KButtonNode(
            props = KButtonProps(
                modifier = modifier,
                onClick = actionId, // Store the action ID instead of hardcoded "function"
                enabled = enabled,
                containerColor = containerColor,
                contentColor = contentColor,
                elevation = elevation,
                shape = shape
            ),
            children = buttonScope.children
        ))
    }

    // Column component - works in any scope
    fun KColumn(
        modifier: KModifier? = null,
        verticalArrangement: String? = null,
        horizontalAlignment: String? = null,
        content: KUniversalScope.() -> Unit = {}
    ) {
        val columnScope = KUniversalScope().apply(content)
        addChild(KColumnNode(
            props = KColumnProps(
                modifier = modifier,
                verticalArrangement = verticalArrangement,
                horizontalAlignment = horizontalAlignment
            ),
            children = columnScope.children
        ))
    }

    // Row component - works in any scope
    fun KRow(
        modifier: KModifier? = null,
        horizontalArrangement: String? = null,
        verticalAlignment: String? = null,
        content: KUniversalScope.() -> Unit = {}
    ) {
        val rowScope = KUniversalScope().apply(content)
        addChild(KRowNode(
            props = KRowProps(
                modifier = modifier,
                horizontalArrangement = horizontalArrangement,
                verticalAlignment = verticalAlignment
            ),
            children = rowScope.children
        ))
    }

    // Box component - works in any scope
    fun KBox(
        modifier: KModifier? = null,
        contentAlignment: String? = null,
        content: KUniversalScope.() -> Unit = {}
    ) {
        val boxScope = KUniversalScope().apply(content)
        addChild(KBoxNode(
            props = KBoxProps(
                modifier = modifier,
                contentAlignment = contentAlignment
            ),
            children = boxScope.children
        ))
    }

    // LazyColumn component - works in any scope
    fun KLazyColumn(
        modifier: KModifier? = null,
        verticalArrangement: String? = null,
        horizontalAlignment: String? = null,
        userScrollEnabled: Boolean? = null,
        reverseLayout: Boolean? = null,
        contentPadding: KPadding? = null,
        beyondBoundsItemCount: Int? = null,
        content: KLazyListScope.() -> Unit = {}
    ) {
        val lazyColumnScope = KLazyListScope().apply(content)
        addChild(KLazyColumnNode(
            props = KLazyColumnProps(
                modifier = modifier,
                verticalArrangement = verticalArrangement,
                horizontalAlignment = horizontalAlignment,
                userScrollEnabled = userScrollEnabled,
                reverseLayout = reverseLayout,
                contentPadding = contentPadding,
                beyondBoundsItemCount = beyondBoundsItemCount
            ),
            children = lazyColumnScope.children
        ))
    }

    // LazyRow component - works in any scope
    fun KLazyRow(
        modifier: KModifier? = null,
        horizontalArrangement: String? = null,
        verticalAlignment: String? = null,
        userScrollEnabled: Boolean? = null,
        reverseLayout: Boolean? = null,
        contentPadding: KPadding? = null,
        beyondBoundsItemCount: Int? = null,
        content: KLazyListScope.() -> Unit = {}
    ) {
        val lazyRowScope = KLazyListScope().apply(content)
        addChild(KLazyRowNode(
            props = KLazyRowProps(
                modifier = modifier,
                horizontalArrangement = horizontalArrangement,
                verticalAlignment = verticalAlignment,
                userScrollEnabled = userScrollEnabled,
                reverseLayout = reverseLayout,
                contentPadding = contentPadding,
                beyondBoundsItemCount = beyondBoundsItemCount
            ),
            children = lazyRowScope.children
        ))
    }

    // Spacer component - works in any scope
    fun KSpacer(
        modifier: KModifier? = null,
        width: Int? = null,
        height: Int? = null
    ) {
        addChild(KSpacerNode(
            props = KSpacerProps(
                modifier = modifier,
                width = width,
                height = height
            )
        ))
    }
    
    // TextField component - comprehensive with composable content slots
    fun KTextField(
        value: String = "",
        onValueChange: (String) -> Unit = {},          // Lambda for value change callback
        modifier: KModifier? = null,
        enabled: Boolean? = null,
        readOnly: Boolean? = null,
        textStyle: KTextStyle? = null,
        isError: Boolean? = null,
        visualTransformation: KVisualTransformation? = null,
        keyboardOptions: KKeyboardOptions? = null,
        keyboardActions: KKeyboardActions? = null,
        singleLine: Boolean? = null,
        maxLines: Int? = null,
        minLines: Int? = null,
        interactionSource: KInteractionSource? = null,
        shape: String? = null,                      // TextField shape
        colors: KTextFieldColors? = null,
        content: KTextFieldScope.() -> Unit = {}    // TextField content scope
    ) {
        // Register the onValueChange lambda and get action ID
        val actionId = ActionRegistry.registerTextChange(onValueChange)
        
        // Create and apply TextField scope
        val textFieldScope = KTextFieldScope().apply(content)
        
        addChild(KTextFieldNode(
            props = KTextFieldProps(
                value = value,
                onValueChange = actionId, // Store the action ID
                modifier = modifier,
                enabled = enabled,
                readOnly = readOnly,
                textStyle = textStyle,
                labelContent = textFieldScope.getLabelContent(),
                placeholderContent = textFieldScope.getPlaceholderContent(),
                leadingIconContent = textFieldScope.getLeadingIconContent(),
                trailingIconContent = textFieldScope.getTrailingIconContent(),
                prefixContent = textFieldScope.getPrefixContent(),
                suffixContent = textFieldScope.getSuffixContent(),
                supportingTextContent = textFieldScope.getSupportingTextContent(),
                isError = isError,
                visualTransformation = visualTransformation,
                keyboardOptions = keyboardOptions,
                keyboardActions = keyboardActions,
                singleLine = singleLine,
                maxLines = maxLines,
                minLines = minLines,
                interactionSource = interactionSource,
                shape = shape,
                colors = colors
            )
        ))
    }
    
    // Image component - works in any scope
    fun KImage(
        source: KImageSource,
        modifier: KModifier? = null,
        contentDescription: String? = null,
        scaleType: String? = KScaleType.FitCenter
    ) {
        addChild(KImageNode(
            props = KImageProps(
                source = source,
                modifier = modifier,
                contentDescription = contentDescription,
                scaleType = scaleType
            )
        ))
    }
    
    // Enhanced Custom Component with metadata support
    fun KComponent(
        name: String,
        modifier: KModifier? = null,
        vararg properties: Pair<String, Any>,
        version: String = "1.0",
        requiredImports: List<String> = emptyList(),
        fallbackComponent: String? = null,
        content: KUniversalScope.() -> Unit = {}
    ) {
        val componentScope = KUniversalScope().apply(content)
        
        // Get component metadata if available
        val metadata = KComponentRegistry.getMetadata(name)
        
        addChild(KComponentNode(
            props = KComponentProps(
                name = name,
                componentName = name, // Legacy support
                properties = mapOf(*properties),
                modifier = modifier,
                version = version,
                requiredImports = requiredImports,
                fallbackComponent = fallbackComponent
            ),
            children = componentScope.children,
            metadata = metadata
        ))
    }
    
    // Enhanced convenience function with properties map
    fun KComponent(
        name: String,
        properties: Map<String, Any> = emptyMap(),
        props: Map<String, Any> = emptyMap(), // Alternative props format
        modifier: KModifier? = null,
        version: String = "1.0",
        requiredImports: List<String> = emptyList(),
        fallbackComponent: String? = null,
        content: KUniversalScope.() -> Unit = {}
    ) {
        val componentScope = KUniversalScope().apply(content)
        
        // Merge properties and props
        val mergedProps = properties + props
        
        // Get component metadata if available
        val metadata = KComponentRegistry.getMetadata(name)
        
        addChild(KComponentNode(
            props = KComponentProps(
                name = name,
                componentName = name, // Legacy support
                properties = mergedProps,
                props = mergedProps,  // Store in both formats
                modifier = modifier,
                version = version,
                requiredImports = requiredImports,
                fallbackComponent = fallbackComponent
            ),
            children = componentScope.children,
            metadata = metadata
        ))
    }
    
    // Smart component loader that handles missing components
    fun KComponentSmart(
        name: String,
        properties: Map<String, Any> = emptyMap(),
        modifier: KModifier? = null,
        autoLoad: Boolean = true,
        showError: Boolean = true
    ) {
        // Check if component is available
        if (!KComponentRegistry.isAvailable(name) && autoLoad) {
            // Try to load the component if metadata is available
            val metadata = KComponentRegistry.getMetadata(name)
            if (metadata != null) {
                val loaded = KComponentRegistry.loadFromMetadata(metadata)
                if (!loaded && showError) {
                    // Show error component if loading failed
                    KCard(
                        modifier = modifier,
                        containerColor = KColors.withAlpha(KColors.Red, 0.1f),
                        border = kBorder(1, KColors.Red)
                    ) {
                        KText(
                            text = "⚠️ Component '$name' could not be loaded",
                            color = KColors.Red,
                            fontSize = 12
                        )
                    }
                    return
                }
            }
        }
        
        // Use regular KComponent if available or loading succeeded
        KComponent(name = name, properties = properties, modifier = modifier)
    }
    
    // Card component - Material Design 3 Card with CardDefaults-like API
    fun KCard(
        modifier: KModifier? = null,
        shape: String? = null,                      // Default: rounded corners (12dp)
        containerColor: String? = null,             // Default: surface color
        contentColor: String? = null,               // Default: onSurface color  
        elevation: Int? = null,                     // Default: 1dp
        border: KBorder? = null,                    // Optional border
        onClick: (() -> Unit)? = null,              // Makes card clickable
        enabled: Boolean? = null,                   // Default: true
        content: KUniversalScope.() -> Unit
    ) {
        val cardNode = KCardNode(
            props = KCardProps(
                modifier = modifier,
                shape = shape ?: KShapes.Rounded12,     // Material 3 default
                containerColor = containerColor,
                contentColor = contentColor,
                elevation = elevation ?: 1,             // Material 3 default
                border = border,
                onClick = if (onClick != null) "cardClick" else null,
                enabled = enabled
            )
        )
        
        // Apply content to card using a new scope
        val scope = KUniversalScope()
        scope.content()
        
        // Add all children from scope to the card
        cardNode.children.addAll(scope.children)
        
        addChild(cardNode)
    }

    // ============================================
    // SCAFFOLD COMPONENTS DSL
    // ============================================

    // Scaffold - Main screen structure with Material 3 support
    fun KScaffold(
        modifier: KModifier? = null,
        containerColor: String? = null,
        contentColor: String? = null,
        contentWindowInsets: KWindowInsets? = null,
        topBar: (KScaffoldScope.() -> Unit)? = null,
        bottomBar: (KScaffoldScope.() -> Unit)? = null,
        snackbarHost: (KScaffoldScope.() -> Unit)? = null,
        floatingActionButton: (KScaffoldScope.() -> Unit)? = null,
        floatingActionButtonPosition: String? = null,    // Use KFabPosition constants
        content: KUniversalScope.() -> Unit
    ) {
        val scaffoldScope = KUniversalScope().apply(content)
        
        // Create slots content
        val topBarContent = topBar?.let { 
            val scope = KScaffoldScope()
            scope.it()
            scope.children
        }
        
        val bottomBarContent = bottomBar?.let { 
            val scope = KScaffoldScope()
            scope.it()
            scope.children
        }
        
        val snackbarHostContent = snackbarHost?.let { 
            val scope = KScaffoldScope()
            scope.it()
            scope.children
        }
        
        val fabContent = floatingActionButton?.let { 
            val scope = KScaffoldScope()
            scope.it()
            scope.children
        }
        
        addChild(KScaffoldNode(
            props = KScaffoldProps(
                modifier = modifier,
                topBar = topBarContent,
                bottomBar = bottomBarContent,
                snackbarHost = snackbarHostContent,
                floatingActionButton = fabContent,
                floatingActionButtonPosition = floatingActionButtonPosition ?: KFabPosition.End,
                containerColor = containerColor,
                contentColor = contentColor,
                contentWindowInsets = contentWindowInsets
            ),
            children = scaffoldScope.children
        ))
    }
    
    // TopAppBar - Material 3 with all variants support
    fun KTopAppBar(
        modifier: KModifier? = null,
        colors: KTopAppBarColors? = null,
        windowInsets: KWindowInsets? = null,
        scrollBehavior: KTopAppBarScrollBehavior? = null,
        type: String? = null,                           // Use KTopAppBarType constants
        expandedHeight: Int? = null,
        title: (KAppBarScope.() -> Unit)? = null,
        navigationIcon: (KAppBarScope.() -> Unit)? = null,
        actions: (KAppBarScope.() -> Unit)? = null
    ) {
        // Create slots content
        val titleContent = title?.let { 
            val scope = KAppBarScope()
            scope.it()
            scope.children
        }
        
        val navigationIconContent = navigationIcon?.let { 
            val scope = KAppBarScope()
            scope.it()
            scope.children
        }
        
        val actionsContent = actions?.let { 
            val scope = KAppBarScope()
            scope.it()
            scope.children
        }
        
        addChild(KTopAppBarNode(
            props = KTopAppBarProps(
                modifier = modifier,
                title = titleContent,
                navigationIcon = navigationIconContent,
                actions = actionsContent,
                windowInsets = windowInsets,
                colors = colors,
                scrollBehavior = scrollBehavior,
                type = type ?: KTopAppBarType.Small,
                expandedHeight = expandedHeight
            )
        ))
    }
    
    // BottomAppBar - Material 3 with actions support
    fun KBottomAppBar(
        modifier: KModifier? = null,
        containerColor: String? = null,
        contentColor: String? = null,
        tonalElevation: Int? = null,
        contentPadding: KPadding? = null,
        windowInsets: KWindowInsets? = null,
        scrollBehavior: KBottomAppBarScrollBehavior? = null,
        content: KUniversalScope.() -> Unit = {}
    ) {
        val bottomBarScope = KUniversalScope().apply(content)
        
        addChild(KBottomAppBarNode(
            props = KBottomAppBarProps(
                modifier = modifier,
                containerColor = containerColor,
                contentColor = contentColor,
                tonalElevation = tonalElevation,
                contentPadding = contentPadding,
                windowInsets = windowInsets,
                scrollBehavior = scrollBehavior
            ),
            children = bottomBarScope.children
        ))
    }
    
    // NavigationBar - Bottom Navigation with Material 3
    fun KNavigationBar(
        modifier: KModifier? = null,
        containerColor: String? = null,
        contentColor: String? = null,
        tonalElevation: Int? = null,
        windowInsets: KWindowInsets? = null,
        content: KNavigationScope.() -> Unit
    ) {
        val navigationScope = KNavigationScope().apply(content)
        
        addChild(KNavigationBarNode(
            props = KNavigationBarProps(
                modifier = modifier,
                containerColor = containerColor,
                contentColor = contentColor,
                tonalElevation = tonalElevation,
                windowInsets = windowInsets
            ),
            children = navigationScope.children
        ))
    }
    
    // FloatingActionButton - All Material 3 variants
    fun KFloatingActionButton(
        onClick: () -> Unit = {},
        modifier: KModifier? = null,
        shape: String? = null,
        containerColor: String? = null,
        contentColor: String? = null,
        elevation: KFloatingActionButtonElevation? = null,
        interactionSource: KInteractionSource? = null,
        type: String? = null,                           // Use KFabType constants
        content: KUniversalScope.() -> Unit
    ) {
        val fabScope = KUniversalScope().apply(content)
        val actionId = ActionRegistry.register(onClick)
        
        addChild(KFloatingActionButtonNode(
            props = KFloatingActionButtonProps(
                modifier = modifier,
                onClick = actionId,
                shape = shape ?: KShapes.Circle,
                containerColor = containerColor,
                contentColor = contentColor,
                elevation = elevation,
                interactionSource = interactionSource,
                type = type ?: KFabType.Regular
            ),
            children = fabScope.children
        ))
    }
    
    // SnackBar - Complete Material 3 implementation
    fun KSnackBar(
        modifier: KModifier? = null,
        actionOnNewLine: Boolean? = null,
        shape: String? = null,
        containerColor: String? = null,
        contentColor: String? = null,
        actionContentColor: String? = null,
        dismissActionContentColor: String? = null,
        message: String? = null,
        duration: String? = null,                       // Use KSnackBarDuration constants
        action: (KSnackBarScope.() -> Unit)? = null,
        dismissAction: (KSnackBarScope.() -> Unit)? = null
    ) {
        // Create slots content
        val actionContent = action?.let { 
            val scope = KSnackBarScope()
            scope.it()
            scope.children
        }
        
        val dismissActionContent = dismissAction?.let { 
            val scope = KSnackBarScope()
            scope.it()
            scope.children
        }
        
        addChild(KSnackBarNode(
            props = KSnackBarProps(
                modifier = modifier,
                action = actionContent,
                dismissAction = dismissActionContent,
                actionOnNewLine = actionOnNewLine,
                shape = shape ?: KShapes.Rounded4,
                containerColor = containerColor,
                contentColor = contentColor,
                actionContentColor = actionContentColor,
                dismissActionContentColor = dismissActionContentColor,
                message = message,
                duration = duration ?: KSnackBarDuration.Short
            )
        ))
    }
    
    // SnackBarHost - Host for displaying SnackBars
    fun KSnackBarHost(
        hostState: String? = null,
        modifier: KModifier? = null,
        snackbar: (KSnackBarScope.() -> Unit)? = null
    ) {
        val snackbarContent = snackbar?.let { 
            val scope = KSnackBarScope()
            scope.it()
            scope.children
        }
        
        addChild(KSnackBarHostNode(
            props = KSnackBarHostProps(
                hostState = hostState,
                modifier = modifier,
                snackbar = snackbarContent
            )
        ))
    }
    
    // Dynamic component addition - can add ANY component to ANY scope
    fun addComponent(component: KNode) {
        addChild(component)
    }
    
    // Conditional component addition
    inline fun KIf(condition: Boolean, content: KUniversalScope.() -> Unit) {
        if (condition) {
            content()
        }
    }
    
    // Loop-based component generation
    inline fun <T> KForEach(items: Iterable<T>, content: KUniversalScope.(T) -> Unit) {
        items.forEach { item ->
            content(item)
        }
    }
    
    // Repeat component generation
    inline fun KRepeat(times: Int, content: KUniversalScope.(Int) -> Unit) {
        repeat(times) { index ->
            content(index)
        }
    }
}

// LazyList scope for LazyColumn and LazyRow - like Compose's LazyListScope
class KLazyListScope : KScope() {
    
    // Single item - like Compose's item { }
    fun item(content: KUniversalScope.() -> Unit) {
        val itemScope = KUniversalScope().apply(content)
        itemScope.children.forEach { addChild(it) }
    }
    
    // Multiple items from a list - like Compose's items(list) { item -> }
    inline fun <T> items(items: List<T>, crossinline itemContent: KUniversalScope.(T) -> Unit) {
        items.forEach { listItem ->
            val itemScope = KUniversalScope()
            itemScope.itemContent(listItem)
            itemScope.children.forEach { addChild(it) }
        }
    }
    
    // Items with index - like Compose's itemsIndexed(list) { index, item -> }
    inline fun <T> itemsIndexed(items: List<T>, crossinline itemContent: KUniversalScope.(Int, T) -> Unit) {
        items.forEachIndexed { index, listItem ->
            val itemScope = KUniversalScope()
            itemScope.itemContent(index, listItem)
            itemScope.children.forEach { addChild(it) }
        }
    }
    
    // Items from array
    inline fun <T> items(items: Array<T>, crossinline itemContent: KUniversalScope.(T) -> Unit) {
        items(items.toList(), itemContent)
    }
    
    // Items with count - like repeat but for lazy lists
    inline fun items(count: Int, crossinline itemContent: KUniversalScope.(Int) -> Unit) {
        repeat(count) { index ->
            val itemScope = KUniversalScope()
            itemScope.itemContent(index)
            itemScope.children.forEach { addChild(it) }
        }
    }
}

// TextField Scope - allows composable content for TextField slots
class KTextFieldScope : KScope() {
    private var labelContent: List<KNode>? = null
    private var placeholderContent: List<KNode>? = null
    private var leadingIconContent: List<KNode>? = null
    private var trailingIconContent: List<KNode>? = null
    private var prefixContent: List<KNode>? = null
    private var suffixContent: List<KNode>? = null
    private var supportingTextContent: List<KNode>? = null
    
    fun label(content: KUniversalScope.() -> Unit) {
        val scope = KUniversalScope().apply(content)
        labelContent = scope.children
    }
    
    fun placeholder(content: KUniversalScope.() -> Unit) {
        val scope = KUniversalScope().apply(content)
        placeholderContent = scope.children
    }
    
    fun leadingIcon(content: KUniversalScope.() -> Unit) {
        val scope = KUniversalScope().apply(content)
        leadingIconContent = scope.children
    }
    
    fun trailingIcon(content: KUniversalScope.() -> Unit) {
        val scope = KUniversalScope().apply(content)
        trailingIconContent = scope.children
    }
    
    fun prefix(content: KUniversalScope.() -> Unit) {
        val scope = KUniversalScope().apply(content)
        prefixContent = scope.children
    }
    
    fun suffix(content: KUniversalScope.() -> Unit) {
        val scope = KUniversalScope().apply(content)
        suffixContent = scope.children
    }
    
    fun supportingText(content: KUniversalScope.() -> Unit) {
        val scope = KUniversalScope().apply(content)
        supportingTextContent = scope.children
    }
    
    // Getters for the content
    fun getLabelContent(): List<KNode>? = labelContent
    fun getPlaceholderContent(): List<KNode>? = placeholderContent
    fun getLeadingIconContent(): List<KNode>? = leadingIconContent
    fun getTrailingIconContent(): List<KNode>? = trailingIconContent
    fun getPrefixContent(): List<KNode>? = prefixContent
    fun getSuffixContent(): List<KNode>? = suffixContent
    fun getSupportingTextContent(): List<KNode>? = supportingTextContent
}

// ============================================
// SCAFFOLD SPECIALIZED SCOPES
// ============================================

// Scaffold Scope - for Scaffold slot content
class KScaffoldScope : KUniversalScope() {
    // Inherit all KUniversalScope functions
    // This allows any component to be used in Scaffold slots
}

// AppBar Scope - for TopAppBar and BottomAppBar content
class KAppBarScope : KUniversalScope() {
    
    // AppBar Action - Icon button for TopAppBar actions
    fun KAppBarAction(
        onClick: () -> Unit = {},
        modifier: KModifier? = null,
        enabled: Boolean? = null,
        colors: KIconButtonColors? = null,
        interactionSource: KInteractionSource? = null,
        content: KUniversalScope.() -> Unit
    ) {
        val actionScope = KUniversalScope().apply(content)
        val actionId = ActionRegistry.register(onClick)
        
        addChild(KAppBarActionNode(
            props = KAppBarActionProps(
                onClick = actionId,
                modifier = modifier,
                enabled = enabled,
                colors = colors,
                interactionSource = interactionSource
            ),
            children = actionScope.children
        ))
    }
    
    // Convenient icon button for common AppBar actions
    fun KIconButton(
        onClick: () -> Unit = {},
        modifier: KModifier? = null,
        enabled: Boolean? = null,
        colors: KIconButtonColors? = null,
        content: KUniversalScope.() -> Unit
    ) {
        KAppBarAction(
            onClick = onClick,
            modifier = modifier,
            enabled = enabled,
            colors = colors,
            content = content
        )
    }
}

// Navigation Scope - for NavigationBar items
class KNavigationScope : KScope() {
    
    // NavigationDrawerItem - Material3 drawer item
    fun KNavigationDrawerItem(
        selected: Boolean,
        onClick: () -> Unit = {},
        modifier: KModifier? = null,
        enabled: Boolean? = null,
        colors: KNavigationDrawerItemColors? = null,
        shape: String? = null,
        icon: (KUniversalScope.() -> Unit)? = null,
        label: (KUniversalScope.() -> Unit)? = null,
        badge: (KUniversalScope.() -> Unit)? = null
    ) {
        val actionId = ActionRegistry.register(onClick)
        
        // Create icon content
        val iconContent = icon?.let { 
            val scope = KUniversalScope()
            scope.it()
            scope.children
        }
        
        // Create label content
        val labelContent = label?.let { 
            val scope = KUniversalScope()
            scope.it()
            scope.children
        }
        
        // Create badge content
        val badgeContent = badge?.let { 
            val scope = KUniversalScope()
            scope.it()
            scope.children
        }
        
        addChild(KNavigationDrawerItemNode(
            props = KNavigationDrawerItemProps(
                selected = selected,
                onClick = actionId,
                icon = iconContent,
                modifier = modifier,
                enabled = enabled,
                label = labelContent,
                badge = badgeContent,
                colors = colors,
                shape = shape
            )
        ))
    }
    
    // Custom Navigation Item - Flexible navigation solution
    fun KCustomNavigationItem(
        selected: Boolean,
        onClick: () -> Unit = {},
        modifier: KModifier? = null,
        enabled: Boolean? = null,
        alwaysShowLabel: Boolean? = null,
        containerColor: String? = null,
        contentColor: String? = null,
        selectedContainerColor: String? = null,
        selectedContentColor: String? = null,
        indicatorColor: String? = null,
        rippleColor: String? = null,
        icon: (KUniversalScope.() -> Unit)? = null,
        selectedIcon: (KUniversalScope.() -> Unit)? = null,
        label: (KUniversalScope.() -> Unit)? = null
    ) {
        val actionId = ActionRegistry.register(onClick)
        
        // Create icon content
        val iconContent = icon?.let { 
            val scope = KUniversalScope()
            scope.it()
            scope.children
        }
        
        // Create selected icon content
        val selectedIconContent = selectedIcon?.let { 
            val scope = KUniversalScope()
            scope.it()
            scope.children
        }
        
        // Create label content
        val labelContent = label?.let { 
            val scope = KUniversalScope()
            scope.it()
            scope.children
        }
        
        addChild(KCustomNavigationItemNode(
            props = KCustomNavigationItemProps(
                selected = selected,
                onClick = actionId,
                icon = iconContent,
                selectedIcon = selectedIconContent,
                modifier = modifier,
                enabled = enabled,
                label = labelContent,
                alwaysShowLabel = alwaysShowLabel,
                containerColor = containerColor,
                contentColor = contentColor,
                selectedContainerColor = selectedContainerColor,
                selectedContentColor = selectedContentColor,
                indicatorColor = indicatorColor,
                rippleColor = rippleColor
            )
        ))
    }
}

// SnackBar Scope - for SnackBar action and dismiss content
class KSnackBarScope : KUniversalScope() {
    
    // SnackBar Action Button
    fun KSnackBarAction(
        onClick: () -> Unit = {},
        modifier: KModifier? = null,
        content: KUniversalScope.() -> Unit
    ) {
        val actionId = ActionRegistry.register(onClick)
        
        KButton(
            onClick = { ActionRegistry.get(actionId)?.invoke() },
            modifier = modifier,
            content = content
        )
    }
    
    // SnackBar Dismiss Action
    fun KSnackBarDismiss(
        onClick: () -> Unit = {},
        modifier: KModifier? = null,
        content: KUniversalScope.() -> Unit
    ) {
        val actionId = ActionRegistry.register(onClick)
        
        KButton(
            onClick = { ActionRegistry.get(actionId)?.invoke() },
            modifier = modifier,
            content = content
        )
    }
}

// ============================================
// KETOY VARIABLE SYSTEM - Simple State Management
// ============================================

// KetoyVariable - like Compose's MutableState and State
@Serializable
sealed class KetoyVariable<T> {
    abstract val id: String
    abstract val value: T
    
    @Serializable
    @SerialName("ImmutableVariable")
    data class Immutable<T>(
        override val id: String,
        override val value: T
    ) : KetoyVariable<T>()
    
    @Serializable
    @SerialName("MutableVariable")
    data class Mutable<T>(
        override val id: String,
        override val value: T
    ) : KetoyVariable<T>()
}

// Variable registry to store all variables
object KetoyVariableRegistry {
    private val variables = mutableMapOf<String, KetoyVariable<*>>()
    
    fun <T> register(variable: KetoyVariable<T>): KetoyVariable<T> {
        variables[variable.id] = variable
        return variable
    }
    
    fun <T> get(id: String): KetoyVariable<T>? {
        @Suppress("UNCHECKED_CAST")
        return variables[id] as? KetoyVariable<T>
    }
    
    fun getValue(id: String): Any? {
        return variables[id]?.value
    }
    
    fun <T> updateValue(id: String, newValue: T): Boolean {
        val variable = variables[id]
        return when (variable) {
            is KetoyVariable.Mutable<*> -> {
                @Suppress("UNCHECKED_CAST")
                val typedVariable = variable as KetoyVariable.Mutable<T>
                variables[id] = typedVariable.copy(value = newValue)
                true
            }
            else -> false // Immutable variables can't be updated
        }
    }
    
    fun clear() {
        variables.clear()
    }
    
    fun getAllVariables(): Map<String, KetoyVariable<*>> = variables.toMap()
    
    // Template resolution for nested references like {{data:user1:name}} or {{enum:status1:selectedValue}}
    fun resolveTemplate(template: String): String {
        // Handle data references: {{data:id:field}}
        val dataRegex = "\\{\\{data:([^:]+):([^}]+)\\}\\}".toRegex()
        val dataResolved = dataRegex.replace(template) { matchResult ->
            val dataId = matchResult.groupValues[1]
            val fieldName = matchResult.groupValues[2]
            val key = "$dataId.$fieldName"
            getValue(key)?.toString() ?: "[Missing: $key]"
        }
        
        // Handle enum references: {{enum:id:property}}
        val enumRegex = "\\{\\{enum:([^:]+):([^}]+)\\}\\}".toRegex()
        val enumResolved = enumRegex.replace(dataResolved) { matchResult ->
            val enumId = matchResult.groupValues[1]
            val property = matchResult.groupValues[2]
            val key = "$enumId.$property"
            getValue(key)?.toString() ?: "[Missing: $key]"
        }
        
        return enumResolved
    }
}

// DSL functions to create variables (like remember/mutableStateOf)
fun <T> ketoyRemember(id: String, value: T): KetoyVariable.Immutable<T> {
    return KetoyVariableRegistry.register(KetoyVariable.Immutable(id, value)) as KetoyVariable.Immutable<T>
}

fun <T> ketoyMutableStateOf(id: String, value: T): KetoyVariable.Mutable<T> {
    return KetoyVariableRegistry.register(KetoyVariable.Mutable(id, value)) as KetoyVariable.Mutable<T>
}

// Helper function to get variable value in UI - now supports template parsing
fun variableValue(template: String): String {
    return KetoyVariableRegistry.resolveTemplate(template)
}

// ============================================
// REFERENCE HELPER SYSTEM - Like KShapes Pattern
// ============================================

// Data reference helper - provides clean API for accessing data fields
class DataReference(private val id: String) {
    fun field(name: String): String = "{{data:$id:$name}}"
    
    // Custom field accessor - use any field name you want!
    operator fun get(fieldName: String): String = field(fieldName)
}

// Enum reference helper - provides clean API for accessing enum properties
class EnumReference(private val id: String) {
    // Standard enum properties (commonly used)
    val selectedValue: String get() = "{{enum:$id:selectedValue}}"
    val values: String get() = "{{enum:$id:values}}"
    val enumName: String get() = "{{enum:$id:enumName}}"
    
    // Flexible property accessor - use any property name you want!
    operator fun get(propertyName: String): String = "{{enum:$id:$propertyName}}"
    
    // Update the selected value of the enum
    fun updateSelectedValue(newValue: String): Boolean {
        return KetoyVariableRegistry.updateValue("$id.selectedValue", newValue)
    }
}

// Global reference functions - like KShapes.rounded()
fun dataRef(id: String) = DataReference(id)
fun enumRef(id: String) = EnumReference(id)

// Convenience object for common patterns
object KReferences {
    fun data(id: String) = DataReference(id)
    fun enum(id: String) = EnumReference(id)
}

// ============================================
// NEW DATA STRUCTURE SYSTEM - Using Serialization
// ============================================

// KDataClass - now properly serializable like KColumn
@Serializable
@SerialName("DataClass")
data class KDataClassNode(
    val props: KDataClassProps = KDataClassProps()
) : KNode()

@Serializable
data class KDataClassProps(
    val id: String = "",
    val className: String = "",
    val fields: Map<String, @Serializable(with = AnyValueSerializer::class) Any> = emptyMap()
)

// KEnum - now properly serializable like KColumn
@Serializable
@SerialName("Enum")
data class KEnumNode(
    val props: KEnumProps = KEnumProps()
) : KNode()

@Serializable
data class KEnumProps(
    val id: String = "",
    val enumName: String = "",
    val values: List<String> = emptyList(),
    val selectedValue: String = "",
    val onSelectionChange: String? = null
)

// DSL functions in KUniversalScope
fun KUniversalScope.KDataClass(
    id: String,
    className: String,
    vararg fields: Pair<String, Any>
) {
    addChild(KDataClassNode(
        props = KDataClassProps(
            id = id,
            className = className,
            fields = fields.toMap()
        )
    ))
    
    // Store each field as a variable for easy access using nested keys
    fields.forEach { (fieldName, value) ->
        KetoyVariableRegistry.register(KetoyVariable.Immutable("$id.$fieldName", value))
    }
}

fun KUniversalScope.KEnum(
    id: String,
    enumName: String,
    values: List<String>,
    selectedValue: String = "",
    onSelectionChange: (() -> Unit)? = null
) {
    val actionId = onSelectionChange?.let { ActionRegistry.register(it) }
    addChild(KEnumNode(
        props = KEnumProps(
            id = id,
            enumName = enumName,
            values = values,
            selectedValue = selectedValue,
            onSelectionChange = actionId
        )
    ))
    
    // Store enum properties as variables for easy access using nested keys
    KetoyVariableRegistry.register(KetoyVariable.Mutable("$id.selectedValue", selectedValue))
    KetoyVariableRegistry.register(KetoyVariable.Immutable("$id.values", values))
    KetoyVariableRegistry.register(KetoyVariable.Immutable("$id.enumName", enumName))
}

// ============================================
// TOP-LEVEL DSL FUNCTIONS - SIMPLIFIED
// ============================================

// Top-level functions use the universal scope
fun KColumn(
    modifier: KModifier? = null,
    verticalArrangement: String? = null,
    horizontalAlignment: String? = null,
    content: KUniversalScope.() -> Unit
): KColumnNode {
    val scope = KUniversalScope()
    scope.content()
    return KColumnNode(
        props = KColumnProps(
            modifier = modifier,
            verticalArrangement = verticalArrangement,
            horizontalAlignment = horizontalAlignment
        ),
        children = scope.children
    )
}

fun KRow(
    modifier: KModifier? = null,
    horizontalArrangement: String? = null,
    verticalAlignment: String? = null,
    content: KUniversalScope.() -> Unit
): KRowNode {
    val scope = KUniversalScope()
    scope.content()
    return KRowNode(
        props = KRowProps(
            modifier = modifier,
            horizontalArrangement = horizontalArrangement,
            verticalAlignment = verticalAlignment
        ),
        children = scope.children
    )
}

fun KBox(
    modifier: KModifier? = null,
    contentAlignment: String? = null,
    content: KUniversalScope.() -> Unit
): KBoxNode {
    val scope = KUniversalScope()
    scope.content()
    return KBoxNode(
        props = KBoxProps(
            modifier = modifier,
            contentAlignment = contentAlignment
        ),
        children = scope.children
    )
}

fun KLazyColumn(
    modifier: KModifier? = null,
    verticalArrangement: String? = null,
    horizontalAlignment: String? = null,
    userScrollEnabled: Boolean? = null,
    reverseLayout: Boolean? = null,
    contentPadding: KPadding? = null,
    beyondBoundsItemCount: Int? = null,
    content: KLazyListScope.() -> Unit
): KLazyColumnNode {
    val scope = KLazyListScope()
    scope.content()
    return KLazyColumnNode(
        props = KLazyColumnProps(
            modifier = modifier,
            verticalArrangement = verticalArrangement,
            horizontalAlignment = horizontalAlignment,
            userScrollEnabled = userScrollEnabled,
            reverseLayout = reverseLayout,
            contentPadding = contentPadding,
            beyondBoundsItemCount = beyondBoundsItemCount
        ),
        children = scope.children
    )
}

fun KLazyRow(
    modifier: KModifier? = null,
    horizontalArrangement: String? = null,
    verticalAlignment: String? = null,
    userScrollEnabled: Boolean? = null,
    reverseLayout: Boolean? = null,
    contentPadding: KPadding? = null,
    beyondBoundsItemCount: Int? = null,
    content: KLazyListScope.() -> Unit
): KLazyRowNode {
    val scope = KLazyListScope()
    scope.content()
    return KLazyRowNode(
        props = KLazyRowProps(
            modifier = modifier,
            horizontalArrangement = horizontalArrangement,
            verticalAlignment = verticalAlignment,
            userScrollEnabled = userScrollEnabled,
            reverseLayout = reverseLayout,
            contentPadding = contentPadding,
            beyondBoundsItemCount = beyondBoundsItemCount
        ),
        children = scope.children
    )
}

fun KScaffold(
    modifier: KModifier? = null,
    containerColor: String? = null,
    contentColor: String? = null,
    contentWindowInsets: KWindowInsets? = null,
    topBar: (KScaffoldScope.() -> Unit)? = null,
    bottomBar: (KScaffoldScope.() -> Unit)? = null,
    snackbarHost: (KScaffoldScope.() -> Unit)? = null,
    floatingActionButton: (KScaffoldScope.() -> Unit)? = null,
    floatingActionButtonPosition: String? = null,    // Use KFabPosition constants
    content: KUniversalScope.() -> Unit
): KScaffoldNode {
    val scaffoldScope = KUniversalScope().apply(content)
    
    // Create slots content
    val topBarContent = topBar?.let { 
        val scope = KScaffoldScope()
        scope.it()
        scope.children
    }
    
    val bottomBarContent = bottomBar?.let { 
        val scope = KScaffoldScope()
        scope.it()
        scope.children
    }
    
    val snackbarHostContent = snackbarHost?.let { 
        val scope = KScaffoldScope()
        scope.it()
        scope.children
    }
    
    val fabContent = floatingActionButton?.let { 
        val scope = KScaffoldScope()
        scope.it()
        scope.children
    }
    
    return KScaffoldNode(
        props = KScaffoldProps(
            modifier = modifier,
            topBar = topBarContent,
            bottomBar = bottomBarContent,
            snackbarHost = snackbarHostContent,
            floatingActionButton = fabContent,
            floatingActionButtonPosition = floatingActionButtonPosition ?: KFabPosition.End,
            containerColor = containerColor,
            contentColor = contentColor,
            contentWindowInsets = contentWindowInsets
        ),
        children = scaffoldScope.children
    )
}

// ============================================
// EXTENSION FUNCTIONS FOR DYNAMIC COMPONENTS
// ============================================

// Add any component to any scope dynamically
fun KUniversalScope.addAny(component: KNode) {
    addComponent(component)
}

// Create components programmatically
fun KUniversalScope.createText(text: String, color: String? = null) = KText(text = text, color = color)
fun KUniversalScope.createButton(text: String, color: String? = null, onClick: () -> Unit = {}) {
    KButton(containerColor = color, onClick = onClick) {
        KText(text)
    }
}

// Helper functions for creating modifiers and properties
fun kModifier(
    fillMaxSize: Float? = null,        // Support fraction values: 1.0f = full size, 0.8f = 80%
    fillMaxWidth: Float? = null,       // Support fraction values: 1.0f = full width, 0.5f = 50%
    fillMaxHeight: Float? = null,      // Support fraction values: 1.0f = full height, 0.3f = 30%
    weight: Float? = null,             // Weight for Row/Column layouts (e.g., 1.0f, 2.0f)
    size: Int? = null,
    width: Int? = null,
    height: Int? = null,
    padding: KPadding? = null,
    margin: KMargin? = null,
    background: String? = null,
    gradient: KGradient? = null,       // Gradient background support
    border: KBorder? = null,
    shape: String? = null,
    cornerRadius: Int? = null,
    shadow: KShadow? = null,
    clickable: Boolean? = null,
    scale: Float? = null,
    rotation: Float? = null,
    alpha: Float? = null
) = KModifier(
    fillMaxSize = fillMaxSize,
    fillMaxWidth = fillMaxWidth,
    fillMaxHeight = fillMaxHeight,
    weight = weight,
    size = size,
    width = width,
    height = height,
    padding = padding,
    margin = margin,
    background = background,
    gradient = gradient,
    border = border,
    shape = shape,
    cornerRadius = cornerRadius,
    shadow = shadow,
    clickable = clickable,
    scale = scale,
    rotation = rotation,
    alpha = alpha
)

fun kPadding(
    all: Int? = null,
    horizontal: Int? = null,
    vertical: Int? = null,
    top: Int? = null,
    bottom: Int? = null,
    start: Int? = null,
    end: Int? = null
) = KPadding(all, horizontal, vertical, top, bottom, start, end)

fun kMargin(
    all: Int? = null,
    horizontal: Int? = null,
    vertical: Int? = null,
    top: Int? = null,
    bottom: Int? = null,
    start: Int? = null,
    end: Int? = null
) = KMargin(all, horizontal, vertical, top, bottom, start, end)

fun kBorder(
    width: Int,
    color: String,
    shape: String? = null
) = KBorder(width, color, shape)

fun kShadow(
    elevation: Int,
    color: String? = null,
    offsetX: Float? = null,
    offsetY: Float? = null,
    blurRadius: Float? = null
) = KShadow(elevation, color, offsetX, offsetY, blurRadius)

// Color constants for easier usage
object KColors {
    // Predefined colors
    const val Blue = "#FF2196F3"
    const val Red = "#FFF44336"
    const val Green = "#FF4CAF50"
    const val Orange = "#FFFF9800"
    const val Purple = "#FF9C27B0"
    const val Teal = "#FF009688"
    const val Gray = "#FF9E9E9E"
    const val Black = "#FF000000"
    const val White = "#FFFFFFFF"
    const val Transparent = "#00000000"
    
    /**
     * Create custom hex color
     * @param hex Color in hex format: "#RRGGBB" or "#AARRGGBB"
     * @return Full hex color with alpha (adds FF if missing)
     */
    fun hex(hex: String): String {
        return when {
            hex.startsWith("#") && hex.length == 7 -> "#FF${hex.substring(1)}" // Add full alpha
            hex.startsWith("#") && hex.length == 9 -> hex // Already has alpha
            hex.length == 6 -> "#FF$hex" // Add # and full alpha
            hex.length == 8 -> "#$hex" // Add # only
            else -> "#FF000000" // Default to black if invalid
        }
    }
    
    /**
     * Create color with alpha
     * @param color Base color (predefined constant or hex)
     * @param alpha Alpha value 0.0f-1.0f (0 = transparent, 1 = opaque)
     * @return Color with applied alpha
     */
    fun withAlpha(color: String, alpha: Float): String {
        val clampedAlpha = alpha.coerceIn(0.0f, 1.0f)
        val alphaHex = (clampedAlpha * 255).toInt().toString(16).uppercase().padStart(2, '0')
        
        return when {
            color.startsWith("#") && color.length >= 7 -> {
                val rgb = color.substring(color.length - 6) // Get last 6 chars (RGB)
                "#$alphaHex$rgb"
            }
            else -> "#${alphaHex}000000" // Default to black if invalid
        }
    }
    
    /**
     * Add alpha to predefined color using percentage
     * @param color Base color 
     * @param alphaPercent Alpha percentage 0-100 (0 = transparent, 100 = opaque)
     * @return Color with applied alpha
     */
    fun withAlphaPercent(color: String, alphaPercent: Int): String {
        return withAlpha(color, alphaPercent / 100.0f)
    }
}

// Gradient system for backgrounds
@Serializable
data class KGradient(
    val type: String,                           // "linear", "radial", "angular", "sweep"
    val colors: List<String>,                   // List of hex colors with optional alpha
    val direction: String? = null,              // "horizontal", "vertical", "diagonal", "diagonalReverse"
    val angle: Float? = null,                   // Custom angle in degrees (0-360)
    val centerX: Float? = null,                 // Center X for radial (0.0-1.0)
    val centerY: Float? = null,                 // Center Y for radial (0.0-1.0)
    val radius: Float? = null,                  // Radius for radial gradient
    val startAngle: Float? = null,              // Start angle for sweep gradient
    val endAngle: Float? = null                 // End angle for sweep gradient
)

// Gradient builder object
object KGradients {
    /**
     * Linear gradient with predefined direction
     */
    fun linear(colors: List<String>, direction: String = "vertical"): KGradient {
        return KGradient(
            type = "linear",
            colors = colors,
            direction = direction
        )
    }
    
    /**
     * Linear gradient with custom angle
     */
    fun linearAngle(colors: List<String>, angleDegrees: Float): KGradient {
        return KGradient(
            type = "linear",
            colors = colors,
            angle = angleDegrees
        )
    }
    
    /**
     * Radial gradient from center
     */
    fun radial(colors: List<String>, radius: Float? = null): KGradient {
        return KGradient(
            type = "radial",
            colors = colors,
            radius = radius,
            centerX = 0.5f,
            centerY = 0.5f
        )
    }
    
    /**
     * Radial gradient with custom center
     */
    fun radialCenter(colors: List<String>, centerX: Float, centerY: Float, radius: Float? = null): KGradient {
        return KGradient(
            type = "radial",
            colors = colors,
            centerX = centerX,
            centerY = centerY,
            radius = radius
        )
    }
    
    /**
     * Angular/Sweep gradient
     */
    fun sweep(colors: List<String>, centerX: Float = 0.5f, centerY: Float = 0.5f): KGradient {
        return KGradient(
            type = "sweep",
            colors = colors,
            centerX = centerX,
            centerY = centerY
        )
    }
    
    /**
     * Angular gradient with custom angles
     */
    fun sweepAngles(colors: List<String>, startAngle: Float, endAngle: Float, centerX: Float = 0.5f, centerY: Float = 0.5f): KGradient {
        return KGradient(
            type = "sweep",
            colors = colors,
            startAngle = startAngle,
            endAngle = endAngle,
            centerX = centerX,
            centerY = centerY
        )
    }
    
    // Predefined direction constants
    object Directions {
        const val Horizontal = "horizontal"
        const val Vertical = "vertical"
        const val Diagonal = "diagonal"           // Top-left to bottom-right
        const val DiagonalReverse = "diagonalReverse"  // Top-right to bottom-left
    }
}

// Arrangement constants
object KArrangements {
    const val Start = "start"
    const val Top = "top"
    const val Center = "center"
    const val End = "end"
    const val Bottom = "bottom"
    const val SpaceBetween = "spaceBetween"
    const val SpaceEvenly = "spaceEvenly"
    const val SpaceAround = "spaceAround"
}

// Alignment constants  
object KAlignments {
    // Basic directional alignments
    const val Start = "start"
    const val Center = "center"
    const val End = "end"
    const val Top = "top"
    const val Bottom = "bottom"
    
    // Column alignments (horizontal alignment within column)
    const val CenterHorizontally = "centerHorizontally"
    const val CenterVertically = "centerVertically"
    
    // Box content alignment (complete 9-point grid)
    const val TopStart = "topStart"
    const val TopCenter = "topCenter"
    const val TopEnd = "topEnd"
    const val CenterStart = "centerStart"
    const val CenterEnd = "centerEnd"
    const val BottomStart = "bottomStart"
    const val BottomCenter = "bottomCenter"
    const val BottomEnd = "bottomEnd"
}

// Font weight constants
object KFontWeights {
    const val Normal = "normal"
    const val Bold = "bold"
    const val Medium = "medium"
    const val Light = "light"
    const val SemiBold = "semiBold"
}

// Text align constants
object KTextAlign {
    const val Start = "start"
    const val Center = "center"
    const val End = "end"
    const val Justify = "justify"
}

// Shape system - both dynamic functions and constants
object KShapes {
    // Dynamic shape functions (recommended)
    fun rounded(radius: Int) = "rounded_$radius"
    fun rounded(
        topStart: Int = 0,
        topEnd: Int = 0,
        bottomEnd: Int = 0,
        bottomStart: Int = 0
    ) = "rounded_corners_${topStart}_${topEnd}_${bottomEnd}_${bottomStart}"
    fun circle() = "circle"
    fun rectangle() = "rectangle"
    fun clip() = "clip"
    
    // Convenience constants (legacy support)
    const val Rectangle = "rectangle"
    const val Circle = "circle"
    const val Clip = "clip"
    const val Rounded4 = "rounded_4"
    const val Rounded8 = "rounded_8"
    const val Rounded12 = "rounded_12"
    const val Rounded16 = "rounded_16"
    const val Rounded20 = "rounded_20"
    const val Rounded24 = "rounded_24"
    const val Rounded28 = "rounded_28"
    const val Rounded32 = "rounded_32"
}

// Global shape helper functions for cleaner syntax
fun kRounded(radius: Int) = KShapes.rounded(radius)
fun kRounded(
    topStart: Int = 0,
    topEnd: Int = 0,
    bottomEnd: Int = 0,
    bottomStart: Int = 0
) = KShapes.rounded(topStart, topEnd, bottomEnd, bottomStart)
fun kCircle() = KShapes.circle()
fun kRectangle() = KShapes.rectangle()
fun kClip() = KShapes.clip()

// ============================================
// SCAFFOLD CONSTANTS AND DEFAULTS
// ============================================

// FloatingActionButton Position constants
object KFabPosition {
    const val Start = "start"
    const val Center = "center"
    const val End = "end"                              // Default Material 3
    const val EndOverlay = "endOverlay"
    const val CenterDocked = "centerDocked"
    const val EndDocked = "endDocked"
}

// TopAppBar Type constants
object KTopAppBarType {
    const val Small = "small"                          // Default
    const val CenterAligned = "centerAligned"
    const val Medium = "medium"
    const val Large = "large"
}

// FloatingActionButton Type constants  
object KFabType {
    const val Regular = "regular"                      // Default
    const val Small = "small"
    const val Large = "large"
    const val Extended = "extended"
}

// SnackBar Duration constants
object KSnackBarDuration {
    const val Short = "short"                          // 4 seconds
    const val Long = "long"                            // 10 seconds
    const val Indefinite = "indefinite"                // Until dismissed
}

// TopAppBar Scroll Behavior constants
object KTopAppBarScrollBehaviorDefaults {
    const val PinnedScroll = "pinnedScroll"            // Pinned to top
    const val EnterAlwaysScroll = "enterAlwaysScroll"  // Always visible when scrolling up
    const val ExitUntilCollapsedScroll = "exitUntilCollapsedScroll" // Collapses when scrolling
}

// Window Insets Type constants
object KWindowInsetsDefaults {
    const val StatusBars = "statusBars"
    const val NavigationBars = "navigationBars"
    const val Ime = "ime"                              // Input Method Editor
    const val SystemBars = "systemBars"                // Status + Navigation
    const val SystemGestures = "systemGestures"
    const val MandatorySystemGestures = "mandatorySystemGestures"
    const val TappableElement = "tappableElement"
    const val WaterFall = "waterFall"
    const val DisplayCutout = "displayCutout"
    const val CaptionBar = "captionBar"
}

// Default Colors for Scaffold Components
object KScaffoldDefaults {
    // Material 3 Default Colors
    const val ContainerColor = "#FFFBFE"               // surface
    const val ContentColor = "#1D1B20"                 // onSurface
    
    // TopAppBar Colors
    const val TopAppBarContainerColor = "#FFFBFE"      // surface
    const val TopAppBarContentColor = "#1D1B20"        // onSurface
    
    // BottomAppBar Colors
    const val BottomAppBarContainerColor = "#FFFBFE"   // surface
    const val BottomAppBarContentColor = "#1D1B20"     // onSurface
    
    // NavigationBar Colors
    const val NavigationBarContainerColor = "#FFFBFE"  // surface
    const val NavigationBarContentColor = "#1D1B20"    // onSurface
    
    // FAB Colors
    const val FabContainerColor = "#6750A4"            // primary
    const val FabContentColor = "#FFFFFF"              // onPrimary
    
    // SnackBar Colors
    const val SnackBarContainerColor = "#313033"       // inverseOnSurface
    const val SnackBarContentColor = "#E6E1E5"         // inverseSurface
    const val SnackBarActionColor = "#D0BCFF"          // inversePrimary
}

// Helper functions for creating common Scaffold configurations
fun kWindowInsets(
    left: Int? = null,
    top: Int? = null,
    right: Int? = null,
    bottom: Int? = null,
    type: String? = null
) = KWindowInsets(left, top, right, bottom, type)

fun kTopAppBarColors(
    containerColor: String? = null,
    scrolledContainerColor: String? = null,
    navigationIconContentColor: String? = null,
    titleContentColor: String? = null,
    actionIconContentColor: String? = null
) = KTopAppBarColors(containerColor, scrolledContainerColor, navigationIconContentColor, titleContentColor, actionIconContentColor)

fun kFabElevation(
    defaultElevation: Int? = null,
    pressedElevation: Int? = null,
    focusedElevation: Int? = null,
    hoveredElevation: Int? = null,
    disabledElevation: Int? = null
) = KFloatingActionButtonElevation(defaultElevation, pressedElevation, focusedElevation, hoveredElevation, disabledElevation)

fun kNavigationDrawerItemColors(
    selectedContainerColor: String? = null,
    unselectedContainerColor: String? = null,
    selectedIconColor: String? = null,
    unselectedIconColor: String? = null,
    selectedTextColor: String? = null,
    unselectedTextColor: String? = null,
    selectedBadgeColor: String? = null,
    unselectedBadgeColor: String? = null
) = KNavigationDrawerItemColors(selectedContainerColor, unselectedContainerColor, selectedIconColor, unselectedIconColor, selectedTextColor, unselectedTextColor, selectedBadgeColor, unselectedBadgeColor)

fun kIconButtonColors(
    containerColor: String? = null,
    contentColor: String? = null,
    disabledContainerColor: String? = null,
    disabledContentColor: String? = null
) = KIconButtonColors(containerColor, contentColor, disabledContainerColor, disabledContentColor)

// Global image source helper functions for cleaner syntax
fun kImageRes(resourceName: String) = KResImageSource(resourceName)
fun kImageUrl(url: String) = KUrlImageSource(url)
fun kImageBase64(base64String: String) = KBase64ImageSource(base64String)

// Enhanced JSON serialization with component metadata
@Serializable
data class KetoyJsonSchema(
    val ui: KNode,                                          // The UI structure
    val components: Map<String, KComponentMetadata> = emptyMap(), // Used components metadata
    val version: String = "1.0",                           // Schema version
    val requiredImports: List<String> = emptyList(),       // Global imports needed
    val fallbackMode: String = "graceful"                  // How to handle missing components
)

// Utility function to convert KNode to JSON string
fun KNode.toJson(): String {
    return KetoyJson.encodeToString(KNode.serializer(), this)
}

// Enhanced JSON conversion with metadata
fun KNode.toEnhancedJson(): String {
    val usedComponents = extractUsedComponents(this)
    val componentMetadata = usedComponents.mapNotNull { componentName ->
        KComponentRegistry.getMetadata(componentName)?.let { componentName to it }
    }.toMap()
    
    val schema = KetoyJsonSchema(
        ui = this,
        components = componentMetadata,
        requiredImports = componentMetadata.values.flatMap { it.imports }.distinct()
    )
    
    return KetoyJson.encodeToString(KetoyJsonSchema.serializer(), schema)
}

// Extract all component names used in a UI tree
private fun extractUsedComponents(node: KNode): List<String> {
    val components = mutableListOf<String>()
    
    when (node) {
        is KComponentNode -> {
            val name = node.props.name.ifEmpty { node.props.componentName }
            if (name.isNotEmpty()) {
                components.add(name)
            }
        }
        is KColumnNode -> node.children.forEach { components.addAll(extractUsedComponents(it)) }
        is KRowNode -> node.children.forEach { components.addAll(extractUsedComponents(it)) }
        is KBoxNode -> node.children.forEach { components.addAll(extractUsedComponents(it)) }
        is KButtonNode -> node.children.forEach { components.addAll(extractUsedComponents(it)) }
        is KCardNode -> node.children.forEach { components.addAll(extractUsedComponents(it)) }
        is KLazyColumnNode -> node.children.forEach { components.addAll(extractUsedComponents(it)) }
        is KLazyRowNode -> node.children.forEach { components.addAll(extractUsedComponents(it)) }
        else -> {}
    }
    
    return components.distinct()
}

// Parse enhanced JSON with automatic component loading
fun parseEnhancedJson(jsonString: String): KNode {
    return try {
        val schema = KetoyJson.decodeFromString<KetoyJsonSchema>(jsonString)
        
        // Load components from metadata
        schema.components.values.forEach { metadata ->
            if (!KComponentRegistry.isAvailable(metadata.name)) {
                KComponentRegistry.loadFromMetadata(metadata)
            }
        }
        
        schema.ui
    } catch (e: Exception) {
        // Fallback to regular JSON parsing
        try {
            KetoyJson.decodeFromString<KNode>(jsonString)
        } catch (fallbackException: Exception) {
            // Return error node
            KTextNode(KTextProps(text = "Error parsing JSON: ${e.message}"))
        }
    }
}

// Ketoy initialization function - call this at app startup
object KetoyInitializer {
    private var isInitialized = false
    
    fun initialize() {
        if (isInitialized) return
        
        try {
            // Initialize component registry
            KComponentRegistry.initialize()
            
            // Clear action registry (optional)
            ActionRegistry.clear()
            
            // Clear variable registry (optional)
            KetoyVariableRegistry.clear()
            
            isInitialized = true
            println("Ketoy initialized successfully")
        } catch (e: Exception) {
            println("Ketoy initialization failed: ${e.message}")
        }
    }
    
    fun isInitialized(): Boolean = isInitialized
    
    fun reset() {
        KComponentRegistry.reset()
        ActionRegistry.clear()
        KetoyVariableRegistry.clear()
        isInitialized = false
    }
}

// Global JSON configuration for consistent parsing
val KetoyJson = Json { 
    prettyPrint = true
    encodeDefaults = false
    ignoreUnknownKeys = true  // Allow unknown keys for backwards compatibility
}

// Backwards compatible JSON parsing function
fun parseKetoyJson(jsonString: String): KNode {
    return try {
        KetoyJson.decodeFromString<KNode>(jsonString)
    } catch (e: Exception) {
        // Return error node with helpful message
        KTextNode(KTextProps(
            text = "Failed to parse JSON: ${e.message}",
            color = KColors.Red,
            fontSize = 12
        ))
    }
}