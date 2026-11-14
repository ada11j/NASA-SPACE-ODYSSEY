interface BrandLogoProps {
  className?: string;
}

/**
 * HVB HORIZON wordmark with a minimal horizon mark.
 */
export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <div className={`brand-logo ${className ?? ''}`.trim()}>
      <svg className="brand-logo__mark" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 20 Q16 10 30 20" fill="none" stroke="#e2643a" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="brand-logo__text">
        HVB <strong>HORIZON</strong>
      </span>
    </div>
  );
}
