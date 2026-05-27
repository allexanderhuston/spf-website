'use client';
import { useLang } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';

export default function CTA() {
  const { lang } = useLang();
  const c = t[lang].cta;
  return (
    <section id="cta">
      <div className="cta-fade-top"></div>
      <div className="cta-inner">

        <p className="cta-tag rev" style={{ ['--d' as string]: '0ms' }}>{c.tag}</p>

        <h2 className="cta-headline rev" style={{ ['--d' as string]: '80ms' }}>
          {c.line1}{c.line2 ? <><br />{c.line2} </> : ' '}<span>{c.highlight}</span>
        </h2>

        <div className="cta-divider rev" style={{ ['--d' as string]: '160ms' }}></div>

        <p className="cta-meta rev" style={{ ['--d' as string]: '200ms' }}>{c.meta}</p>

        <div className="cta-actions rev" style={{ ['--d' as string]: '260ms' }}>
          <a href="https://sunsetfestival.bg" target="_blank" rel="noopener" className="btn-fill">{c.getTickets}</a>
          <a href="#lineup" className="btn-outline">{c.viewLineup}</a>
        </div>

      </div>
    </section>
  );
}
