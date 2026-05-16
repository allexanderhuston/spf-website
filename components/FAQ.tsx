'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FaqItem { q: string; a: string; }

const faqs: FaqItem[] = [
  { q: 'When and where?', a: "22 and 23 August 2026 at Pomorie Port, on Bulgaria's Black Sea coast. Approximately 30 minutes from Bourgas Airport and 20 minutes from Sunny Beach." },
  { q: 'Where do I buy tickets?', a: 'All tickets sold exclusively through sunsetfestival.bg. Single-day passes for Saturday 22.08 or Sunday 23.08, and full weekend passes available.' },
  { q: 'How do I get there?', a: 'Pomorie is 30 minutes from Bourgas Airport and 20 minutes from Sunny Beach. Festival shuttles will be announced closer to the event date.' },
  { q: 'Accommodation nearby?', a: 'Yes — Pomorie, Sunny Beach and Bourgas all offer a wide range of hotels. August is peak season on the Black Sea, so early booking is strongly recommended.' },
  { q: 'Age limit?', a: '16+ with valid ID. Required for entry and for alcohol purchase at the venue.' },
  { q: 'What time do the gates open?', a: 'Gates open at 16:00 on both days. The main programme begins at 18:00 and runs until 00:00. Full schedule will be published closer to the event.' },
  { q: 'Is there food and drinks at the venue?', a: 'Yes — a variety of food vendors and bars will be operating throughout both days. The venue is cashless, so please ensure you have a card or set up your wristband wallet on arrival.' },
  { q: 'Can I re-enter the festival?', a: 'Yes, re-entry is permitted. Your wristband will be scanned upon exit and re-entry. Please do not remove your wristband as it cannot be replaced.' },
  { q: 'What can I bring to the festival?', a: 'You are welcome to bring: valid ID, sunscreen, and a small bag. Strictly prohibited: outside food and drinks, glass bottles, professional cameras, or any items deemed dangerous by security.' },
  { q: 'Is the venue accessible?', a: 'Sunset Port Festival is committed to accessibility. Pomorie Port has flat, paved surfaces and accessible facilities. Please contact us in advance so we can ensure you have the best experience.' },
];

function FaqItem({ item, index, isOpen, onToggle }: {
  item: FaqItem; index: number; isOpen: boolean; onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold: 0.07 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Called when Framer Motion finishes the expand animation
  function onExpandComplete() {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const viewH = window.innerHeight;
    if (rect.bottom > viewH - 20) {
      // Use Lenis so the scroll easing matches the page scroll exactly
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -(viewH - rect.height - 40), duration: 0.8 });
      } else {
        window.scrollBy({ top: rect.bottom - viewH + 40, behavior: 'smooth' });
      }
    }
  }

  return (
    <div
      ref={ref}
      className={['fq', visible ? 'in' : '', isOpen ? 'open' : ''].filter(Boolean).join(' ')}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(16px)',
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
            <p className="fq-a" style={{ maxHeight: 'none', paddingBottom: 20 }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setHeadingVisible(true); io.disconnect(); }
    }, { threshold: 0.07 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="faq">

      {/* Title — full width above questions */}
      <div
        ref={headingRef}
        style={{
          padding: '0 clamp(20px,5vw,72px)',
          opacity: headingVisible ? 1 : 0,
          transform: headingVisible ? 'none' : 'translateY(16px)',
          transition: 'opacity .8s ease, transform .8s ease',
          marginBottom: 40,
        }}
      >
        <span className="sec-label">FAQ</span>
        <div className="sec-title">Questions</div>
      </div>

      {/* Questions — full width below */}
      <div className="faq-questions">
        {faqs.map((item, i) => (
          <FaqItem
            key={i}
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
