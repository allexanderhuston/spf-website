'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function closeMob() {
    setMobOpen(false);
    document.body.style.overflow = '';
  }

  function toggleMob() {
    const next = !mobOpen;
    setMobOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  }

  return (
    <>
      <nav id="nav" className={scrolled ? 'on' : ''}>
        <ul className="nav-links-left">
          <li><a href="#lineup">Line Up</a></li>
          <li><a href="#venue">Venue</a></li>
          <li><a href="#tickets">Tickets</a></li>
        </ul>

        <a href="#" className="nav-logo">
          <Image src="/assets/logo-icon.webp" alt="Sunset Port Festival" width={150} height={150} priority />
        </a>

        <div className="nav-right">
          <ul className="nav-links-right">
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#gallery">Gallery</a></li>
          </ul>
          <a href="https://sunsetfestival.bg" className="nav-cta" target="_blank" rel="noopener">Tickets</a>
          <button className={`ham${mobOpen ? ' open' : ''}`} id="ham" aria-label="Menu" onClick={toggleMob}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`mob${mobOpen ? ' open' : ''}`} id="mob">
        <a href="#lineup" onClick={closeMob}>Line Up</a>
        <a href="#venue" onClick={closeMob}>Venue</a>
        <a href="#tickets" onClick={closeMob}>Tickets</a>
        <a href="#faq" onClick={closeMob}>FAQ</a>
        <a href="https://sunsetfestival.bg" target="_blank" rel="noopener" onClick={closeMob}>Buy Tickets →</a>
      </div>
    </>
  );
}
