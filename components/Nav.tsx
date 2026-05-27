'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLang } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

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

  const { lang } = useLang();
  const n = t[lang].nav;

  return (
    <>
      <nav id="nav" className={scrolled ? 'on' : ''}>
        <ul className="nav-links-left">
          <li><a href="#lineup">{n.lineup}</a></li>
          <li><a href="#venue">{n.venue}</a></li>
          <li><a href="#tickets">{n.tickets}</a></li>
        </ul>

        <a href="#" className="nav-logo">
          <Image src="/assets/logo-icon.webp" alt="Sunset Port Festival" width={150} height={150} priority />
        </a>

        <div className="nav-right">
          <ul className="nav-links-right">
            <li><a href="#faq">{n.faq}</a></li>
          </ul>
          <LanguageSwitcher />
          <a href="https://sunsetfestival.bg" className="nav-cta" target="_blank" rel="noopener">{n.cta}</a>
          <button className={`ham${mobOpen ? ' open' : ''}`} id="ham" aria-label="Menu" onClick={toggleMob}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`mob${mobOpen ? ' open' : ''}`} id="mob">
        <a href="#lineup" onClick={closeMob}>{n.lineup}</a>
        <a href="#venue" onClick={closeMob}>{n.venue}</a>
        <a href="#tickets" onClick={closeMob}>{n.tickets}</a>
        <a href="#faq" onClick={closeMob}>{n.faq}</a>
        <LanguageSwitcher />
        <a href="https://sunsetfestival.bg" target="_blank" rel="noopener" onClick={closeMob}>{n.buyTickets}</a>
      </div>
    </>
  );
}
