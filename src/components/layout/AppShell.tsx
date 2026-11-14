import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AppShellProps {
  title: string;
  version: string;
  children?: ReactNode;
}

/**
 * Responsive overlay shell rendered above the 3D canvas using Framer Motion.
 */
export function AppShell({ title, version, children }: AppShellProps) {
  return (
    <motion.div
      className="app-shell"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <header className="app-header">
        <span className="app-title">{title}</span>
        <span className="app-version">v{version}</span>
      </header>
      {children ? <main className="app-main">{children}</main> : null}
    </motion.div>
  );
}
