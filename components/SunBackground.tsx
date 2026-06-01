'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function SunBackground() {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  const sunSize   = isMobile ? 'min(82vw, 82vh)' : 'min(42vw, 42vh)';
  const glowSize  = isMobile ? '110vw'            : '70vw';

  // Constant — hero + ticker bar physically cover the sun, revealed as they scroll away.
  // Only fades out near the very bottom.
  const opacity = useTransform(scrollYProgress, [0.85, 1], [0.35, 0]);
  const scale   = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 0.9]);

  return (
    <>
      <motion.div
        style={{
          position: 'fixed', top: '50%', left: '50%',
          x: '-50%', y: '-50%',
          width: glowSize, height: glowSize,
          zIndex: 0, pointerEvents: 'none',
          opacity, scale,
          background: 'radial-gradient(ellipse at center, rgba(240,80,10,.25) 0%, rgba(200,40,5,.08) 35%, transparent 68%)',
          filter: 'blur(55px)',
          willChange: 'transform, opacity',
        }}
      />
      <motion.div
        style={{
          position: 'fixed', top: '50%', left: '50%',
          x: '-50%', y: '-50%',
          width: sunSize, height: sunSize,
          zIndex: 0, pointerEvents: 'none',
          opacity, scale,
          mixBlendMode: 'screen',
          willChange: 'transform, opacity',
        }}
      >
        <Image src="/assets/sun.png" alt="" fill sizes="100vw" style={{ objectFit: 'contain' }} priority />
      </motion.div>
    </>
  );
}
