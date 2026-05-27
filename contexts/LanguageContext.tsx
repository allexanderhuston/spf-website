'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { Lang } from '@/lib/i18n';

interface LangCtx { lang: Lang; setLang: (l: Lang) => void; }
const Ctx = createContext<LangCtx>({ lang: 'en', setLang: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem('spf-lang') as Lang | null;
    if (saved === 'bg' || saved === 'en') setLangState(saved);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem('spf-lang', l);
  }

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export function useLang() { return useContext(Ctx); }
