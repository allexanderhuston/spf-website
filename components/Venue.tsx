'use client';
import { useLang } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';

export default function Venue() {
  const { lang } = useLang();
  const v = t[lang].venue;
  return (
    <section id="venue">
      <div className="venue-grid">
        <div className="venue-left">
          <span className="sec-label rev" style={{ ['--d' as string]: '0ms' }}>{v.label}</span>
          <div className="sec-title rev" style={{ ['--d' as string]: '40ms' }}>{v.title}</div>

          <div className="venue-items">

            <div className="venue-item rev" style={{ ['--d' as string]: '80ms' }}>
              <div className="vi-icon">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="4"/>
                  <line x1="12" y1="2" x2="12" y2="5"/>
                  <line x1="12" y1="19" x2="12" y2="22"/>
                  <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/>
                  <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
                  <line x1="2" y1="12" x2="5" y2="12"/>
                  <line x1="19" y1="12" x2="22" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
                  <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
                </svg>
              </div>
              <div className="vi-text">
                <div className="vi-title">{v.items[0].title}</div>
                <div className="vi-desc">{v.items[0].desc}</div>
              </div>
            </div>

            <div className="venue-item rev" style={{ ['--d' as string]: '110ms' }}>
              <div className="vi-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M2 12c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0"/>
                  <path d="M2 17c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0"/>
                  <path d="M2 7c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0"/>
                </svg>
              </div>
              <div className="vi-text">
                <div className="vi-title">{v.items[1].title}</div>
                <div className="vi-desc">{v.items[1].desc}</div>
              </div>
            </div>

            <div className="venue-item rev" style={{ ['--d' as string]: '140ms' }}>
              <div className="vi-icon">
                <svg viewBox="0 0 24 24">
                  <rect x="4" y="3" width="3" height="18" rx="1"/>
                  <rect x="10.5" y="3" width="3" height="18" rx="1"/>
                  <rect x="17" y="3" width="3" height="18" rx="1"/>
                  <line x1="2" y1="3" x2="22" y2="3"/>
                  <line x1="2" y1="21" x2="22" y2="21"/>
                </svg>
              </div>
              <div className="vi-text">
                <div className="vi-title">{v.items[2].title}</div>
                <div className="vi-desc">{v.items[2].desc}</div>
              </div>
            </div>

            <div className="venue-item rev" style={{ ['--d' as string]: '170ms' }}>
              <div className="vi-icon">
                <svg viewBox="0 0 24 24">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <div className="vi-text">
                <div className="vi-title">{v.items[3].title}</div>
                <div className="vi-desc">{v.items[3].desc}</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
