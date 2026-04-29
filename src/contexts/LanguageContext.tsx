'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'ja' | 'en';

interface LanguageContextValue {
  lang: Lang;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'ja',
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ja');
  const toggle = () => setLang((l) => (l === 'ja' ? 'en' : 'ja'));
  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
