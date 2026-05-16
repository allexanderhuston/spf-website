'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function SunBackground() {
  const glowRef = useRef<HTMLDivElement>(null);
  const sunRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const sun  = sunRef.current;
    if (!glow || !sun) return;

    const isMobile = window.innerWidth < 768;
    const size = isMobile ? 'min(82vw,82vh)' : 'min(42vw,42vh)';
    const glowSize = isMobile ? '110vw' : '70vw';
    sun.style.width  = sun.style.height  = size;
    glow.style.width = glow.style.height = glowSize;

    let rafId = 0;
    let lastOp = -1;

    const update = () => {
      const scrollY  = window.scrollY;
      const total    = document.body.scrollHeight - window.innerHeight;
      const progress = total > 0 ? scrollY / total : 0;
      const vh       = window.innerHeight;

      // 0 while hero in view, fade in after, fade out at bottom
      let op = 0;
      if (scrollY >= vh) {
        const fadeIn  = Math.min((scrollY - vh) / (vh * 0.15), 1);
        const fadeOut = progress > 0.85 ? 1 - (progress - 0.85) / 0.15 : 1;
        op = 0.35 * fadeIn * fadeOut;
      }

      // Only update DOM when value actually changes
      if (Math.abs(op - lastOp) > 0.001) {
        lastOp = op;
        glow.style.opacity = sun.style.opacity = String(op);
        const sc = 1 + progress * 0.05;
        const t = `translate(-50%,-50%) scale(${sc})`;
        glow.style.transform = sun.style.transform = t;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update(); // set initial state

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const base: React.CSSProperties = {
    position: 'fixed', top: '50%', left: '50%',
    transform: 'translate(-50%,-50%)',
    opacity: 0, pointerEvents: 'none', zIndex: 0,
    willChange: 'transform, opacity',
  };

  return (
    <>
      <div ref={glowRef} style={{
        ...base,
        width: '70vw', height: '70vw',
        background: 'radial-gradient(ellipse at center, rgba(240,80,10,.25) 0%, rgba(200,40,5,.08) 35%, transparent 68%)',
        filter: 'blur(55px)',
      }} />
      <div ref={sunRef} style={{
        ...base,
        width: 'min(42vw,42vh)', height: 'min(42vw,42vh)',
        mixBlendMode: 'screen',
      }}>
        <Image src="/assets/sun.png" alt="" fill style={{ objectFit: 'contain' }} priority />
      </div>
    </>
  );
}
