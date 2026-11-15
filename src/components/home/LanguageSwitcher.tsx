import { useLanguage } from '@/context/LanguageContext';

interface LanguageSwitcherProps {
  className?: string;
}

/**
 * Space-themed segmented TR | EN language switcher.
 * Placed in the top-right corner of the navigation bar on desktop and accessible in mobile navigation.
 */
export function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      className={`lang-switcher ${className}`.trim()}
      role="group"
      aria-label={t.ui.nav.langSwitcherAriaLabel}
    >
      <button
        type="button"
        className={`lang-switcher__btn ${lang === 'tr' ? 'lang-switcher__btn--active' : ''}`}
        aria-pressed={lang === 'tr'}
        onClick={() => setLang('tr')}
      >
        TR
      </button>
      <span className="lang-switcher__divider" aria-hidden="true">
        |
      </span>
      <button
        type="button"
        className={`lang-switcher__btn ${lang === 'en' ? 'lang-switcher__btn--active' : ''}`}
        aria-pressed={lang === 'en'}
        onClick={() => setLang('en')}
      >
        EN
      </button>
    </div>
  );
}
