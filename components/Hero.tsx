'use client';

import { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';

const TICKER_ITEMS = [
  'Sunset Port Festival',
  '22 & 23 August 2026',
  'Pomorie Port, Bulgaria',
  'Black Sea Coast',
  'Boutique Open-Air Festival',
];

function buildTickerHTML() {
  const sep = `<span class="sep">•</span>`;
  const inner = TICKER_ITEMS.join(sep);
  return `<span class="ti">${inner}${sep}</span>`.repeat(4);
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Build ticker
  useEffect(() => {
    if (tickerRef.current) tickerRef.current.innerHTML = buildTickerHTML();
  }, []);

  // Scroll-scrubbed video — smooth RAF loop drives currentTime
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const SCROLL_RANGE = window.innerHeight * 0.45;
    let targetTime = 0;
    let rafId: number;

    const onReady = () => {
      const duration = video.duration;
      if (!duration) return;

      // Track target time from scroll
      const unsub = scrollY.on('change', latest => {
        targetTime = Math.max(0, Math.min((latest / SCROLL_RANGE) * duration, duration));
      });

      // RAF loop — lerp currentTime toward target for silky smoothness
      const tick = () => {
        const diff = targetTime - video.currentTime;
        if (Math.abs(diff) > 0.001) {
          video.currentTime += diff * 0.38;
        }
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);

      return () => {
        unsub();
        cancelAnimationFrame(rafId);
      };
    };

    let cleanup: (() => void) | undefined;
    if (video.readyState >= 1) {
      cleanup = onReady();
    } else {
      const handler = () => { cleanup = onReady(); };
      video.addEventListener('loadedmetadata', handler, { once: true });
      return () => video.removeEventListener('loadedmetadata', handler);
    }

    return () => cleanup?.();
  }, [scrollY]);

  return (
    <section id="hero">
      {/* Video fixed in place — no parallax movement */}
      <video
        ref={videoRef}
        src="/assets/hero-scrub-sm.mp4"
        poster="/assets/hero-poster.jpg"
        muted
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.68,
          pointerEvents: 'none',
        }}
      />

      <div className="h-vignette" />
      <div className="h-glow" />

      <div className="h-main">
        <span className="h-tagline">Live the Moment</span>
        <div className="h-dates">
          <span className="hd-num">22.08</span>
          <div className="hd-div" />
          <span className="hd-num">23.08</span>
        </div>
        <div className="h-loc">Pomorie Port &nbsp;·&nbsp; Bulgaria</div>
        <div className="h-ctas">
          <a href="#lineup" className="btn-fill">View Lineup</a>
          <a href="https://sunsetfestival.bg" className="btn-outline" target="_blank" rel="noopener">Get Tickets</a>
        </div>
      </div>

      <div className="h-cue">
        <div className="cue-d" />
        <div className="cue-l" />
      </div>

      <div className="h-ticker">
        <div className="h-ticker-track" ref={tickerRef} />
      </div>
    </section>
  );
}
