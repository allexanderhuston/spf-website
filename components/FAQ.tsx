'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';

interface FaqItem { q: string; a: string | readonly string[]; }

const HOTELS = [
  {
    name: 'Wave Resort',
    href: 'https://www.waveresort.bg/en/',
    img: '/assets/hotel-wave-resort.jpg',
  },
  {
    name: 'St. George Hotel',
    href: 'https://st-george-bg.com/bg',
    img: '/assets/hotel-st-george.jpg',
  },
  {
    name: 'Sunny Bay',
    href: 'https://sunnybay-pomorie.com',
    img: '/assets/hotel-sunny-bay.jpg',
  },
  {
    name: 'Dune Boutique Hotel',
    href: 'https://duneboutique.bg/',
    img: '/assets/hotel-dune.jpg',
  },
  {
    name: 'Marina Beach Hotel',
    href: 'https://enahotels.com/hoteli/marina-biich/',
    img: '/assets/hotel-marina-beach.webp',
  },
];

function HotelCards({ lang }: { lang: string }) {
  const bookLabel = lang === 'bg' ? 'Провери наличност' : 'Check Availability';
  return (
    <div className="hotel-cards-grid">
      {HOTELS.map((hotel) => (
        <a
          key={hotel.name}
          href={hotel.href}
          target="_blank"
          rel="noopener noreferrer"
          className="hotel-card"
        >
          <div className="hotel-card-img" style={{ position: 'relative' }}>
            {hotel.img
              ? <Image src={hotel.img} alt={hotel.name} fill sizes="200px" style={{ objectFit: 'cover' }} />
              : <span className="hotel-card-initial">{hotel.name.charAt(0)}</span>
            }
          </div>
          <div className="hotel-card-body">
            <span className="hotel-card-name">{hotel.name}</span>
            <span className="hotel-card-book">{bookLabel}</span>
          </div>
        </a>
      ))}
    </div>
  );
}

function FaqItem({ item, index, isOpen, onToggle, lang }: {
  item: FaqItem; index: number; isOpen: boolean; onToggle: () => void; lang: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isAccommodation = item.q === 'Accommodation' || item.q === 'Настаняване';

  function onExpandComplete() {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const viewH = window.innerHeight;
    if (rect.bottom > viewH - 20) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -(viewH - rect.height - 40), duration: 0.8 });
      } else {
        window.scrollBy({ top: rect.bottom - viewH + 40, behavior: 'smooth' });
      }
    }
  }

  const paragraphs = Array.isArray(item.a) ? item.a : [item.a];

  return (
    <div
      ref={ref}
      className={['fq', 'in', isOpen ? 'open' : ''].filter(Boolean).join(' ')}
      style={{
        opacity: 1,
        transition: `opacity .8s ease ${index * 15}ms, transform .8s ease ${index * 15}ms`,
      }}
    >
      <button className="fq-q" onClick={onToggle}>
        <span>{item.q}</span>
        <motion.span
          className="fq-icon"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >+</motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
            onAnimationComplete={onExpandComplete}
          >
            <div style={{ paddingBottom: 20 }}>
              {paragraphs.map((p, i) => (
                <p key={i} className="fq-a" style={{ maxHeight: 'none', paddingBottom: i < paragraphs.length - 1 ? 10 : 0 }}>
                  {p}
                </p>
              ))}
              {isAccommodation && <HotelCards lang={lang} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { lang } = useLang();
  const f = t[lang].faq;

  return (
    <section id="faq">
      <div style={{ padding: '0 clamp(20px,5vw,72px)', marginBottom: 40 }}>
        <span className="sec-label">{f.label}</span>
        <div className="sec-title">{f.title}</div>
        <p className="faq-intro">{f.intro}</p>
      </div>

      <div className="faq-questions">
        {f.items.map((item, i) => (
          <FaqItem
            key={`${lang}-${i}`}
            item={item}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(prev => prev === i ? null : i)}
            lang={lang}
          />
        ))}
      </div>
    </section>
  );
}
