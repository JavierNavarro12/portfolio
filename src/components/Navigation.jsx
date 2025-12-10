import React, { useRef, useLayoutEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { gsap } from '../hooks/useGSAP';

function Navigation() {
  const { t } = useLanguage();
  const navRef = useRef(null);
  const headerRef = useRef(null);
  const linksRef = useRef([]);

  useLayoutEffect(() => {
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      // Animación de entrada del nav
      gsap.from(navRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.8,
        delay: 0.5,
        ease: 'power3.out',
      });

      // Animación de los links con stagger
      gsap.from(linksRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.7,
        ease: 'back.out(1.7)',
      });

      // Animación del header
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          opacity: 0,
          scaleX: 0,
          duration: 0.8,
          delay: 1,
          ease: 'power3.out',
        });
      }
    }, navRef);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Menú minimalista */}
      <nav ref={navRef} className="w-full max-w-5xl flex justify-center mb-8 pr-0 pl-0">
        <ul className="flex space-x-10 text-gray-700 dark:text-gray-300 text-base font-medium tracking-wide w-full justify-center items-center text-center">
          <li ref={el => linksRef.current[0] = el}>
            <a 
              href="#como-ayudarte" 
              onClick={(e) => handleNavClick(e, 'como-ayudarte')} 
              className="relative group hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              <span className="relative z-10">{t.menu.intro}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li ref={el => linksRef.current[1] = el}>
            <a 
              href="#proyectos" 
              onClick={(e) => handleNavClick(e, 'proyectos')} 
              className="relative group hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              <span className="relative z-10">{t.menu.projects}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li ref={el => linksRef.current[2] = el}>
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

      {/* Header superior minimalista */}
      <header ref={headerRef} className="w-full max-w-5xl mb-8 hidden md:block">
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
