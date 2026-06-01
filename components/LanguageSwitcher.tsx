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
      <button
        className="lang-track"
        onClick={toggle}
        onTouchEnd={(e) => { e.preventDefault(); toggle(); }}
        role="switch"
        aria-checked={lang === 'bg'}
        aria-label="Toggle language"
      >
        <div className={`lang-thumb${lang === 'bg' ? ' on' : ''}`} />
      </button>
      <span className={`lang-label${lang === 'bg' ? ' active' : ''}`}>BG</span>
    </div>
  );
}
