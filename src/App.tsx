import { LanguageProvider } from '@/context/LanguageContext';
import { HomePage } from '@/pages/HomePage';

/**
 * Root entry point. The foundational 3D viewport (SceneCanvas) and AppShell
 * remain available in the codebase for later stages.
 */
export function App() {
  return (
    <LanguageProvider>
      <HomePage />
    </LanguageProvider>
  );
}

export default App;
