import React from 'react';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';

/**
 * Componente que agrupa los controles flotantes (idioma y tema)
 */
function FloatingControls() {
  return (
    <div className="fixed bottom-12 right-5 z-50 flex flex-col items-end gap-3">
      <LanguageSelector />
      <ThemeToggle />
    </div>
  );
}

export default FloatingControls;
