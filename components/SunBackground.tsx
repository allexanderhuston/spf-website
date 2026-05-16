'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function SunBackground() {
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(1);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      const progress = total > 0 ? scrollY / total : 0;
      const vh = window.innerHeight;

      // Fully hidden while hero is in viewport (scrollY < vh)
      // Fades in after hero clears, fades out near bottom
      let op = 0;
      if (scrollY >= vh) {
        const fadeIn = Math.min((scrollY - vh) / (vh * 0.15), 1);
        const fadeOut = progress > 0.85 ? 1 - (progress - 0.85) / 0.15 : 1;
        op = 0.35 * fadeIn * fadeOut;
      }

      setOpacity(op);
      setScale(1 + progress * 0.05);
    };

    window.addEventListener('scroll', update, { passive: true });
    update(); // run on mount
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <>
      {/* Ambient glow */}
      <motion.div
        style={{
          position: 'fixed', top: '50%', left: '50%',
          x: '-50%', y: '-50%',
          width: '70vw', height: '70vw',
          zIndex: 0, pointerEvents: 'none',
          opacity, scale,
          background: 'radial-gradient(ellipse at center, rgba(240,80,10,.25) 0%, rgba(200,40,5,.08) 35%, transparent 68%)',
          filter: 'blur(55px)',
          willChange: 'transform, opacity',
        }}
      />
      {/* Sun */}
      <motion.div
        style={{
          position: 'fixed', top: '50%', left: '50%',
          x: '-50%', y: '-50%',
          width: 'min(42vw, 42vh)', height: 'min(42vw, 42vh)',
          zIndex: 0, pointerEvents: 'none',
          opacity, scale,
          mixBlendMode: 'screen',
          willChange: 'transform, opacity',
        }}
      >
        <Image src="/assets/sun.png" alt="" fill style={{ objectFit: 'contain' }} priority />
      </motion.div>
    </>
  );
}
