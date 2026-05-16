'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ArtistData {
  tag: string;
  bg: string;
  img?: string;
  horizontal?: boolean;
}

const artistData: Record<string, ArtistData> = {
  'Криско':          { tag: 'Headliner · Day 1', bg: 'linear-gradient(135deg,#1a0a2e,#3d1a5c,#0d0818)', img: '/assets/krisko.webp' },
  'Мария Илиева':    { tag: 'Main Act · Day 1',  bg: 'linear-gradient(135deg,#0d1a2e,#1a3a5c,#080b18)', img: '/assets/maria-ilieva.webp' },
  'Михаела Филиева': { tag: 'Main Act · Day 1',  bg: 'linear-gradient(135deg,#1a0d1a,#4a1a4a,#0d080d)', img: '/assets/mihaela-fileva.webp' },
  'Остава':          { tag: 'Main Act · Day 1',  bg: 'linear-gradient(135deg,#0a1a1a,#0d3a3a,#080b18)', img: '/assets/ostava.webp', horizontal: true },
  'Мона':            { tag: 'Support · Day 1',   bg: 'linear-gradient(135deg,#1a1a0a,#2a2a0d,#080b18)', img: '/assets/mona.webp' },
  'DJ Marti G':      { tag: 'Support · Day 1',   bg: 'linear-gradient(135deg,#0a1a1a,#0d2a2a,#080b18)', img: '/assets/dj-marti-g.webp' },
  'Roger Sanchez':   { tag: 'Headliner · Day 2', bg: 'linear-gradient(135deg,#1a0a0a,#5c1a0a,#080b18)', img: '/assets/roger-sanchez.webp' },
  'Dimo BG':         { tag: 'Main Act · Day 2',  bg: 'linear-gradient(135deg,#0a0d1a,#1a2a4a,#080b18)', img: '/assets/dimo-bg.webp' },
  'Diass':           { tag: 'Main Act · Day 2',  bg: 'linear-gradient(135deg,#0d0a1a,#2a1a4a,#080b18)', img: '/assets/diass.webp' },
  'Spirit Grow':     { tag: 'Support · Day 2',   bg: 'linear-gradient(135deg,#0a1a0a,#0d2a1a,#080b18)', img: '/assets/spirit-grow.webp', horizontal: true },
};

const allArtists = Object.entries(artistData);

export default function Lineup() {
  const [activeDay, setActiveDay] = useState(1);
  const [activeArtist, setActiveArtist] = useState<string | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Direct 1:1 cursor follow — no transition, no RAF lag
  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (previewRef.current) {
        previewRef.current.style.transform = `translate(${e.clientX + 28}px,${e.clientY - 150}px)`;
      }
    }
    document.addEventListener('mousemove', onMove, { passive: true });
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  // Detect touch device by screen width (reliable across all browsers)
  const isTouchRef = useRef(false);
  useEffect(() => {
    const check = () => { isTouchRef.current = window.innerWidth < 1024; };
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // Artist hover (desktop) + tap (mobile)
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    wrapRefs.current.forEach(wrap => {
      if (!wrap) return;
      const rows = Array.from(wrap.querySelectorAll<HTMLElement>('.act-row'));

      rows.forEach(row => {
        const nameEl = row.querySelector('.act-name');
        const rawName = nameEl?.textContent?.trim() ?? '';

        function activate() {
          rows.forEach(r => {
            if (r === row) { r.classList.add('hovered'); r.classList.remove('dimmed'); }
            else { r.classList.remove('hovered'); r.classList.add('dimmed'); }
          });
          setActiveArtist(rawName);
          setPreviewVisible(true);
        }

        function deactivate() {
          rows.forEach(r => r.classList.remove('hovered', 'dimmed'));
          setPreviewVisible(false);
        }

        // Desktop: hover
        row.addEventListener('mouseenter', activate);
        row.addEventListener('mouseleave', deactivate);

        // Mobile only: tap toggles preview
        function onTap(e: Event) {
          e.stopPropagation();
          const isActive = row.classList.contains('hovered');
          if (isActive) { deactivate(); } else { activate(); }
        }

        if (isTouchRef.current) {
          row.addEventListener('click', onTap);
        }

        cleanups.push(() => {
          row.removeEventListener('mouseenter', activate);
          row.removeEventListener('mouseleave', deactivate);
          row.removeEventListener('click', onTap);
        });
      });
    });

    if (isTouchRef.current) {
      // Tap outside dismisses
      function onOutsideClick() {
        wrapRefs.current.forEach(wrap => {
          wrap?.querySelectorAll<HTMLElement>('.act-row').forEach(r => r.classList.remove('hovered', 'dimmed'));
        });
        setPreviewVisible(false);
      }
      document.addEventListener('click', onOutsideClick);
      cleanups.push(() => document.removeEventListener('click', onOutsideClick));

      // Scroll dismisses
      function onScroll() {
        wrapRefs.current.forEach(wrap => {
          wrap?.querySelectorAll<HTMLElement>('.act-row').forEach(r => r.classList.remove('hovered', 'dimmed'));
        });
        setPreviewVisible(false);
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      cleanups.push(() => window.removeEventListener('scroll', onScroll));
    }

    return () => cleanups.forEach(fn => fn());
  }, [activeDay]);

  const data = activeArtist ? (artistData[activeArtist] ?? null) : null;

  return (
    <>
      {/* Preview — follows cursor on desktop, fixed centre-bottom on mobile */}
      <div
        id="artist-preview"
        ref={previewRef}
        style={{
          opacity: previewVisible ? 1 : 0,
          width: data?.horizontal ? '340px' : '220px',
          height: data?.horizontal ? '200px' : '280px',
          transition: 'opacity 0.08s ease',
        }}
        className="artist-preview-wrap"
      >
        {/* Gradient fallback */}
        <div className="ap-bg" style={{ background: data?.bg ?? '' }} />

        {/* Pre-rendered images — all in DOM, only active one visible */}
        {allArtists.map(([name, d]) => d.img && (
          <Image
            key={name}
            src={d.img}
            alt={name}
            fill
            sizes="340px"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              opacity: activeArtist === name ? 1 : 0,
              // Zero transition on image swap — instant
              transition: 'none',
              position: 'absolute',
              inset: 0,
            }}
            priority={false}
          />
        ))}

        <div className="ap-name">
          <span className="ap-tag">{data?.tag ?? ''}</span>
          <span>{activeArtist ?? ''}</span>
        </div>
      </div>

      <section id="lineup">
        <div className="lineup-head">
          <span className="sec-label">Line Up</span>
          <div className="lineup-bg-title">The Artists</div>
        </div>

        <div className="lineup-body">
          <div className="lineup-left">

            <div className="day-tabs">
              {[1, 2].map(day => (
                <button
                  key={day}
                  className={`day-tab${activeDay === day ? ' active' : ''}`}
                  onClick={() => setActiveDay(day)}
                >
                  <span className="dt-l">Day {day}</span>
                  <span className="dt-d">{day === 1 ? '22.08' : '23.08'}</span>
                  <span className="dt-s">{day === 1 ? 'Събота' : 'Неделя'}</span>
                </button>
              ))}
            </div>

            {/* Day 1 */}
            <div className={`day-panel${activeDay === 1 ? ' active' : ''}`} id="day-1">
              <div className="acts-wrap" ref={el => { wrapRefs.current[0] = el; }}>
                <div className="act-row t1"><div><span className="act-name">Криско</span></div><span className="act-tag">Headliner</span></div>
                <div className="act-row t2"><span className="act-name">Мария Илиева</span><span className="act-tag">Main Act</span></div>
                <div className="act-row t2"><span className="act-name">Михаела Филиева</span><span className="act-tag">Main Act</span></div>
                <div className="act-row t2"><span className="act-name">Остава</span><span className="act-tag">Main Act</span></div>
                <div className="act-row t2"><span className="act-name">Мона</span><span className="act-tag">Support</span></div>
                <div className="act-row t3"><span className="act-name">DJ Marti G</span><span className="act-tag">Support</span></div>
              </div>
            </div>

            {/* Day 2 */}
            <div className={`day-panel${activeDay === 2 ? ' active' : ''}`} id="day-2">
              <div className="acts-wrap" ref={el => { wrapRefs.current[1] = el; }}>
                <div className="act-row t1"><div><span className="act-name">Roger Sanchez</span><span className="act-note">Grammy Award Winner</span></div><span className="act-tag">Headliner</span></div>
                <div className="act-row t2"><span className="act-name">Dimo BG</span><span className="act-tag">Main Act</span></div>
                <div className="act-row t2"><span className="act-name">Diass</span><span className="act-tag">Main Act</span></div>
                <div className="act-row t3"><span className="act-name">Spirit Grow</span><span className="act-tag">Support</span></div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
