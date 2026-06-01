'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLang } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';

interface ArtistData {
  tag: string;
  bg: string;
  img?: string;
  horizontal?: boolean;
}

const artistData: Record<string, ArtistData> = {
  'Криско':          { tag: 'Day 1', bg: 'linear-gradient(135deg,#1a0a2e,#3d1a5c,#0d0818)', img: '/assets/krisko.webp' },
  'Мария Илиева':    { tag: 'Day 1', bg: 'linear-gradient(135deg,#0d1a2e,#1a3a5c,#080b18)', img: '/assets/maria-ilieva.webp' },
  'Михаела Филева': { tag: 'Day 1', bg: 'linear-gradient(135deg,#1a0d1a,#4a1a4a,#0d080d)', img: '/assets/mihaela-fileva.webp' },
  'Остава':          { tag: 'Day 1', bg: 'linear-gradient(135deg,#0a1a1a,#0d3a3a,#080b18)', img: '/assets/ostava.webp', horizontal: true },
  'Мона':            { tag: 'Day 1', bg: 'linear-gradient(135deg,#1a1a0a,#2a2a0d,#080b18)', img: '/assets/mona.webp' },
  'DJ Marti G':      { tag: 'Day 1', bg: 'linear-gradient(135deg,#0a1a1a,#0d2a2a,#080b18)', img: '/assets/dj-marti-g.webp' },
  'Roger Sanchez':   { tag: 'Day 2', bg: 'linear-gradient(135deg,#1a0a0a,#5c1a0a,#080b18)', img: '/assets/roger-sanchez.webp' },
  'Dimo BG':         { tag: 'Day 2', bg: 'linear-gradient(135deg,#0a0d1a,#1a2a4a,#080b18)', img: '/assets/dimo-bg.webp' },
  'Diass':           { tag: 'Day 2', bg: 'linear-gradient(135deg,#0d0a1a,#2a1a4a,#080b18)', img: '/assets/diass.webp' },
  'Spirit Grow':     { tag: 'Day 2', bg: 'linear-gradient(135deg,#0a1a0a,#0d2a1a,#080b18)', img: '/assets/spirit-grow.webp', horizontal: true },
};

const day1 = ['Криско', 'Мария Илиева', 'Михаела Филева', 'Остава', 'Мона', 'DJ Marti G'];
const day2 = ['Roger Sanchez', 'Dimo BG', 'Diass', 'Spirit Grow'];
const allArtists = Object.entries(artistData);

export default function Lineup() {
  const [activeArtist, setActiveArtist] = useState<string | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // 1:1 cursor follow
  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (previewRef.current) {
        previewRef.current.style.transform = `translate(${e.clientX + 28}px,${e.clientY - 150}px)`;
      }
    }
    document.addEventListener('mousemove', onMove, { passive: true });
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  function handleEnter(name: string) {
    setActiveArtist(name);
    setPreviewVisible(true);
  }

  function handleLeave() {
    setPreviewVisible(false);
  }

  const { lang } = useLang();
  const l = t[lang].lineup;
  const data = activeArtist ? (artistData[activeArtist] ?? null) : null;

  function renderDay(
    artists: string[],
    opts: { hideDesktop?: number[]; hideMobile?: number[] } = {}
  ) {
    return artists.map((name, i) => (
      <span key={name}>
        <span
          className="pl-name"
          onMouseEnter={() => handleEnter(name)}
          onMouseLeave={handleLeave}
        >
          {name}
        </span>
        {i < artists.length - 1 && (
          <span className={[
            'pl-sep',
            opts.hideDesktop?.includes(i) ? 'pl-sep-hd' : '',
            opts.hideMobile?.includes(i)  ? 'pl-sep-hm' : '',
          ].filter(Boolean).join(' ')}> • </span>
        )}
      </span>
    ));
  }

  return (
    <>
      {/* Preview */}
      <div
        id="artist-preview"
        ref={previewRef}
        style={{
          opacity: previewVisible ? 1 : 0,
          width: data?.horizontal ? '340px' : '220px',
          height: data?.horizontal ? '200px' : '280px',
          transition: 'opacity 0.08s ease',
        }}
        className={`artist-preview-wrap${data?.horizontal ? ' horizontal' : ''}`}
      >
        <div className="ap-bg" style={{ background: data?.bg ?? '' }} />
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
          <span className="sec-label">{l.label}</span>
          <div className="lineup-bg-title">{l.title}</div>
        </div>

        <div className="pl-poster">

          <div className="pl-poster-block">
            <div className="pl-poster-meta">
              <span className="pl-poster-date">{l.day1.date}</span>
              <span className="pl-poster-rule" />
              <span className="pl-poster-day">{l.day1.name}</span>
            </div>
            {/* Desktop */}
            <p className="pl-poster-names pl-day1-desktop">
              {renderDay(day1, { hideDesktop: [2] })}
            </p>
            {/* Mobile — three explicit lines */}
            <div className="pl-day1-mobile">
              <p className="pl-poster-names">
                {renderDay(['Криско', 'Мария Илиева'], {})}
              </p>
              <p className="pl-poster-names">
                <span className="pl-name">Михаела Филева</span>
              </p>
              <p className="pl-poster-names">
                {renderDay(['Остава', 'Мона', 'DJ Marti G'], {})}
              </p>
            </div>
          </div>

          <div className="pl-poster-block">
            <div className="pl-poster-meta">
              <span className="pl-poster-date">{l.day2.date}</span>
              <span className="pl-poster-rule" />
              <span className="pl-poster-day">{l.day2.name}</span>
            </div>
            <div className="pl-day2-acts">
              <p className="pl-poster-names">
                <span
                  className="pl-name pl-headliner"
                  onMouseEnter={() => handleEnter('Roger Sanchez')}
                  onMouseLeave={handleLeave}
                >Roger Sanchez</span>
              </p>
              <p className="pl-poster-names">
                {renderDay(['Dimo BG', 'Diass', 'Spirit Grow'], { hideMobile: [1] })}
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
