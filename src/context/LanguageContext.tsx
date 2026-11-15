import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Language } from '@/types';
import { tr, type LocaleBundle } from '@/locales/tr';
import { en } from '@/locales/en';

const STORAGE_KEY = 'nasa-space-odyssey-lang';

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'tr';
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'tr' || saved === 'en') {
      return saved;
    }
  } catch {
    // Ignore storage access errors
  }
  return 'tr';
}

interface LanguageContextValue {
  lang: Language;
  setLang: (next: Language) => void;
  toggleLang: () => void;
  t: LocaleBundle;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore storage write errors
    }
  }, [lang]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => (prev === 'tr' ? 'en' : 'tr'));
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      toggleLang,
      t: lang === 'en' ? en : tr,
    }),
    [lang, setLang, toggleLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
