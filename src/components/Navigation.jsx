import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function Navigation() {
  const { t } = useLanguage();

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  return (
    <>
      {/* Menú minimalista */}
      <nav className="w-full max-w-5xl flex justify-center mb-8 pr-0 pl-0">
        <ul className="flex space-x-10 text-gray-700 dark:text-gray-300 text-base font-medium tracking-wide w-full justify-center items-center text-center">
          <li>
            <a 
              href="#como-ayudarte" 
              onClick={(e) => handleNavClick(e, 'como-ayudarte')} 
              className="relative group hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              <span className="relative z-10">{t.menu.intro}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a 
              href="#proyectos" 
              onClick={(e) => handleNavClick(e, 'proyectos')} 
              className="relative group hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              <span className="relative z-10">{t.menu.projects}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a 
              href="#contacto" 
              onClick={(e) => handleNavClick(e, 'contacto')} 
              className="relative group hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              <span className="relative z-10">{t.menu.contact}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Header superior minimalista (antiguo) */}
      <header className="w-full max-w-5xl mb-8 hidden md:block">
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span className="tracking-widest">01</span>
          <span className="tracking-widest">{t.menu.mainPage}</span>
        </div>
        <div className="border-t border-gray-300 dark:border-gray-700 w-full mb-2" />
      </header>
    </>
  );
}

export default Navigation;
