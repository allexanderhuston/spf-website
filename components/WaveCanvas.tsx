'use client';

import { useEffect, useRef } from 'react';

export default function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let t = 0;
    let W = 0;
    let H = 0;
    let rafId: number;

    function resize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      const numLines = 22;
      const startY = H * 0.42;
      const spread = H * 0.52;

      for (let i = 0; i < numLines; i++) {
        const progress = i / numLines;
        const y = startY + progress * spread;
        const amp1 = H * 0.028 * (1 - progress * 0.5);
        const amp2 = H * 0.014 * (1 - progress * 0.4);
        const freq1 = 0.0045 + progress * 0.002;
        const freq2 = 0.0082 + progress * 0.003;
        const phase1 = t + i * 0.38;
        const phase2 = t * 1.3 + i * 0.25;
        const rTop = 140, gTop = 150, bTop = 240;
        const rBot = 247, gBot = 162, bBot = 32;
        const mix = Math.pow(progress, 1.5);
        const r = Math.round(rTop + (rBot - rTop) * mix);
        const g2 = Math.round(gTop + (gBot - gTop) * mix);
        const b = Math.round(bTop + (bBot - bTop) * mix);
        const alpha = 0.018 + progress * 0.038;

        ctx!.strokeStyle = `rgba(${r},${g2},${b},${alpha})`;
        ctx!.lineWidth = 1;
        ctx!.beginPath();

        for (let x = 0; x <= W; x += 3) {
          const waveY = y + amp1 * Math.sin(x * freq1 + phase1) + amp2 * Math.sin(x * freq2 + phase2);
          if (x === 0) ctx!.moveTo(x, waveY); else ctx!.lineTo(x, waveY);
        }
        ctx!.stroke();
      }

      t += 0.004;
      rafId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas id="waveCanvas" ref={canvasRef} />;
}
