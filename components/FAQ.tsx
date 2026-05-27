'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';

interface FaqItem { q: string; a: string | readonly string[]; }

const faqs: FaqItem[] = [
  {
    q: 'When and where is Sunset Port Festival 2026?',
    a: "Sunset Port Festival takes place on 22 and 23 August 2026 at Pomorie Port, on Bulgaria's Black Sea coast. Pomorie is approximately 30 minutes from Burgas Airport and around 20 minutes from Sunny Beach.",
  },
  {
    q: 'Where can I buy tickets?',
    a: [
      'Tickets are sold through the official Sunset Port Festival website and Eventim. Once ticket sales are live, you will be able to choose between single-day tickets for Saturday 22.08 or Sunday 23.08, as well as full weekend passes.',
      'To avoid ticket scams, only buy from official ticket channels.',
    ],
  },
  {
    q: 'What ticket types will be available?',
    a: 'Sunset Port Festival will offer Day 1 tickets, Day 2 tickets and weekend passes. Day tickets give access to one festival day only, while weekend passes give access to both nights at Pomorie Port.',
  },
  {
    q: 'How do I get to Pomorie Port?',
    a: [
      "Pomorie is easy to reach from key locations on Bulgaria's Black Sea coast. The town is approximately 30 minutes from Burgas Airport, around 20 minutes from Sunny Beach, and within easy reach of Burgas by car, taxi or organised transport.",
      'Festival shuttle and transport details will be announced closer to the event.',
    ],
  },
  {
    q: 'Is there parking at the venue?',
    a: 'Parking and shuttle information will be announced before the festival. Because August is peak season on the Black Sea coast, we recommend planning your journey in advance and following the official Sunset Port Festival channels for updates.',
  },
  {
    q: 'Where should I stay?',
    a: [
      'Pomorie, Sunny Beach and Burgas all offer a wide range of hotels and accommodation options. August is a busy period on the Black Sea coast, so early booking is strongly recommended.',
      'Recommended partner hotels for Sunset Port Festival guests will be announced soon.',
    ],
  },
  {
    q: 'What is the age limit?',
    a: [
      'Day 1, Saturday 22.08, is open to guests aged 16+. Guests aged 16–17 must be accompanied by a responsible adult throughout the event. If the accompanying adult is not the guest\'s parent or legal guardian, a notarised parental consent declaration must be presented upon entry.',
      'Day 2, Sunday 23.08, is strictly 18+ with valid ID. ID checks will take place at the entrance and at all bars.',
    ],
  },
  {
    q: 'What time do the gates open?',
    a: 'Gates open at 17:00 on both festival days. The event runs from sunset into the late hours, with music, food, drinks and surprise moments throughout the evening.',
  },
  {
    q: 'Will there be food and drinks?',
    a: 'Yes. Food vendors and bars will be available at the venue throughout both festival days. Visitors can expect food, drinks and festival extras designed to complement the open-air experience at Pomorie Port.',
  },
  {
    q: 'Can I pay by card?',
    a: 'Yes. Bars and food vendors at the festival will accept both cash and card payments.',
  },
  {
    q: 'Can I leave and re-enter the festival?',
    a: 'No. Re-entry is not permitted once you leave the festival venue. Please make sure you have everything you need before entering Pomorie Port.',
  },
  {
    q: 'What should I bring?',
    a: [
      'Bring a valid ID, your ticket, a bank card or cash, sunscreen, and a light jacket or layer for the evening. Small personal bags are allowed.',
      'Do not bring outside food or drinks, glass bottles, alcohol, professional cameras without accreditation, drones, fireworks, flares, weapons, illegal substances, large umbrellas, chairs, stools or any item that may be considered unsafe by security.',
    ],
  },
  {
    q: 'What happens if it rains?',
    a: [
      'Sunset Port Festival is an outdoor event and is planned to go ahead in normal weather conditions. We recommend bringing a light waterproof layer just in case.',
      "If extreme weather or circumstances beyond the organiser's control affect the event, updates will be shared through the official website and social media channels.",
    ],
  },
  {
    q: 'Are tickets refundable or transferable?',
    a: [
      'Tickets should only be purchased through official channels. Do not buy tickets from unofficial resellers.',
      "Refunds are usually handled through the ticketing partner only when the organiser authorises them. Eventim's terms state that ticket refunds are carried out only when the organiser assigns Eventim to process the refund under the organiser's conditions.",
    ],
  },
  {
    q: 'Is the venue accessible?',
    a: 'Pomorie Port has flat, paved areas and accessible facilities. If you have specific accessibility requirements, contact the festival team before the event so they can help you plan the best possible experience.',
  },
  {
    q: 'Will the full schedule and set times be announced?',
    a: 'Yes. The full programme, artist schedule and set times will be announced closer to the festival. Follow the official Sunset Port Festival channels for lineup updates, transport details and ticket announcements.',
  },
];

function FaqItem({ item, index, isOpen, onToggle }: {
  item: FaqItem; index: number; isOpen: boolean; onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

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
          />
        ))}
      </div>
    </section>
  );
}
