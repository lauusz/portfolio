import { useRef, useCallback } from 'react';

interface MagneticOptions {
  strength?: number;
  radius?: number;
}

export function useMagneticEffect(options: MagneticOptions = {}) {
  const { strength = 0.3, radius = 100 } = options;
  const elementRef = useRef<HTMLElement | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!elementRef.current) return;
    const el = elementRef.current;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < radius) {
      const factor = 1 - distance / radius;
      el.style.transform = `translate(${distanceX * strength * factor}px, ${distanceY * strength * factor}px)`;
    } else {
      el.style.transform = 'translate(0, 0)';
    }
  }, [strength, radius]);

  const handleMouseLeave = useCallback(() => {
    if (!elementRef.current) return;
    elementRef.current.style.transform = 'translate(0, 0)';
  }, []);

  const bind = useCallback((el: HTMLElement | null) => {
    elementRef.current = el;
  }, []);

  return { bind, handleMouseMove, handleMouseLeave, ref: elementRef };
}

// Simpler version that returns event handlers for inline use
export function getMagneticStyle(e: React.MouseEvent, el: HTMLElement, strength: number = 0.3): React.CSSProperties {
  const rect = el.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const distanceX = e.clientX - centerX;
  const distanceY = e.clientY - centerY;
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  const radius = Math.max(rect.width, rect.height) * 1.5;

  if (distance < radius) {
    const factor = 1 - distance / radius;
    return {
      transform: `translate(${distanceX * strength * factor}px, ${distanceY * strength * factor}px)`,
      transition: 'transform 0.15s ease-out',
    };
  }
  return { transform: 'translate(0, 0)', transition: 'transform 0.3s ease-out' };
}
