import { useMemo } from 'react';

interface StarLayerProps {
  count: number;
  size: number;
  className: string;
  seed: number;
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function StarLayer({ count, size, className, seed }: StarLayerProps) {
  const shadow = useMemo(() => {
    const rand = seededRandom(seed);
    const parts: string[] = [];
    for (let i = 0; i < count; i++) {
      const x = (rand() * 100).toFixed(2);
      const y = (rand() * 100).toFixed(2);
      const a = (0.35 + rand() * 0.65).toFixed(2);
      parts.push(`${x}vw ${y}vh 0 rgba(255,255,255,${a})`);
    }
    return parts.join(',');
  }, [count, seed]);

  return (
    <div
      className={`starfield__layer ${className}`}
      style={{ width: size, height: size, boxShadow: shadow }}
    />
  );
}

/**
 * Decorative multi-layer CSS starfield (no extra dependencies).
 */
export function StarField() {
  return (
    <div className="starfield" aria-hidden="true">
      <StarLayer count={140} size={1} className="starfield__layer--far" seed={11} />
      <StarLayer count={70} size={2} className="starfield__layer--mid" seed={23} />
      <StarLayer count={25} size={3} className="starfield__layer--near" seed={47} />
    </div>
  );
}
