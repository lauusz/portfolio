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
 * Intercepts wheel events and lerps the scroll position for a buttery feel.
 */
export function useSmoothScroll() {
  const scrollRef = useRef({
    targetY: 0,
    currentY: 0,
    isScrolling: false,
    ease: 0.085,
  });

  useEffect(() => {
    const scrollState = scrollRef.current;
    const html = document.documentElement;

    // Respect reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Only disable on actual touch-primary devices (phones/tablets), not laptops with touch screens
    const isTouchPrimary = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchPrimary) return;

    let rafId: number;

    const smoothScroll = () => {
      const { targetY, currentY, ease } = scrollState;
      const diff = targetY - currentY;

      // Snap when close enough
      if (Math.abs(diff) < 0.5) {
        scrollState.currentY = targetY;
        window.scrollTo(0, Math.round(targetY));
        scrollState.isScrolling = false;
        return;
      }

      // Ease-out: faster when far, slower when close
      const appliedEase = Math.abs(diff) < 20 ? 0.12 : ease;
      scrollState.currentY += diff * appliedEase;
      window.scrollTo(0, scrollState.currentY);
      rafId = requestAnimationFrame(smoothScroll);
    };

    const startSmoothScroll = () => {
      if (!scrollState.isScrolling) {
        scrollState.isScrolling = true;
        scrollState.currentY = window.scrollY;
        rafId = requestAnimationFrame(smoothScroll);
      }
    };

    // Wheel event — intercept native scroll and apply smooth lerp
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const maxScroll = html.scrollHeight - window.innerHeight;
      // Multiply deltaY for more responsive feel (wheel events are usually small increments)
      const delta = e.deltaY * 1.5;
      scrollState.targetY = Math.max(0, Math.min(scrollState.targetY + delta, maxScroll));

      startSmoothScroll();
    };

    // Anchor clicks
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const section = document.querySelector(href);
      if (!section) return;

      e.preventDefault();
      scrollState.targetY = (section as HTMLElement).offsetTop;
      scrollState.currentY = window.scrollY;
      startSmoothScroll();
    };

    // Keyboard scrolling
    const onKeyDown = (e: KeyboardEvent) => {
      const pageHeight = window.innerHeight;
      const maxScroll = html.scrollHeight - window.innerHeight;
      let delta = 0;
      let prevent = false;

      switch (e.key) {
        case 'PageDown':
        case ' ':
          if (!e.shiftKey) {
            delta = pageHeight * 0.85;
            prevent = true;
          }
          break;
        case 'PageUp':
          if (!e.shiftKey) {
            delta = -pageHeight * 0.85;
            prevent = true;
          }
          break;
        case 'Home':
          scrollState.targetY = 0;
          scrollState.currentY = window.scrollY;
          startSmoothScroll();
          prevent = true;
          break;
        case 'End':
          scrollState.targetY = maxScroll;
          scrollState.currentY = window.scrollY;
          startSmoothScroll();
          prevent = true;
          break;
        case 'ArrowDown':
          delta = 80;
          prevent = true;
          break;
        case 'ArrowUp':
          delta = -80;
          prevent = true;
          break;
      }

      if (prevent) {
        e.preventDefault();
      }
      if (delta !== 0) {
        scrollState.targetY = Math.max(0, Math.min(scrollState.targetY + delta, maxScroll));
        startSmoothScroll();
      }
    };

    // Expose smooth scroll for external use (e.g. Footer back-to-top)
    globalSmoothScrollTo = (y: number) => {
      scrollState.targetY = y;
      scrollState.currentY = window.scrollY;
      startSmoothScroll();
    };

    // Use document instead of window for wheel events — more reliable
    document.addEventListener('wheel', onWheel, { passive: false, capture: true });
    document.addEventListener('click', onClick);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('wheel', onWheel, { capture: true });
      document.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onKeyDown);
      cancelAnimationFrame(rafId);
      globalSmoothScrollTo = null;
    };
  }, []);
}
