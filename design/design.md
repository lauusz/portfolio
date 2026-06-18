# Nikolaus Satria Portfolio — Redesign Design Document

## Overview

Complete visual redesign of the existing Vite + React + TypeScript + Tailwind CSS portfolio. The new design emphasizes **modern dark aesthetics**, **glassmorphism depth layers**, **smooth scroll-triggered animations**, and **mobile-first responsiveness**.

## Design Philosophy

- **Depth & Layers**: Use semi-transparent glassmorphism cards over a subtle animated gradient background to create visual depth.
- **Motion & Feedback**: Every interactive element has a hover state. Sections animate into view as the user scrolls.
- **Mobile-First**: The layout is designed for mobile first, then gracefully expands to tablet and desktop.
- **Professional Elegance**: Clean typography, ample whitespace, and a cohesive color palette that feels premium.

---

## Global Visual System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#0a0a0f` | Page background — deeper, richer dark |
| Surface | `#12121a` | Card backgrounds |
| Surface Elevated | `#1a1a25` | Elevated cards / hover states |
| Primary Text | `#f8f9fa` | Headlines, primary text |
| Secondary Text | `#a0a0b0` | Body text, descriptions |
| Muted Text | `#6b6b7b` | Captions, meta text |
| Accent | `#ff6b35` | Primary accent — CTAs, highlights, hover states |
| Accent Glow | `rgba(255, 107, 53, 0.15)` | Glow effects, shadows |
| CTA | `#00d4aa` | Success states, secondary accent |
| Border | `rgba(255, 255, 255, 0.08)` | Subtle borders |
| Border Hover | `rgba(255, 107, 53, 0.3)` | Hover border color |

### Typography

- **Font Family**: Inter (already loaded via Google Fonts)
- **Mono**: Fira Code for terminal/tech accents

| Element | Mobile | Tablet (sm) | Desktop (md) | Weight |
|---------|--------|-------------|--------------|--------|
| H1 Hero | 2.5rem (40px) | 3.5rem (56px) | 4.5rem (72px) | 700 |
| H2 Section | 2rem (32px) | 2.5rem (40px) | 3rem (48px) | 700 |
| H3 Card | 1.25rem (20px) | 1.5rem (24px) | — | 600 |
| Body | 1rem (16px) | 1.125rem (18px) | — | 400 |
| Small | 0.875rem (14px) | — | — | 400 |
| Caption | 0.75rem (12px) | — | — | 500 |

- Line height: 1.6 for body, 1.2 for headings
- Letter spacing: -0.02em for headings, normal for body

### Spacing System

- Section padding: `py-16` mobile → `py-20` sm → `py-24` md → `py-32` lg
- Container max-width: `max-w-7xl` (1280px)
- Container horizontal padding: `px-4` mobile → `px-6` sm → `px-8` lg
- Gap scale: 4px base, using Tailwind's default spacing

### Shadows & Effects

- **Glassmorphism Card**: `bg-surface/80 backdrop-blur-xl border border-white/[0.08]`
- **Card Hover**: `hover:border-accent/30 hover:shadow-[0_0_30px_rgba(255,107,53,0.1)]`
- **Accent Glow**: `shadow-[0_0_20px_rgba(255,107,53,0.2)]`
- **Gradient Background**: Subtle radial gradient orbs using accent/cta colors at very low opacity (5%), animated to drift slowly

### Animation Language

- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` for standard, `cubic-bezier(0.16, 1, 0.3, 1)` for dramatic entrances
- **Durations**: 150ms micro, 300ms standard, 500ms dramatic, 800ms page transitions
- **Scroll-triggered**: Elements fade in + translate up by 30px when entering viewport
- **Stagger**: Children animate in with 100ms delay between siblings

---

## Responsive Breakpoints

| Breakpoint | Width | Tailwind Prefix | Target |
|------------|-------|-----------------|--------|
| Mobile | < 640px | (default) | Phones |
| Tablet | 640px+ | `sm:` | Small tablets |
| Desktop | 768px+ | `md:` | Tablets / small laptops |
| Large Desktop | 1024px+ | `lg:` | Laptops |
| Extra Large | 1280px+ | `xl:` | Large screens |

---

## Section Designs

### Header

- **Position**: Fixed top, `z-50`, full width
- **Background**: `bg-background/80 backdrop-blur-xl` when scrolled, transparent when at top
- **Height**: `h-16` mobile, `h-20` md
- **Logo**: BrainCircuit icon + "Nikolaus Satria" text, accent color
- **Desktop Nav**: Horizontal links with subtle underline hover animation (2px accent bar slides in from left)
- **Mobile Nav**: Hamburger icon → full-screen overlay menu with staggered link animation
- **Active link**: Accent color with underline indicator

### Hero

- **Height**: `min-h-[100dvh]` (dynamic viewport height for mobile)
- **Background**: Animated gradient orbs (2-3 large blurred circles in accent/cta at 5% opacity, drifting)
- **Layout**: 
  - Mobile: Single column, text centered, decorative element below or hidden
  - Tablet+: Two columns, text left, visual right
- **Content**:
  - Eyebrow: "Hello, I'm" — small muted text, uppercase, tracking-wider
  - Name: "Nikolaus Satria" — giant headline, accent color on name
  - Typing animation: Terminal icon + animated text "Full-Stack Developer | AI Engineer | Problem Solver"
  - Tagline: 1-2 sentences describing the role
  - CTA buttons: "View Projects" (primary) + "Contact Me" (outline)
- **Visual**: Abstract 3D-style code/terminal illustration or animated floating card with code snippets
- **Scroll indicator**: Bouncing chevron at bottom center

### About

- **Layout**: Two columns on md+
  - Left: Text content (bio, experience summary)
  - Right: Profile image with decorative border/frame
- **Profile Image**: 
  - Mobile: `w-64 h-64` centered
  - Tablet: `w-80 h-80`
  - Desktop: `w-96 h-96`
  - Frame: Rounded rectangle with rotating gradient border (CSS animation) or accent-colored border
- **Bio text**: Two paragraphs, readable line-height
- **CTAs**: "Get In Touch" + "Download CV"
- **Stats row**: 3-4 stat cards (Years Experience, Projects Completed, Technologies, etc.) below the bio

### Skills

- **Layout**: 
  - Main skills: Grid of cards
    - Mobile: 1 column
    - Tablet: 2 columns
    - Desktop: 3-4 columns
  - Tech tags: Wrap flex below
- **Skill Cards**:
  - Icon (large, accent colored) + skill name + short description
  - Glassmorphism card style
  - Hover: subtle lift + border glow
- **Tech Tags**: Pill-shaped badges, smaller, in a flex wrap
- **Categories**: Group skills by category (Frontend, Backend, Data/ML, DevOps) with section headers

### Projects

- **Filter Bar**: Horizontal scrollable on mobile, centered on desktop
  - Pill buttons with active state (filled accent)
- **Project Grid**:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 2-3 columns (depending on card width)
- **Project Cards**:
  - Image: 16:9 aspect ratio, `object-cover`, rounded top corners
  - Overlay: Gradient from bottom for text readability
  - Title + description + tech tags
  - Links: Live Demo + GitHub icons
  - Hover: Image zoom + card lift + overlay reveal
- **Card Design**: Glassmorphism with subtle border, accent glow on hover

### Contact

- **Layout**: Two columns on md+
  - Left: Contact info cards (email, location, phone) + social links
  - Right: Contact form
- **Contact Info Cards**: Icon + label + value, stacked vertically
- **Social Links**: Icon buttons in a row
- **Form**:
  - Name + Email (side by side on md+)
  - Subject (full width)
  - Message (textarea, full width)
  - Submit button (full width, accent)
  - Success/error states with toast-style messages
- **Form Inputs**: Dark background, subtle border, accent focus ring

### Footer

- **Layout**: Two rows
  - Top: Logo + tagline (left) + social links (right) on md+, stacked on mobile
  - Bottom: Copyright + links
- **Back to Top**: Floating accent button, bottom-right, appears after scrolling down
- **Style**: Subtle top border, muted text, minimal

---

## Interactions & Micro-interactions

1. **Nav Link Hover**: Underline slides in from left, 300ms
2. **Button Hover**: Scale 1.02, brightness increase, shadow
3. **Card Hover**: translateY(-4px), border color change, shadow glow
4. **Image Hover**: Scale 1.05 within container, 500ms
5. **Scroll Reveal**: IntersectionObserver triggers fade-up animation for all section children
6. **Typing Effect**: Smooth cursor blink in hero
7. **Filter Transition**: Projects fade out/in when filter changes (AnimatePresence)
8. **Mobile Menu**: Overlay slides in from right, links stagger in
9. **Form Submit**: Button shows loading spinner, then success toast
10. **Back to Top**: Appears after 500px scroll, smooth scroll to top

---

## Dependencies

- **framer-motion**: For scroll animations, page transitions, hover effects, AnimatePresence
- **lucide-react**: Already installed, continue using
- **react-icons**: Already installed, continue using for brand icons
- **emailjs-com**: Already installed, keep for contact form

---

## Asset Requirements

- No new images needed — reuse existing `/profile.jpeg` and project images
- Ensure all project images are properly sized (aspect ratio preserved)

---

## Implementation Notes

- Use `useInView` from framer-motion for scroll-triggered animations
- Create a reusable `AnimatedSection` wrapper component for consistent reveal animations
- Create a reusable `GlassCard` component for consistent card styling
- Use Tailwind's `container` and `mx-auto` for centering
- Ensure `touch-action` is appropriate for mobile gestures
- Test at 320px, 375px, 768px, 1024px, 1440px widths
- Add `scroll-padding-top: 80px` to account for fixed header when navigating to sections
- Use `will-change: transform` sparingly on animated elements for performance
