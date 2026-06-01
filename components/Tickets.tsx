'use client';
import Image from 'next/image';
import { useLang } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';

const TICKETS = [
  {
    key: 'earlyBirdDay1',
    image: '/assets/ticket-day1.png',
    alt: 'Early Bird — Day I · 22.08',
    href: 'https://www.eventim.bg/event/sunset-port-festival-pomorie-22-08-2026-day-1-%D0%BF%D1%80%D0%B8%D1%81%D1%82%D0%B0%D0%BD%D0%B8%D1%89%D0%B5-%D0%BF%D0%BE%D0%BC%D0%BE%D1%80%D0%B8%D0%B5-outdoor-21717794/?affiliate=B9G',
  },
  {
    key: 'earlyBirdDay2',
    image: '/assets/ticket-day2.png',
    alt: 'Early Bird — Day II · 23.08',
    href: 'https://www.eventim.bg/event/sunset-port-festival-pomorie-23-08-2026-day-2-%D0%BF%D1%80%D0%B8%D1%81%D1%82%D0%B0%D0%BD%D0%B8%D1%89%D0%B5-%D0%BF%D0%BE%D0%BC%D0%BE%D1%80%D0%B8%D0%B5-outdoor-21717835/?affiliate=B9G',
  },
  {
    key: 'earlyBirdWeekend',
    image: '/assets/ticket-weekend.png',
    alt: 'Early Bird — Weekend Pass · 22 & 23.08',
    href: 'https://www.eventim.bg/event/sunset-port-festival-pomorie-22-23-08-2026-2-days-ticket-%D0%BF%D1%80%D0%B8%D1%81%D1%82%D0%B0%D0%BD%D0%B8%D1%89%D0%B5-%D0%BF%D0%BE%D0%BC%D0%BE%D1%80%D0%B8%D0%B5-outdoor-21717866/?affiliate=B9G',
  },
  {
    key: 'vip',
    image: '/assets/ticket-vip.png',
    alt: 'VIP Tables & Sofas · 22 & 23.08',
    href: 'https://www.eventim.bg/event/for-vip-tables-sofa-contact-us-359-886-184050-%D0%BF%D1%80%D0%B8%D1%81%D1%82%D0%B0%D0%BD%D0%B8%D1%89%D0%B5-%D0%BF%D0%BE%D0%BC%D0%BE%D1%80%D0%B8%D0%B5-outdoor-21738558/?affiliate=B9G',
  },
];

export default function Tickets() {
  const { lang } = useLang();
  const tk = t[lang].tickets;

  return (
    <section id="tickets">
      <span className="sec-label rev" style={{ ['--d' as string]: '0ms' }}>{tk.label}</span>
      <div className="sec-title rev" style={{ ['--d' as string]: '40ms' }}>{tk.title}</div>

      <div className="ticket-cards-grid rev" style={{ ['--d' as string]: '80ms' }}>
        {TICKETS.map((ticket) => (
          <div key={ticket.key} className="ticket-card">
            <div className="ticket-card-img-wrap">
              <Image
                src={ticket.image}
                alt={ticket.alt}
                width={600}
                height={600}
                className="ticket-card-img"
              />
            </div>
            <a
              href={ticket.href}
              target="_blank"
              rel="noopener noreferrer"
              className="pass-buy ticket-card-btn"
            >
              {tk.buyTickets}
            </a>
          </div>
        ))}
      </div>

      <p className="passes-note rev" style={{ ['--d' as string]: '120ms' }}>{tk.note}</p>
    </section>
  );
}
