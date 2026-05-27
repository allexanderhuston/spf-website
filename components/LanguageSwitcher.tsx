'use client';

import { useLang } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div className="lang-switch">
      <button
        className={lang === 'en' ? 'active' : ''}
        onClick={() => setLang('en')}
      >EN</button>
      <span className="lang-div">/</span>
      <button
        className={lang === 'bg' ? 'active' : ''}
        onClick={() => setLang('bg')}
      >BG</button>
    </div>
  );
}
