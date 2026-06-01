'use client';

import { useEffect, useRef } from 'react';
import { useLang } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const { lang } = useLang();
  const h = t[lang].hero;

  useEffect(() => {
    if (!tickerRef.current) return;
    const sep = `<span class="sep">•</span>`;
    tickerRef.current.innerHTML =
      `<span class="ti">${h.ticker.join(sep)}${sep}</span>`.repeat(4);
  }, [lang]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const SCROLL_RANGE = window.innerHeight * 0.45;
    let target = 0;
    let rafId: number;
    let ready = false;

    // RAF lerp — runs on both mobile and desktop
    const tick = () => {
      if (ready) {
        const diff = target - video.currentTime;
        if (Math.abs(diff) > 0.001) video.currentTime += diff * 0.38;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // Update target on scroll
    const onScroll = () => {
      const dur = video.duration || 0;
      target = Math.max(0, Math.min((window.scrollY / SCROLL_RANGE) * dur, dur));
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // When metadata loads, we know duration — mark ready
    const onMeta = () => { ready = true; video.currentTime = 0; };
    if (video.readyState >= 1) {
      onMeta();
    } else {
      video.addEventListener('loadedmetadata', onMeta, { once: true });
    }

    // iOS Safari requires a play() call to unlock currentTime seeking.
    // We play for 1ms then pause — completely invisible to user.
    const unlock = () => {
      video.play().then(() => {
        video.pause();
        video.currentTime = target;
      }).catch(() => {});
    };

    const isMobile = window.matchMedia('(hover: none)').matches;
    if (isMobile) {
      // Unlock on first touch (before scroll)
      document.addEventListener('touchstart', unlock, { once: true, passive: true });
    } else {
      // Desktop: just ensure video is paused (no autoplay needed)
      video.pause();
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      video.removeEventListener('loadedmetadata', onMeta);
    };
  }, []);

  return (
    <section id="hero">
      {/* No autoPlay — we control playback entirely via currentTime */}
      <video
        ref={videoRef}
        src="/assets/hero-scrub-hq.mp4"
        poster="/assets/hero-poster.jpg"
        muted
        playsInline
        preload="auto"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', opacity: 0.68,
          pointerEvents: 'none',
        }}
      />
      <div className="h-vignette" />
      <div className="h-glow" />
      <div className="h-main">
        <span className="h-tagline">{h.tagline}</span>
        <div className="h-dates">
          <span className="hd-num">22.08</span>
          <div className="hd-div" />
          <span className="hd-num">23.08</span>
        </div>
        <div className="h-loc">{h.location}</div>
        <p className="h-sub">
          {h.sub.p1}<span className="h-sub-hl">{h.sub.hl1}</span>
          {h.sub.p2}<span className="h-sub-hl">{h.sub.hl2}</span>
          {h.sub.p3}<span className="h-sub-hl">{h.sub.hl3}</span>{h.sub.p4}
        </p>
        <div className="h-ctas">
          <a href="#lineup" className="btn-outline">{h.viewLineup}</a>
          <a href="https://www.eventim.bg/top-events/?affiliate=B9G" className="btn-fill" target="_blank" rel="noopener">{h.getTickets}</a>
        </div>
      </div>
      <div className="h-cue"><div className="cue-d" /><div className="cue-l" /></div>
      <div className="h-ticker"><div className="h-ticker-track" ref={tickerRef} /></div>
    </section>
  );
}
