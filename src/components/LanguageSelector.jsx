import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function LanguageSelector() {
  const { language, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    if (!isMenuOpen) return;
    
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const handleToggleLanguage = () => {
    toggleLanguage();
    setIsMenuOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      {isMenuOpen && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 animate-fade-in-scale">
          <button
            onClick={handleToggleLanguage}
            className="w-14 h-14 rounded-full bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-200 font-semibold text-lg transition-all duration-300 hover:scale-110 active:scale-95"
          >
            {language === 'es' ? 'EN' : 'ES'}
          </button>
        </div>
      )}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="w-14 h-14 rounded-full bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-200 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Selector de idioma"
      >
        <span className="mr-1">{language.toUpperCase()}</span>
        <svg className={`w-3 h-3 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
    </div>
  );
}

export default LanguageSelector;
