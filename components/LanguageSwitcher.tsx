'use client';

import { useLang } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  function toggle() {
    setLang(lang === 'en' ? 'bg' : 'en');
  }

  return (
    <div className="lang-switch">
      <span className={`lang-label${lang === 'en' ? ' active' : ''}`}>EN</span>
      <div className="lang-track" onClick={toggle} role="switch" aria-checked={lang === 'bg'}>
        <div className={`lang-thumb${lang === 'bg' ? ' on' : ''}`} />
      </div>
      <span className={`lang-label${lang === 'bg' ? ' active' : ''}`}>BG</span>
    </div>
  );
}
