# Nikolaus Satria Portfolio — Ultra-Interactive Rebuild Plan

## Vision
The portfolio becomes a **digital experience** — not a static page. Every interaction (scroll, hover, click, move) produces visual feedback. The design feels alive, premium, and memorable.

## Philosophy
- **Motion is meaning** — animations convey hierarchy and guide attention
- **The cursor is a tool** — custom cursor transforms the feel of the entire site
- **Scroll is the journey** — each scroll event creates a cinematic reveal
- **Depth everywhere** — parallax, 3D tilt, particles, and layered effects create spatial depth

---

## Global Interactive Effects

### 1. Canvas Particle Network (Background)
- Full-screen canvas behind all content, `z-index: 0`, `position: fixed`, `pointer-events: none`
- Particles: ~60 dots, small (`2px`), semi-transparent white, drifting slowly
- Lines connect nearby particles when distance < 120px, line opacity fades with distance
- **Mouse interaction**: particles within 150px of cursor are repelled (gentle push), creating a "wake"
- Colors: white lines at 8% opacity, particles at 15% opacity
- Performance: uses `requestAnimationFrame`, canvas is 2x sized then scaled down for crispness
- Hidden on mobile (touch devices) to preserve battery

### 2. Custom Dual-Cursor
- **Inner dot** (`8px`): Solid accent color, instant follow
- **Outer ring** (`40px`): Hollow ring, 1px border accent/50, follows with 0.15s delay (lerp)
- Both hidden on touch devices via `@media (hover: none)`
- **States**:
  - Default: small dot, large ring
  - Hover link/button: ring scales to 60px, dot hides, ring becomes solid accent/20
  - Hover text: ring becomes vertical bar (text cursor)
  - Click: ring briefly pulses
- Implementation: `fixed` position, updates on `mousemove` via `requestAnimationFrame`
- Z-index: 9999 (above everything)

### 3. Mouse Spotlight Overlay
- Radial gradient (`600px` radius) centered on cursor, `radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)`
- Fixed position, full screen, `pointer-events: none`, `z-index: 1` (above particles, below content)
- Follows cursor with subtle lerp (0.1 factor) for smoothness
- Adds a living warmth to the dark background
- Hidden on mobile

### 4. Scroll Progress Bar
- Thin line at top of viewport, `h-[2px]`, `bg-accent`, `z-[60]`
- Width = `scrollY / (documentHeight - windowHeight) * 100%`
- Updates on every scroll event (throttled to 16ms)
- Smoothly animates width via CSS transition

### 5. Scroll Velocity Tracking
- Custom hook that tracks scroll velocity (delta Y per frame)
- Velocity used to apply subtle skew to elements:
  - `transform: skewY(velocity * 0.05deg)` on card grids
  - Clamped to ±2deg max
  - Smoothly returns to 0 when scrolling stops
- Adds a "weight" feeling to the content

---

## Section Designs

### Header
- Transparent when at top, `backdrop-blur-xl` when scrolled
- Logo: Animated letter-by-letter reveal on load
- Nav links: **Magnetic hover** — links gently pull toward cursor within 50px radius
- Active section: underline indicator with `scaleX` animation
- Mobile: full-screen overlay with staggered link animations

### Hero Section
- **Full viewport** (`min-h-[100dvh]`), `relative z-10` (above particles)
- **Name**: "NIKOLAUS SATRIA" — massive, each character is a separate `span` that animates in with a staggered `y: 50 → 0, opacity: 0 → 1, rotateX: 90 → 0` 3D flip effect
- **Subtitle**: Typing animation with terminal icon, but smoother
- **Tagline**: "Full-Stack Developer & AI Engineer" — words fade in one by one
- **CTA Buttons**: Magnetic hover effect + ripple on click
- **Floating Elements**: 3 geometric shapes (cube, sphere, ring) floating in background with `animate-float` at different speeds and phases, `blur-sm`, very low opacity
- **Entrance**: Entire hero staggers in from bottom over 1.5s

### About Section
- **Layout**: Two columns, text left, image right
- **Section Title**: "ABOUT ME" — text splits into chars, each char flips in with 3D rotation on scroll
- **Bio**: Each line of text uses a **line-mask reveal** — text slides up from behind a mask
- **Profile Image**: `rounded-2xl`, border with animated gradient (rotating border), parallax offset (moves slower than scroll), on hover: slight 3D tilt + scale
- **Stats**: 3 large numbers that **count up** from 0 when scrolled into view (3s duration, ease-out)
- **Decorative**: Animated gradient border around the image using a rotating conic gradient

### Skills Section
- **Section Title**: Same char-split animation
- **Skill Grid**: Cards arranged in a staggered masonry-like layout
- **Each Card**: 
  - Icon with animated glow pulse on hover
  - Skill name
  - **Progress bar** that animates width from 0 to target when scrolled into view
  - On hover: card lifts + 3D tilt toward cursor + icon scales + border glows accent
- **Technology Cloud**: Tags float in a scattered layout (not a grid) with random slight rotation, drift on hover
- **Background**: Subtle constellation lines connecting skill cards (SVG overlay)

### Projects Section — Horizontal Scroll Gallery
- **Innovation**: The entire section uses **horizontal scroll** on vertical scroll input
- Container is pinned (`position: sticky`), content scrolls horizontally as user scrolls vertically
- **Section Header**: Pinned at top-left, "MY PROJECTS" with char animation
- **Project Cards**: Large, cinematic cards (`400px × 500px`) arranged horizontally
- Each card:
  - Full-bleed image with `object-cover`
  - **3D perspective tilt** on hover (rotateX/Y based on mouse position on card)
  - Title overlay at bottom with gradient mask
  - On hover: image zooms slightly, a glossy reflection/sheen sweeps across
  - Tech tags appear with stagger animation on hover
- **Scroll indicator**: "Scroll to explore →" with animated arrow
- **Navigation**: Dots/pills showing progress through projects
- **Transition**: When section ends, normal vertical scroll resumes

### Contact Section
- **Section Title**: Char-split animation
- **Two-column layout**: Info left, form right
- **Form**:
  - Each input has a **focus spotlight** — a radial glow around the active input
  - Labels float up when input is focused (floating label pattern)
  - Submit button: **Magnetic** + ripple on click + loading state with morphing animation
  - Success message: confetti burst (canvas) or elegant fade-in
- **Social Links**: Icons with **magnetic hover** + scale + color transition
- **Background**: Subtle grid pattern with intersection points that glow near cursor

### Footer
- Minimal
- Logo + copyright + social links
- **Back to top**: Circular button with arrow, magnetic hover, smooth scroll to top via Lenis
- Content fades in on scroll

---

## Interaction Language Summary

| Effect | Where | How |
|--------|-------|-----|
| Particle Network | Global background | Canvas, mouse-repulsion |
| Dual Cursor | Global | Fixed divs, lerp follow, state changes |
| Mouse Spotlight | Global | Fixed radial gradient, lerp follow |
| Scroll Progress | Top bar | CSS width based on scroll % |
| Scroll Velocity Skew | Card grids | Framer Motion `skewY` based on velocity |
| Magnetic Hover | Buttons, nav, icons | Pull element toward cursor within radius |
| 3D Tilt | Cards, images | `rotateX/Y` based on mouse position within element |
| Text Split | All headings | Split into chars/spans, stagger animation |
| Line Mask | Body text | Text slides up from behind overflow-hidden mask |
| Counter | Stats | Count from 0 to target over 3s |
| Horizontal Scroll | Projects section | GSAP ScrollTrigger pin + horizontal translate |
| Floating Labels | Form inputs | Label moves up on focus |
| Ripple | Button clicks | Expanding circle from click point |
| Parallax | Images | Element moves at 0.5x scroll speed |
| Animated Gradient Border | Profile image | Rotating conic gradient behind element |

---

## Dependencies

- `framer-motion` — React animations, AnimatePresence, useInView
- `lenis` — Smooth scroll (already installed)
- `gsap` — Core animation engine
- `@gsap/react` — GSAP React hooks (useGSAP)
- `gsap/ScrollTrigger` — Scroll-triggered animations, horizontal scroll pinning

---

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS 3.4
- GSAP (GreenSock) + ScrollTrigger for advanced scroll animations
- Framer Motion for React component animations
- Lenis for smooth scroll
- Custom Canvas API for particle network
- Custom hooks for mouse tracking, scroll velocity, magnetic effects

---

## Responsive Behavior

- **Mobile (< 640px)**: 
  - Particle background disabled (canvas hidden)
  - Custom cursor disabled
  - Mouse spotlight disabled
  - Horizontal scroll projects → vertical stack
  - Magnetic effects disabled
  - 3D tilt effects disabled (simpler scale hover)
  - All text animations still active (reduced intensity)
  
- **Tablet (640-1024px)**:
  - Particle background at 50% opacity
  - 3D tilt enabled
  - Horizontal scroll projects → 2-column grid with scroll reveal
  - Magnetic effects on buttons only

- **Desktop (1024px+)**:
  - All effects enabled at full intensity
  - Horizontal scroll projects active
  - Full particle network
  - Custom cursor active

- **Respects `prefers-reduced-motion`**: All animations disabled, instant transitions only
