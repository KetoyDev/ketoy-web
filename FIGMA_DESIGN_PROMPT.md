# Ketoy Website Design - Figma Prompt

Design a modern developer-focused website for **Ketoy** - a server-driven UI engine for Android (JSON to Jetpack Compose).

## Brand
**Colors**: White background (#FFF) with gradients (white→light blue→purple). Accent: Blue (#3B82F6→#06B6D4), Green (#10B981). Text: Dark slate (#0F172A), muted (#64748B). Code blocks: #0F172A.
**Typography**: Inter (headings 2.7rem/600-700, body 1rem/400-500), JetBrains Mono (code 0.78rem).
**Style**: Clean, minimal, bright mode. Glassmorphism, animations, floating elements.

## Layout

**Header** (sticky): Logo left, nav center (Home/Features/Use Cases/Docs/Roadmap), CTAs right (GitHub/Get Started). White 95% opacity, backdrop blur, subtle shadow.

**Hero**: 2-column. Left (60%): Badges (Kotlin 1.9+, Compose 1.5+, Server-Driven UI), headline "Build once. **Update forever.**" (gradient text), subtitle, CTAs, meta badges. Right (40%): Interactive code card (28px rounded, glassmorphism) with tabs (K-DSL/JSON/Rendered UI), scrollable 350px height, dark code bg, custom scrollbar. Background: Dither waves + 40 floating coding icons (⚛️🟨🐍🐳💻 35-60px, 10-18% opacity, slow fall).

**How It Works**: Flow diagram (Server→Ketoy→Compose), 3 pill cards (Design/Ship/Render). Light gradient bg.

**Features** (3-col grid): Bento cards with particle effects, hover tilt, border glow. Features: Zero-release changes, A/B testing, K-DSL, Cross-platform, Extensible, Type-safe.

**Use Cases** (2-col): E-commerce, Social apps, Growth, Enterprise. Interactive cards.

**Roadmap**: Status badges (NOW green, NEXT blue, FUTURE gray).

**CTA**: Gradient card (blue→purple), white text, 2 buttons.

**Footer**: Logo left, 3 link columns (Product/Resources/Community), copyright bottom. Light gray bg.

## Components
**Cards**: White 95% opacity, 16-28px radius, light border, soft shadow (0 4px 12px rgba(0,0,0,0.05)).
**Buttons**: Primary (gradient, pill shape, shadow), Ghost (light gray).
**Code Blocks**: Dark bg, syntax highlight, 16px radius, scrollable.
**Badges**: Pills (999px radius), 0.7rem text.

## Interactions
- Floating logos: Top→bottom 18-33s, rotation, scale, parallax
- Cards: Hover tilt (3D), magnetic cursor, particles, glow pulse
- Smooth 160-300ms transitions
- Sticky header with blur

## Responsive
Desktop: 1120px max. Tablet: 2-col→1-2 col. Mobile: Single column, 44px min buttons.

**Voice**: Professional but approachable. Developer-first. Action-oriented ("Ship faster", "Zero releases").

**Inspiration**: Vercel, Linear, Tailwind CSS, Supabase - clean, modern, developer tools.
