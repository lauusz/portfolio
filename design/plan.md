# Portfolio Redesign — Implementation Plan

## Goal

Redesign the entire Nikolaus Satria portfolio website to be fully responsive, visually modern, and dynamically adaptive across mobile, tablet, and desktop devices.

## Current State

- **Stack**: Vite + React 18 + TypeScript + Tailwind CSS 3.4
- **Components**: Header, Hero, About, Skills, Projects, Contact, Footer
- **Issues**: Hardcoded image sizes, limited mobile optimization, basic animations, inconsistent responsive behavior

## Target State

- Modern dark theme with glassmorphism effects
- Full mobile-first responsive design
- Smooth scroll-triggered animations (Framer Motion)
- Improved visual hierarchy and micro-interactions
- Professional, premium feel

---

## Stage 1: Foundation & Dependencies

**Owner**: Main Agent

1. Install Framer Motion: `npm install framer-motion`
2. Update `tailwind.config.js` with new color palette, fonts, animations
3. Update `index.css` with new design tokens, utilities, and global styles
4. Create shared components:
   - `AnimatedSection.tsx` — scroll-triggered fade-up wrapper
   - `GlassCard.tsx` — reusable glassmorphism card
5. Verify build passes

---

## Stage 2: Component Redesign (Parallel)

### Worker A: Header + Hero
**Files**: `src/components/Header.tsx`, `src/components/Hero.tsx`
- Redesign Header with improved mobile nav (full-screen overlay)
- Redesign Hero with animated gradient background, better responsive layout, improved typing effect

### Worker B: About + Skills
**Files**: `src/components/About.tsx`, `src/components/Skills.tsx`
- Redesign About with responsive image sizing, stat cards, improved layout
- Redesign Skills with category grouping, animated cards, better grid

### Worker C: Projects + Contact + Footer
**Files**: `src/components/Projects.tsx`, `src/components/Contact.tsx`, `src/components/Footer.tsx`
- Redesign Projects with improved card design, filter animations, responsive grid
- Redesign Contact with better form layout, improved info cards
- Redesign Footer with cleaner layout

---

## Stage 3: Integration & Verification

**Owner**: Main Agent

1. Merge all component changes
2. Verify all imports are correct
3. Run build: `npm run build`
4. Fix any TypeScript errors
5. Verify responsive behavior at key breakpoints
6. Test all interactive elements (nav, form, filters, animations)

---

## Shared Contract

### Design System
- Background: `#0a0a0f`
- Surface: `#12121a`
- Surface Elevated: `#1a1a25`
- Primary Text: `#f8f9fa`
- Secondary Text: `#a0a0b0`
- Muted: `#6b6b7b`
- Accent: `#ff6b35`
- CTA: `#00d4aa`
- Border: `rgba(255,255,255,0.08)`
- Border Hover: `rgba(255,107,53,0.3)`

### Typography Scale
- H1: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl`
- H2: `text-2xl sm:text-3xl md:text-4xl`
- H3: `text-xl sm:text-2xl`
- Body: `text-base sm:text-lg`
- Small: `text-sm`
- Caption: `text-xs`

### Container
- `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Section padding: `py-16 sm:py-20 md:py-24 lg:py-32`

### Glass Card Style
```
bg-[#12121a]/80 backdrop-blur-xl border border-white/[0.08] rounded-xl
hover:border-[#ff6b35]/30 hover:shadow-[0_0_30px_rgba(255,107,53,0.1)]
transition-all duration-300
```

### Animation Standard
```
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-100px" }}
transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
```

### File Structure
```
src/
  components/
    Header.tsx
    Hero.tsx
    About.tsx
    Skills.tsx
    Projects.tsx
    Contact.tsx
    Footer.tsx
    AnimatedSection.tsx
    GlassCard.tsx
  constants/
    data.ts
    iconMap.ts
  types/
    index.ts
  App.tsx
  index.css
  main.tsx
```

### Do Not Change
- `src/types/index.ts` — keep existing type definitions
- `src/constants/data.ts` — keep existing data, can add to it
- `src/constants/iconMap.ts` — keep existing icon mappings
- `index.html` — keep as-is (except potentially updating meta)
- `package.json` structure — only add framer-motion to dependencies
- Public assets (`/images/`, `/profile.jpeg`, PDFs) — do not modify

### Build Command
```bash
npm run build
```

---

## Quality Checklist

- [ ] No horizontal scroll on any device width
- [ ] All text readable at minimum 16px on mobile
- [ ] Touch targets at least 44px
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Form validation works
- [ ] All links work (internal anchors, external links)
- [ ] EmailJS contact form still functional
- [ ] Project filtering works with animation
- [ ] Mobile menu opens/closes smoothly
- [ ] Back to top button appears and works
- [ ] Typing animation in hero works correctly
- [ ] Dark theme consistent throughout
- [ ] No console errors
- [ ] Build passes without errors
