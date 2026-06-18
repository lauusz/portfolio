import { useEffect, useRef } from 'react';

let globalSmoothScrollTo: ((y: number) => void) | null = null;

export function scrollToSmoothly(y: number) {
  if (globalSmoothScrollTo) {
    globalSmoothScrollTo(y);
  } else {
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

/**
 * Lightweight smooth scroll using requestAnimationFrame.
 * Provides a buttery feel without heavy dependencies like Lenis.
 */
export function useSmoothScroll() {
  const scrollRef = useRef({
    targetY: 0,
    currentY: 0,
    isScrolling: false,
    ease: 0.075, // 0.075 = smooth but not sluggish
  });

  useEffect(() => {
    const scrollState = scrollRef.current;
    const html = document.documentElement;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Check for touch devices — don't hijack scroll on mobile
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return; // Use native scroll on mobile

    let rafId: number;

    const setScroll = (y: number) => {
      window.scrollTo(0, y);
    };

    const smoothScroll = () => {
      const { targetY, currentY, ease } = scrollState;
      const diff = targetY - currentY;

      // Ease-out: use a slightly more aggressive ease when close to target
      const adjustedEase = Math.abs(diff) < 10 ? 0.15 : ease;

      if (Math.abs(diff) < 0.5) {
        scrollState.currentY = targetY;
        setScroll(Math.round(targetY));
        scrollState.isScrolling = false;
        return;
      }

      scrollState.currentY += diff * adjustedEase;
      setScroll(scrollState.currentY);
      rafId = requestAnimationFrame(smoothScroll);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const maxScroll = html.scrollHeight - window.innerHeight;
      scrollState.targetY = Math.max(0, Math.min(scrollState.targetY + e.deltaY * 1.2, maxScroll));

      if (!scrollState.isScrolling) {
        scrollState.isScrolling = true;
        scrollState.currentY = window.scrollY;
        rafId = requestAnimationFrame(smoothScroll);
      }
    };

    // Handle anchor clicks for smooth navigation
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const section = document.querySelector(href);
      if (!section) return;

      e.preventDefault();
      const targetY = (section as HTMLElement).offsetTop;
      scrollState.targetY = targetY;
      scrollState.currentY = window.scrollY;

      if (!scrollState.isScrolling) {
        scrollState.isScrolling = true;
        rafId = requestAnimationFrame(smoothScroll);
      }
    };

    // Keyboard support
    const onKeyDown = (e: KeyboardEvent) => {
      const pageHeight = window.innerHeight;
      const maxScroll = html.scrollHeight - window.innerHeight;
      let delta = 0;

      switch (e.key) {
        case 'PageDown':
        case ' ':
          if (!e.shiftKey) {
            delta = pageHeight * 0.85;
          }
          break;
        case 'PageUp':
          if (!e.shiftKey) {
            delta = -pageHeight * 0.85;
          }
          break;
        case 'Home':
          scrollState.targetY = 0;
          scrollState.currentY = window.scrollY;
          if (!scrollState.isScrolling) {
            scrollState.isScrolling = true;
            rafId = requestAnimationFrame(smoothScroll);
          }
          e.preventDefault();
          return;
        case 'End':
          scrollState.targetY = maxScroll;
          scrollState.currentY = window.scrollY;
          if (!scrollState.isScrolling) {
            scrollState.isScrolling = true;
            rafId = requestAnimationFrame(smoothScroll);
          }
          e.preventDefault();
          return;
        case 'ArrowDown':
          delta = 60;
          break;
        case 'ArrowUp':
          delta = -60;
          break;
      }

      if (delta !== 0) {
        e.preventDefault();
        scrollState.targetY = Math.max(0, Math.min(scrollState.targetY + delta, maxScroll));
        if (!scrollState.isScrolling) {
          scrollState.isScrolling = true;
          scrollState.currentY = window.scrollY;
          rafId = requestAnimationFrame(smoothScroll);
        }
      }
    };

    // Expose the smooth scroll function globally
    globalSmoothScrollTo = (y: number) => {
      scrollState.targetY = y;
      scrollState.currentY = window.scrollY;
      if (!scrollState.isScrolling) {
        scrollState.isScrolling = true;
        rafId = requestAnimationFrame(smoothScroll);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    document.addEventListener('click', onClick);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', onWheel);
      document.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onKeyDown);
      cancelAnimationFrame(rafId);
      globalSmoothScrollTo = null;
    };
  }, []);
}
