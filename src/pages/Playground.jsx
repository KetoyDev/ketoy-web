import React, { useState } from 'react';
import UIRenderer from '../components/UIRenderer';

export default function Playground() {
  const [activeTab, setActiveTab] = useState('dsl');

  const sampleDSL = `// K-DSL Code - Full Featured Example
val screen = KColumn(
  modifier = kModifier(
    fillMaxSize = 1.0f,
    margin = kMargin(horizontal = 20)
  ),
  verticalArrangement = KArrangements.Center,
  horizontalAlignment = KAlignments.CenterHorizontally
) {
  // Welcome Card with custom corners
  KCard(
    modifier = kModifier(
      fillMaxWidth = 0.95f,
      rotation = 0.0f
    ),
    shape = kRounded(
      topStart = 20, topEnd = 40, 
      bottomEnd = 10, bottomStart = 30
    ),
    containerColor = "#FFe1eaf7",
    elevation = 10,
    border = kBorder(width = 2, color = "#FF2196F3")
  ) {
    KColumn(
      modifier = kModifier(margin = kMargin(all = 30))
    ) {
      KText(
        text = "Hello Ketoyies!",
        fontSize = 24,
        fontWeight = KFontWeights.Bold,
        color = "#FF2196F3"
      )
      KSpacer(height = 20)
      KText(
        text = "Welcome to Server Based UI Development, \\nby Ketoy!",
        textAlign = KTextAlign.Center
      )
    }
  }
  
  KSpacer(height = 20)
  
  // Button Row Demo
  KText(
    text = "Magic with Buttons 🪄",
    modifier = kModifier(margin = kMargin(start = 20)),
    fontSize = 20,
    fontWeight = KFontWeights.Bold
  )
  
  KSpacer(height = 20)
  
  KRow(
    modifier = kModifier(fillMaxWidth = 0.9f),
    horizontalArrangement = KArrangements.SpaceEvenly
  ) {
    KButton(
      onClick = { /* Action 1 */ },
      containerColor = "#FF2196F3"
    ) {
      KText(text = "One", color = "#FFFFFFFF")
    }
    KButton(
      onClick = { /* Action 2 */ },
      containerColor = "#FF9E9E9E"
    ) {
      KText(text = "Two", color = "#FF000000")
    }
    KButton(
      onClick = { /* Action 3 */ },
      containerColor = "#FFFF9800"
    ) {
      KText(text = "Three", color = "#FFFFFFFF")
    }
  }
  
  KSpacer(height = 16)
  
  // Travel Card with Gradient & Image
  KCard(
    modifier = kModifier(
      fillMaxWidth = 1.0f,
      height = 230
    ),
    shape = KShapes.Rounded20,
    elevation = 10
  ) {
    KBox(
      modifier = kModifier(fillMaxSize = 1.0f),
      contentAlignment = KAlignments.BottomCenter
    ) {
      // Background image
      KImage(
        source = kImageRes("img"),
        modifier = kModifier(fillMaxSize = 1.0f),
        contentDescription = "App logo",
        scaleType = KScaleType.FillBounds
      )
      
      // Overlay with gradient
      KColumn {
        KBox(
          modifier = kModifier(
            fillMaxWidth = 1.0f,
            height = 100,
            gradient = KGradients.linear(
              colors = listOf("#00000000", "#FF212121"),
              direction = "vertical"
            )
          ),
          contentAlignment = KAlignments.BottomCenter
        ) {
          KRow(
            modifier = kModifier(
              fillMaxSize = 1.0f,
              margin = kMargin(bottom = 10)
            ),
            horizontalArrangement = KArrangements.SpaceAround,
            verticalAlignment = KAlignments.Bottom
          ) {
            KColumn {
              KText(
                text = "2 Day tour to Japan",
                fontSize = 16,
                fontWeight = KFontWeights.Bold,
                color = "#FFFFFFFF"
              )
              KSpacer(height = 10)
              KCard(
                modifier = kModifier(width = 90, height = 30),
                shape = KShapes.rounded(100),
                containerColor = "#FF2196F3",
                elevation = 1
              ) {
                KRow(
                  modifier = kModifier(fillMaxSize = 1.0f),
                  horizontalArrangement = KArrangements.Center,
                  verticalAlignment = KAlignments.CenterVertically
                ) {
                  KText(
                    text = "Book Now",
                    fontSize = 12,
                    color = "#FFFFFFFF"
                  )
                }
              }
            }
            KColumn(
              horizontalAlignment = KAlignments.CenterHorizontally
            ) {
              KText(
                text = "1,500$ /-",
                fontSize = 14,
                fontWeight = KFontWeights.Bold,
                color = "#FFFFFFFF"
              )
              KSpacer(height = 10)
              KText(
                text = "50% off",
                fontSize = 14,
                fontWeight = KFontWeights.Bold,
                color = "#ff8cff7a"
              )
            }
          }
        }
        // Blue footer bar
        KBox(
          modifier = kModifier(
            fillMaxWidth = 1.0f,
            height = 30,
            background = "#FF2196F3"
          ),
          contentAlignment = KAlignments.Center
        ) {
          KText(
            text = "Best international trip experience, at low cost!",
            fontSize = 12,
            fontWeight = KFontWeights.Medium,
            color = "#FFFFFFFF"
          )
        }
      }
    }
  }
  
  KSpacer(height = 16)
  
  // URL Image Example
  KImage(
    source = kImageUrl("https://picsum.photos/200/150?random=1"),
    modifier = kModifier(
      width = 200,
      height = 150,
      padding = kPadding(all = 8)
    ),
    contentDescription = "Random image from URL",
    scaleType = KScaleType.CenterCrop
  )
  
  KSpacer(height = 30)
  
  // Custom Components Demo
  KText(
    text = "🧩 Custom Components Demo",
    modifier = kModifier(padding = kPadding(vertical = 10)),
    fontSize = 20,
    fontWeight = KFontWeights.Bold,
    color = "#FF2196F3"
  )
  
  // User Cards
  KComponent(
    name = "UserCard",
    properties = mapOf(
      "name" to "Aditya Shinde",
      "email" to "aditya@ketoy.dev",
      "isOnline" to true
    )
  )
  
  KComponent(
    name = "UserCard",
    properties = mapOf(
      "name" to "John Doe",
      "email" to "john@example.com",
      "isOnline" to false
    )
  )
  
  KSpacer(height = 20)
  
  // Stats Cards Row
  KRow(
    modifier = kModifier(fillMaxWidth = 1.0f),
    horizontalArrangement = KArrangements.SpaceEvenly
  ) {
    KComponent(
      name = "StatsCard",
      properties = mapOf(
        "title" to "Users",
        "value" to "1.2K",
        "subtitle" to "+12%",
        "color" to "#4CAF50"
      )
    )
    KComponent(
      name = "StatsCard",
      properties = mapOf(
        "title" to "Revenue",
        "value" to "$45K",
        "subtitle" to "+8.5%",
        "color" to "#2196F3"
      )
    )
  }
  
  KSpacer(height = 20)
  
  // Action Buttons Row
  KRow(
    modifier = kModifier(fillMaxWidth = 1.0f),
    horizontalArrangement = KArrangements.SpaceEvenly
  ) {
    KComponent(
      name = "ActionButton",
      properties = mapOf(
        "text" to "Save",
        "icon" to "💾",
        "variant" to "primary",
        "size" to "medium"
      )
    )
    KComponent(
      name = "ActionButton",
      properties = mapOf(
        "text" to "Cancel",
        "variant" to "secondary",
        "size" to "medium"
      )
    )
    KComponent(
      name = "ActionButton",
      properties = mapOf(
        "text" to "Delete",
        "icon" to "🗑️",
        "variant" to "danger",
        "size" to "small"
      )
    )
  }
}

// Convert to JSON (one line!)
val json = screen.toJson()`;

  const sampleJSON = `{
  "type": "Column",
  "props": {
    "modifier": {
      "fillMaxSize": 1.0,
      "margin": { "horizontal": 20 }
    },
    "verticalArrangement": "center",
    "horizontalAlignment": "centerHorizontally"
  },
  "children": [
    {
      "type": "Card",
      "props": {
        "modifier": {
          "fillMaxWidth": 0.95,
          "rotation": 0.0
        },
        "shape": "rounded_corners_20_40_10_30",
        "containerColor": "#FFe1eaf7",
        "elevation": 10,
        "border": { "width": 2, "color": "#FF2196F3" }
      },
      "children": [
        {
          "type": "Column",
          "props": {
            "modifier": { "margin": { "all": 30 } }
          },
          "children": [
            {
              "type": "Text",
              "props": {
                "text": "Hello Ketoyies!",
                "fontSize": 24,
                "fontWeight": "bold",
                "color": "#FF2196F3"
              }
            },
            { "type": "Spacer", "props": { "height": 20 } },
            {
              "type": "Text",
              "props": {
                "text": "Welcome to Server Based UI Development, \\nby Ketoy!",
                "textAlign": "center"
              }
            }
          ]
        }
      ]
    },
    { "type": "Spacer", "props": { "height": 20 } },
    {
      "type": "Text",
      "props": {
        "text": "Magic with Buttons 🪄",
        "modifier": { "margin": { "start": 20 } },
        "fontSize": 20,
        "fontWeight": "bold"
      }
    },
    { "type": "Spacer", "props": { "height": 20 } },
    {
      "type": "Row",
      "props": {
        "modifier": { "fillMaxWidth": 0.9 },
        "horizontalArrangement": "spaceEvenly"
      },
      "children": [
        {
          "type": "Button",
          "props": {
            "onClick": "action_0",
            "containerColor": "#FF2196F3"
          },
          "children": [
            { "type": "Text", "props": { "text": "One", "color": "#FFFFFFFF" } }
          ]
        },
        {
          "type": "Button",
          "props": {
            "onClick": "action_1",
            "containerColor": "#FF9E9E9E"
          },
          "children": [
            { "type": "Text", "props": { "text": "Two", "color": "#FF000000" } }
          ]
        },
        {
          "type": "Button",
          "props": {
            "onClick": "action_2",
            "containerColor": "#FFFF9800"
          },
          "children": [
            { "type": "Text", "props": { "text": "Three", "color": "#FFFFFFFF" } }
          ]
        }
      ]
    },
    { "type": "Spacer", "props": { "height": 16 } },
    {
      "type": "Card",
      "props": {
        "modifier": { "fillMaxWidth": 1.0, "height": 230 },
        "shape": "rounded_20",
        "elevation": 10
      },
      "children": [
        {
          "type": "Box",
          "props": {
            "modifier": { "fillMaxSize": 1.0 },
            "contentAlignment": "bottomCenter"
          },
          "children": [
            {
              "type": "Image",
              "props": {
                "source": { "type": "res", "value": "img" },
                "modifier": { "fillMaxSize": 1.0 },
                "contentDescription": "App logo",
                "scaleType": "fillBounds"
              }
            },
            {
              "type": "Column",
              "children": [
                {
                  "type": "Box",
                  "props": {
                    "modifier": {
                      "fillMaxWidth": 1.0,
                      "height": 100,
                      "gradient": {
                        "type": "linear",
                        "colors": ["#00000000", "#FF212121"],
                        "direction": "vertical"
                      }
                    },
                    "contentAlignment": "bottomCenter"
                  },
                  "children": [
                    {
                      "type": "Row",
                      "props": {
                        "modifier": {
                          "fillMaxSize": 1.0,
                          "margin": { "bottom": 10 }
                        },
                        "horizontalArrangement": "spaceAround",
                        "verticalAlignment": "bottom"
                      },
                      "children": [
                        {
                          "type": "Column",
                          "children": [
                            {
                              "type": "Text",
                              "props": {
                                "text": "2 Day tour to Japan",
                                "fontSize": 16,
                                "fontWeight": "bold",
                                "color": "#FFFFFFFF"
                              }
                            },
                            { "type": "Spacer", "props": { "height": 10 } },
                            {
                              "type": "Card",
                              "props": {
                                "modifier": { "width": 90, "height": 30 },
                                "shape": "rounded_100",
                                "containerColor": "#FF2196F3",
                                "elevation": 1
                              },
                              "children": [
                                {
                                  "type": "Row",
                                  "props": {
                                    "modifier": { "fillMaxSize": 1.0 },
                                    "horizontalArrangement": "center",
                                    "verticalAlignment": "centerVertically"
                                  },
                                  "children": [
                                    {
                                      "type": "Text",
                                      "props": {
                                        "text": "Book Now",
                                        "fontSize": 12,
                                        "color": "#FFFFFFFF"
                                      }
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        },
                        {
                          "type": "Column",
                          "props": { "horizontalAlignment": "centerHorizontally" },
                          "children": [
                            {
                              "type": "Text",
                              "props": {
                                "text": "1,500$ /-",
                                "fontSize": 14,
                                "fontWeight": "bold",
                                "color": "#FFFFFFFF"
                              }
                            },
                            { "type": "Spacer", "props": { "height": 10 } },
                            {
                              "type": "Text",
                              "props": {
                                "text": "50% off",
                                "fontSize": 14,
                                "fontWeight": "bold",
                                "color": "#ff8cff7a"
                              }
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "Box",
                  "props": {
                    "modifier": {
                      "fillMaxWidth": 1.0,
                      "height": 30,
                      "background": "#FF2196F3"
                    },
                    "contentAlignment": "center"
                  },
                  "children": [
                    {
                      "type": "Text",
                      "props": {
                        "text": "Best international trip experience, at low cost!",
                        "fontSize": 12,
                        "fontWeight": "medium",
                        "color": "#FFFFFFFF"
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    { "type": "Spacer", "props": { "height": 16 } },
    {
      "type": "Image",
      "props": {
        "source": {
          "type": "url",
          "value": "https://picsum.photos/200/150?random=1"
        },
        "modifier": {
          "width": 200,
          "height": 150,
          "padding": { "all": 8 }
        },
        "contentDescription": "Random image from URL",
        "scaleType": "centerCrop"
      }
    },
    { "type": "Spacer", "props": { "height": 30 } },
    {
      "type": "Text",
      "props": {
        "text": "🧩 Custom Components Demo",
        "modifier": { "padding": { "vertical": 10 } },
        "fontSize": 20,
        "fontWeight": "bold",
        "color": "#FF2196F3"
      }
    },
    {
      "type": "Component",
      "props": {
        "name": "UserCard",
        "properties": {
          "name": "Aditya Shinde",
          "email": "aditya@ketoy.dev",
          "isOnline": true
        }
      }
    },
    {
      "type": "Component",
      "props": {
        "name": "UserCard",
        "properties": {
          "name": "John Doe",
          "email": "john@example.com",
          "isOnline": false
        }
      }
    },
    { "type": "Spacer", "props": { "height": 20 } },
    {
      "type": "Row",
      "props": {
        "modifier": { "fillMaxWidth": 1.0 },
        "horizontalArrangement": "spaceEvenly"
      },
      "children": [
        {
          "type": "Component",
          "props": {
            "name": "StatsCard",
            "properties": {
              "title": "Users",
              "value": "1.2K",
              "subtitle": "+12%",
              "color": "#4CAF50"
            }
          }
        },
        {
          "type": "Component",
          "props": {
            "name": "StatsCard",
            "properties": {
              "title": "Revenue",
              "value": "$45K",
              "subtitle": "+8.5%",
              "color": "#2196F3"
            }
          }
        }
      ]
    },
    { "type": "Spacer", "props": { "height": 20 } },
    {
      "type": "Row",
      "props": {
        "modifier": { "fillMaxWidth": 1.0 },
        "horizontalArrangement": "spaceEvenly"
      },
      "children": [
        {
          "type": "Component",
          "props": {
            "name": "ActionButton",
            "properties": {
              "text": "Save",
              "icon": "💾",
              "variant": "primary",
              "size": "medium"
            }
          }
        },
        {
          "type": "Component",
          "props": {
            "name": "ActionButton",
            "properties": {
              "text": "Cancel",
              "variant": "secondary",
              "size": "medium"
            }
          }
        },
        {
          "type": "Component",
          "props": {
            "name": "ActionButton",
            "properties": {
              "text": "Delete",
              "icon": "🗑️",
              "variant": "danger",
              "size": "small"
            }
          }
        }
      ]
    }
  ]
}`;

  const composeUI = `@Composable
fun ServerDrivenScreen() {
  // 🚀 Receive JSON from server
  val serverJson = viewModel.fetchUILayout()
  
  // ✨ Render it instantly as native Compose UI
  JSONStringToUI(serverJson)
}

// Result: Native Jetpack Compose UI renders all features!
// 
// ✅ Welcome Card with custom rounded corners
//    ├─ "Hello Ketoyies!" title
//    ├─ Spacer
//    └─ Welcome message
//
// ✅ "Magic with Buttons 🪄" section
//    └─ Row with 3 colored buttons (Blue, Gray, Orange)
//
// ✅ Travel Booking Card
//    ├─ Background image (resource: "img")
//    ├─ Gradient overlay (transparent → dark)
//    ├─ "2 Day tour to Japan" with "Book Now" button
//    ├─ Price: "1,500$ /-" with "50% off" badge
//    └─ Blue footer bar with promotional text
//
// ✅ Random image from URL
//    └─ Loaded from: https://picsum.photos/200/150?random=1
//
// ✅ Custom Component Section
//    ├─ UserCard components (Aditya Shinde, John Doe)
//    │  └─ Shows name, email, online status
//    ├─ StatsCard components (Users: 1.2K, Revenue: $45K)
//    │  └─ Displays title, value, growth percentage
//    └─ ActionButton components (Save, Cancel, Delete)
//       └─ Different variants: primary, secondary, danger
//
// 🎨 Features Showcased:
// • Custom rounded corners (per-corner control)
// • Gradients (linear, transparent to solid)
// • Images (both resource & URL sources)
// • Custom components with properties
// • Complex nested layouts (Box, Column, Row)
// • Dynamic theming and colors
// • Modifiers (margin, padding, size, rotation)
//
// 💡 Update this JSON on your server = instant UI changes!
//    No app update needed, no Play Store approval required.`;

  return (
    <>
      <section id="playground" className="section page-section" style={{ 
        background: 'linear-gradient(180deg, #1e3a8a 0%, #1e40af 30%, #3b82f6 70%, #60a5fa 100%)', 
        position: 'relative',
        maskImage: 'linear-gradient(180deg, transparent, black 0%, black 85%, transparent)',
        WebkitMaskImage: 'linear-gradient(180deg, transparent, black 0%, black 85%, transparent)'
      }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 1.5rem 10rem' }}>
          {/* Header Section */}
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', marginBottom: '1.5rem', backdropFilter: 'blur(16px)' }}>
              <span style={{ fontSize: '12px', color: '#d4d4d8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Interactive Playground</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#3b82f6' }}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>

            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 600, lineHeight: 1.1, marginBottom: '1.5rem', background: 'linear-gradient(135deg, #ffffff 0%, #a0aec0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Experience the Power of<br/>
              <span style={{ background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>DSL → JSON → Compose UI</span>
            </h1>
            
            <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.7)', maxWidth: '42rem', margin: '0 auto 2rem' }}>
              Write type-safe K-DSL code, convert to portable JSON, and render as beautiful native Compose UI—all in real-time
            </p>
          </div>

          {/* Flow Diagram */}
          <div className="playground-flow" style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="flow-step" style={{ padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontWeight: 600, color: '#ffffff', backdropFilter: 'blur(16px)', transition: 'all 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              1. Write K-DSL
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            <div className="flow-step" style={{ padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontWeight: 600, color: '#ffffff', backdropFilter: 'blur(16px)', transition: 'all 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              2. Convert to JSON
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            <div className="flow-step" style={{ padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontWeight: 600, color: '#ffffff', backdropFilter: 'blur(16px)', transition: 'all 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              3. Render Compose UI
            </div>
          </div>

          {/* Interactive Code Viewer - Glassmorphic Card */}
          <div className="playground-container">
            <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 1px rgba(255,255,255,0.1) inset' }}>
              {/* Tabs */}
              <div className="playground-tabs" style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem 1.5rem 0' }}>
                <button 
                  className={`tab ${activeTab === 'dsl' ? 'active' : ''}`}
                  onClick={() => setActiveTab('dsl')}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: activeTab === 'dsl' ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                    border: 'none',
                    borderRadius: '12px 12px 0 0',
                    borderBottom: activeTab === 'dsl' ? '2px solid #3b82f6' : '2px solid transparent',
                    color: activeTab === 'dsl' ? '#60a5fa' : 'rgba(255,255,255,0.5)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    fontSize: '14px'
                  }}
                  onMouseEnter={(e) => { if (activeTab !== 'dsl') e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { if (activeTab !== 'dsl') e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                >
                  K-DSL
                </button>
                <button 
                  className={`tab ${activeTab === 'json' ? 'active' : ''}`}
                  onClick={() => setActiveTab('json')}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: activeTab === 'json' ? 'rgba(236, 72, 153, 0.2)' : 'transparent',
                    border: 'none',
                    borderRadius: '12px 12px 0 0',
                    borderBottom: activeTab === 'json' ? '2px solid #ec4899' : '2px solid transparent',
                    color: activeTab === 'json' ? '#f472b6' : 'rgba(255,255,255,0.5)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    fontSize: '14px'
                  }}
                  onMouseEnter={(e) => { if (activeTab !== 'json') e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { if (activeTab !== 'json') e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                >
                  JSON Output
                </button>
                <button 
                  className={`tab ${activeTab === 'ui' ? 'active' : ''}`}
                  onClick={() => setActiveTab('ui')}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: activeTab === 'ui' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                    border: 'none',
                    borderRadius: '12px 12px 0 0',
                    borderBottom: activeTab === 'ui' ? '2px solid #10b981' : '2px solid transparent',
                    color: activeTab === 'ui' ? '#34d399' : 'rgba(255,255,255,0.5)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    fontSize: '14px'
                  }}
                  onMouseEnter={(e) => { if (activeTab !== 'ui') e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { if (activeTab !== 'ui') e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                >
                  Compose UI
                </button>
              </div>

              {/* Code Display */}
              <div className="playground-code" style={{ padding: activeTab === 'ui' ? '2rem' : '1.5rem', maxHeight: activeTab === 'ui' ? '800px' : '500px', overflow: 'auto', background: activeTab === 'ui' ? '#f0f4f8' : 'rgba(0,0,0,0.3)', borderRadius: '0 0 24px 24px' }}>
                {activeTab === 'ui' ? (
                  <UIRenderer jsonData={sampleJSON} />
                ) : (
                  <pre style={{ margin: 0, color: '#e5e7eb', fontSize: '14px', lineHeight: '1.6', fontFamily: 'monospace' }}>
                    <code>
                      {activeTab === 'dsl' && sampleDSL}
                      {activeTab === 'json' && sampleJSON}
                    </code>
                  </pre>
                )}
              </div>
            </div>

            {/* Info Box */}
            <div className="playground-info" style={{ marginTop: '3rem', padding: '2.5rem', background: 'rgba(15, 23, 42, 0.95)', border: '2px solid rgba(34, 197, 94, 0.6)', borderRadius: '16px', boxShadow: '0 12px 40px rgba(34, 197, 94, 0.4), 0 0 60px rgba(34, 197, 94, 0.2)', backdropFilter: 'blur(20px)' }}>
              <h3 style={{ marginTop: 0, color: '#22c55e', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem', fontWeight: 600, textShadow: '0 0 20px rgba(34, 197, 94, 0.5)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 16v-4M12 8h.01"/>
                </svg>
                How it works
              </h3>
              <ul style={{ margin: '1.5rem 0 0', paddingLeft: '1.5rem', color: '#f1f5f9', fontSize: '1rem', lineHeight: '1.9' }}>
                <li style={{ marginBottom: '1rem' }}><strong style={{ color: '#22c55e' }}>Step 1:</strong> Write type-safe UI code using K-DSL (Kotlin DSL) with full IDE support and autocomplete</li>
                <li style={{ marginBottom: '1rem' }}><strong style={{ color: '#22c55e' }}>Step 2:</strong> Call <code style={{ background: 'rgba(34, 197, 94, 0.15)', padding: '4px 10px', borderRadius: '6px', color: '#86efac', fontWeight: 600, border: '1px solid rgba(34, 197, 94, 0.3)' }}>.toJson()</code> to serialize your UI tree into portable JSON</li>
                <li style={{ marginBottom: '1rem' }}><strong style={{ color: '#22c55e' }}>Step 3:</strong> Deploy JSON to your server and render it as native Jetpack Compose UI using <code style={{ background: 'rgba(34, 197, 94, 0.15)', padding: '4px 10px', borderRadius: '6px', color: '#86efac', fontWeight: 600, border: '1px solid rgba(34, 197, 94, 0.3)' }}>JSONStringToUI()</code></li>
              </ul>
              <p style={{ marginTop: '1.5rem', color: '#ffffff', fontSize: '1rem', background: 'rgba(34, 197, 94, 0.2)', padding: '1.25rem', borderRadius: '10px', borderLeft: '4px solid #22c55e', boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)' }}>
                💡 <strong style={{ color: '#22c55e' }}>The Magic:</strong> Update your UI by changing the JSON on your server - no app updates required!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
