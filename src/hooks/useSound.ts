import { useRef, useCallback } from 'react';

interface SoundEngine {
  playTyping: () => void;
  playHover: () => void;
  playClick: () => void;
  playBeep: () => void;
  playBoot: () => void;
}

// AudioContext singleton — only created after user interaction
let globalAudioContext: AudioContext | null = null;
let userInteracted = false;

function getAudioContext(): AudioContext | null {
  if (!globalAudioContext) {
    try {
      globalAudioContext = new AudioContext();
    } catch {
      return null;
    }
  }
  // Resume if suspended (browser policy requires user gesture)
  if (globalAudioContext.state === 'suspended') {
    globalAudioContext.resume();
  }
  return userInteracted ? globalAudioContext : null;
}

// Listen for first user interaction
if (typeof window !== 'undefined') {
  const markInteracted = () => {
    userInteracted = true;
    if (globalAudioContext?.state === 'suspended') {
      globalAudioContext.resume();
    }
    window.removeEventListener('click', markInteracted);
    window.removeEventListener('keydown', markInteracted);
  };
  window.addEventListener('click', markInteracted, { once: true });
  window.addEventListener('keydown', markInteracted, { once: true });
}

export function useSound(): SoundEngine {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = getAudioContext();
    }
    return ctxRef.current;
  }, []);

  const playTone = useCallback((frequency: number, type: OscillatorType, duration: number, volume: number) => {
    const ctx = getCtx();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch {}
  }, [getCtx]);

  const playTyping = useCallback(() => {
    playTone(800 + Math.random() * 200, 'square', 0.05, 0.02);
  }, [playTone]);

  const playHover = useCallback(() => {
    playTone(1200, 'sine', 0.08, 0.015);
  }, [playTone]);

  const playClick = useCallback(() => {
    playTone(600, 'square', 0.1, 0.03);
  }, [playTone]);

  const playBeep = useCallback(() => {
    playTone(880, 'sine', 0.15, 0.03);
  }, [playTone]);

  const playBoot = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    const freqs = [200, 400, 600, 800, 1200];
    freqs.forEach((f, i) => {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.1);
        gain.gain.setValueAtTime(0.02, ctx.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.1);
        osc.stop(ctx.currentTime + i * 0.1 + 0.2);
      } catch {}
    });
  }, [getCtx]);

  return { playTyping, playHover, playClick, playBeep, playBoot };
}
