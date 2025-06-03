import React, { useState, useEffect, useRef } from "react";
import Tecnologias from "./Tecnologias";
import Spline from '@splinetool/react-spline';
import ProjectCarousel from './ProjectCarousel';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Language translations
const translations = {
  es: {
    title: "JAVIER NAVARRO | DESARROLLADOR WEB",
    portfolio: "PORTFOLIO",
    welcome: "BIENVENIDO A MI PORTFOLIO! HAZ SCROLL PARA VERLO!",
    welcomeMobile: "BIENVENIDO A MI PORTFOLIO! DESLIZA PARA VERLO!",
    howCanIHelp: "¿CÓMO PUEDO AYUDARTE?",
    description: "Soy un desarrollador web especializado en front-end. Mi objetivo es crear interfaces atractivas, accesibles y eficientes, aportando valor real a cada proyecto. Me apasiona aprender nuevas tecnologías y trabajar en equipo para lograr los mejores resultados.",
    passion: "PASIÓN",
    passions: [
      'Desarrollo de interfaces',
      'UX/UI',
      'Accesibilidad web',
      'Responsive Design',
      'Animaciones e interactividad',
      'Optimización de rendimiento',
      'Trabajo en equipo'
    ],
    technologies: "TECNOLOGÍAS",
    projects: "Proyectos",
    projectsClick: "Haz clic para ver los proyectos",
    projectsClickMobile: "Pulsa para ver los proyectos",
    contact: "Contacto",
    copyright: "© 2024 Javier Navarro. Todos los derechos reservados.",
    menu: {
      intro: "Introducción",
      projects: "Proyectos",
      contact: "Contacto"
    },
    carousel: {
      close: "Cerrar",
      next: "Siguiente",
      previous: "Anterior",
      viewProject: "Ver proyecto",
      viewCode: "Ver código"
    }
  },
  en: {
    title: "JAVIER NAVARRO | WEB DEVELOPER",
    portfolio: "PORTFOLIO",
    welcome: "WELCOME TO MY PORTFOLIO! SCROLL TO SEE IT!",
    welcomeMobile: "WELCOME TO MY PORTFOLIO! SWIPE TO SEE IT!",
    howCanIHelp: "HOW CAN I HELP YOU?",
    description: "I am a web developer specialized in front-end. My goal is to create attractive, accessible and efficient interfaces, bringing real value to each project. I am passionate about learning new technologies and working in a team to achieve the best results.",
    passion: "PASSION",
    passions: [
      'Interface Development',
      'UX/UI',
      'Web Accessibility',
      'Responsive Design',
      'Animations & Interactivity',
      'Performance Optimization',
      'Teamwork'
    ],
    technologies: "TECHNOLOGIES",
    projects: "Projects",
    projectsClick: "Click to see the projects",
    projectsClickMobile: "Tap to see the projects",
    contact: "Contact",
    copyright: "© 2024 Javier Navarro. All rights reserved.",
    menu: {
      intro: "Introduction",
      projects: "Projects",
      contact: "Contact"
    },
    carousel: {
      close: "Close",
      next: "Next",
      previous: "Previous",
      viewProject: "View Project",
      viewCode: "View code"
    }
  }
};

function App() {
  const [modalProyecto, setModalProyecto] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoadingSpline, setIsLoadingSpline] = useState(true);
  const [showMinimumLoadTime, setShowMinimumLoadTime] = useState(true);
  const [language, setLanguage] = useState('es');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef(null);

  const t = translations[language];

  const closeModal = () => setModalProyecto(null);

  const handleSplineLoad = () => {
    setIsLoadingSpline(false);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  useEffect(() => {
    // Añadir un pequeño retraso para asegurar que el scroll funcione en móviles
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100); // Pequeño retraso de 100ms

    // Limpiar el timer si el componente se desmonta
    return () => clearTimeout(timer);
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar

  useEffect(() => {
    document.title = "Javier Navarro | Desarrollador Web";
  }, []);

  // Efecto para detectar tamaño de pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      // Consideramos 'móvil' si el ancho es menor o igual a 768px (breakpoint md de Tailwind)
      setIsMobile(window.innerWidth <= 768);
    };

    // Ejecutar al montar el componente
    checkScreenSize();

    // Añadir listener para redimensionamiento
    window.addEventListener('resize', checkScreenSize);

    // Limpiar listener al desmontar el componente
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []); // Se ejecuta solo una vez al montar y limpiar al desmontar

  useEffect(() => {
    // Efecto para asegurar un tiempo mínimo de visualización del indicador de carga
    const minLoadTimer = setTimeout(() => {
      setShowMinimumLoadTime(false);
    }, 500); // Muestra el indicador por al menos 500ms

    // Limpiar el timer
    return () => clearTimeout(minLoadTimer);
  }, []); // Se ejecuta solo una vez al montar

  // Determinar si se debe mostrar el indicador de carga
  const shouldShowLoadingIndicator = isLoadingSpline || showMinimumLoadTime;

  const isMobileScreen = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;

  // Cerrar el menú de idioma al hacer clic fuera
  useEffect(() => {
    if (!isLanguageMenuOpen) return;
    function handleClickOutside(event) {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
        setIsLanguageMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLanguageMenuOpen]);

  return (
    <div className="min-h-screen bg-[#edeadd] dark:bg-gray-900 flex flex-col items-center py-8 transition-colors duration-300">
      {/* Botón de tema oscuro y selector de idioma */}
      <div
        className={
          isMobileScreen
            ? 'fixed bottom-10 left-4 z-50 flex flex-col items-start space-y-3 sm:space-y-4 md:top-4 md:right-4 md:bottom-auto md:left-auto md:flex-row md:items-center md:space-x-4 md:space-y-0'
            : 'fixed top-4 right-4 z-50 flex items-center space-x-4'
        }
        ref={languageMenuRef}
      >
        {/* Language Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
            className={
              isMobileScreen
                ? 'w-14 h-14 rounded-full overflow-hidden shadow-lg bg-white dark:bg-gray-800 flex items-center justify-center p-0'
                : 'w-12 h-12 rounded-full overflow-hidden shadow-lg bg-white dark:bg-gray-800 flex items-center justify-center p-0 hover:shadow-xl transition-all duration-300'
            }
          >
            <img
              src={language === 'es' ? "https://flagcdn.com/w40/es.png" : "https://flagcdn.com/w40/gb.png"}
              alt={language === 'es' ? "Español" : "English"}
              className="w-7 h-7 rounded-full ml-1"
            />
            <svg
              className={`w-8 h-8 ml-1 text-gray-500 transition-transform duration-300 ${isLanguageMenuOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {/* Dropdown Menu */}
          {isLanguageMenuOpen && (
            <div className={`absolute ${isMobileScreen ? 'left-0 bottom-full mb-2' : 'right-0 mt-2'} w-12 bg-white dark:bg-gray-800 rounded-full overflow-hidden shadow-2xl z-50 flex flex-col items-center p-0`}>
              {language !== 'es' && (
                <button
                  onClick={() => {
                    setLanguage('es');
                    setIsLanguageMenuOpen(false);
                  }}
                  className="flex items-center justify-center w-full py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <img src="https://flagcdn.com/w40/es.png" alt="Español" className="w-8 h-8 rounded-full" />
                </button>
              )}
              {language !== 'en' && (
                <button
                  onClick={() => {
                    setLanguage('en');
                    setIsLanguageMenuOpen(false);
                  }}
                  className="flex items-center justify-center w-full py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <img src="https://flagcdn.com/w40/gb.png" alt="English" className="w-8 h-8 rounded-full" />
                </button>
              )}
            </div>
          )}
        </div>
        {/* Dark Mode Button */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={
            isMobileScreen
              ? 'relative w-14 h-14 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center cursor-pointer transition-all duration-500 hover:scale-110 active:scale-95'
              : 'relative w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center cursor-pointer transition-all duration-500 hover:scale-110 hover:rotate-12 active:scale-95'
          }
          aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 transition-transform duration-500 ${isDarkMode ? 'translate-y-0' : 'translate-y-full'}`}></div>
          </div>
          <div className="relative z-10 w-6 h-6 flex items-center justify-center">
            {isDarkMode ? (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </div>
        </button>
      </div>

      {/* Menú minimalista */}
      <nav className="w-full max-w-5xl flex justify-center mb-8 pr-0 pl-0">
        <ul className="flex space-x-10 text-gray-700 dark:text-gray-300 text-base font-medium tracking-wide w-full justify-center items-center text-center">
          <li>
            <a href="#como-ayudarte" className="relative group hover:text-black dark:hover:text-white transition-colors duration-200">
              <span className="relative z-10">{t.menu.intro}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a href="#proyectos" className="relative group hover:text-black dark:hover:text-white transition-colors duration-200">
              <span className="relative z-10">{t.menu.projects}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a href="#contacto" className="relative group hover:text-black dark:hover:text-white transition-colors duration-200">
              <span className="relative z-10">{t.menu.contact}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
        </ul>
      </nav>
      {/* Fin menú minimalista */}

      {/* Menú superior minimalista (antiguo) */}
      <header className="w-full max-w-5xl mb-8 hidden md:block">
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span className="tracking-widest">01</span>
          <span className="tracking-widest">MAIN PAGE</span>
        </div>
        <div className="border-t border-gray-300 dark:border-gray-700 w-full mb-2" />
      </header>

      {/* Caja central */}
      <main className="w-full max-w-5xl bg-white/60 dark:bg-gray-800/60 rounded-2xl border border-gray-300 dark:border-gray-700 shadow-md p-8 md:p-16 flex flex-col items-center transform transition-all duration-500 hover:shadow-xl hover:scale-[1.01] main-section animate-fade-in-scale" data-aos="fade-up">
        {/* Sección 2: Título y Subtítulo */}
        <section className="w-full flex flex-col items-center mb-12 text-center" data-aos="fade-up" data-aos-offset="200">
          <span className="text-2xl font-bold tracking-widest text-gray-700 dark:text-gray-300 mb-2 bounce-on-hover">{t.title}</span>
          <div className="title-with-reflection">
            <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-none mb-2 wiggle-on-hover">{t.portfolio}</h1>
          </div>
        </section>

        {/* Sección 1: Robot de bienvenida */}
        <section className="w-full flex flex-col items-center justify-center min-h-[30vh] mb-6" data-aos="fade-up" data-aos-offset="100">
          <div className="flex-shrink-0 flex items-center justify-center relative">
            <div style={{
              width: 400,
              height: 400,
              maxWidth: '80vw',
              maxHeight: '80vw',
              position: 'relative',
            }}>
              {/* Indicador de carga mientras el Spline carga */}
              {shouldShowLoadingIndicator && (
                <div style={{
                  position: 'absolute', 
                  inset: 0, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  backgroundColor: '#edeadd', // Color de fondo similar a la página
                  color: '#333', // Color de texto
                  zIndex: 5 // Asegura que esté encima del Spline mientras carga
                }}>
                  Cargando Robot...
                </div>
              )}

              {/* Renderizar Spline siempre para iniciar la carga, ocultarlo si se debe mostrar el indicador */}
              <Spline
                scene="https://prod.spline.design/ZY6f65Za3BSGmQH9/scene.splinecode"
                onLoad={handleSplineLoad} // Llama a esta función al cargar
                style={{ visibility: shouldShowLoadingIndicator ? 'hidden' : 'visible' }} // Oculta el Spline si se muestra el indicador
              />

              {/* Mostrar el bocadillo solo después de que el Spline haya cargado COMPLETAMENTE */}
              {!isLoadingSpline && (
                <div className="speech-bubble"><span className="typing-text">{isMobile ? t.welcomeMobile : t.welcome}</span></div>
              )}
            </div>
          </div>
        </section>

        {/* Sección 3: ¿CÓMO PUEDO AYUDARTE? y descripción */}
        <section id="como-ayudarte" className="w-full mb-8 scroll-mt-40" data-aos="fade-up" data-aos-offset="300">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight bounce-on-hover text-center">{t.howCanIHelp}</h2>
          <div className="text-gray-700 dark:text-gray-300 text-lg text-center max-w-2xl mx-auto">
            {t.description}
          </div>
        </section>

        {/* Sección 5: Pasiones */}
        <section className="w-full mb-8" data-aos="fade-up" data-aos-offset="500">
          <h3 className="font-bold mb-4 text-2xl text-gray-800 dark:text-gray-200 text-center transition-all duration-300 ease-in-out hover:scale-105 hover:rotate-3">{t.passion}</h3>
          <ul className="text-sm space-y-1 flex flex-wrap justify-center gap-4">
            {t.passions.map((passion) => (
              <li key={passion} className="px-6 py-3 border-2 border-gray-700 dark:border-gray-600 bg-gray-900 dark:bg-gray-800 text-white rounded-full transition-all duration-400 ease-in-out hover:border-gray-500 hover:bg-gray-800 h-12 flex items-center justify-center hover:scale-105 active:scale-95">{passion}</li>
            ))}
          </ul>
        </section>

        {/* Sección 6: Proyectos */}
        <section id="proyectos" className="w-full flex flex-col items-center justify-center flex-1 main-section opacity-0 scroll-mt-40" data-aos="fade-up" data-aos-offset="550">
          <div
            className="flex flex-col items-center justify-center w-full min-h-[300px] cursor-pointer select-none transition-transform duration-300 hover:scale-105 text-center border-4 border-black dark:border-white bg-white dark:bg-gray-800 p-8 md:p-16 aspect-square sm:aspect-video transform-gpu will-change-transform active:scale-95"
            onClick={() => setShowCarousel(true)}
          >
            <h2 className="text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight drop-shadow-lg transform-gpu will-change-transform transition-transform duration-300 hover:scale-105">{t.projects}</h2>
            <span className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 font-medium transform-gpu will-change-transform transition-transform duration-300 hover:scale-105">
              {isMobile ? t.projectsClickMobile : t.projectsClick}
            </span>
          </div>
        </section>

        {/* Sección 7: Tecnologías */}
        <div data-aos="fade-up" data-aos-offset="560" className="mt-2 sm:mt-5">
          <Tecnologias language={language} />
        </div>

        {/* Sección 8: Contacto */}
        <section id="contacto" className="w-full flex flex-col items-center scroll-mt-24 main-section mt-10" data-aos="fade-up" data-aos-offset="580">
          <div>
            <h2 className="text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight drop-shadow-lg transform transition-all duration-300 hover:scale-105 wiggle-on-hover">{t.contact}</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mt-4 mb-16">
            <a
              href="https://wa.me/34693744798"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-20 h-20 flex items-center justify-center transform transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="WhatsApp"
            >
              <div className="absolute inset-0 bg-green-500 rounded-full transform transition-transform duration-300 group-hover:scale-110"></div>
              <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full transform transition-transform duration-300 group-hover:scale-90"></div>
              <svg className="w-8 h-8 text-green-500 relative z-10 transform transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">WhatsApp</span>
            </a>
            <a
              href="https://github.com/JavierNavarro12"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-20 h-20 flex items-center justify-center transform transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="GitHub"
            >
              <div className="absolute inset-0 bg-gray-700 dark:bg-gray-600 rounded-full transform transition-transform duration-300 group-hover:scale-110"></div>
              <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full transform transition-transform duration-300 group-hover:scale-90"></div>
              <svg className="w-8 h-8 text-gray-700 dark:text-gray-300 relative z-10 transform transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/javier-navarro-rodr%C3%ADguez-056023331/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-20 h-20 flex items-center justify-center transform transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="LinkedIn"
            >
              <div className="absolute inset-0 bg-blue-600 rounded-full transform transition-transform duration-300 group-hover:scale-110"></div>
              <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full transform transition-transform duration-300 group-hover:scale-90"></div>
              <svg className="w-8 h-8 text-blue-600 relative z-10 transform transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">LinkedIn</span>
            </a>
            <a
              href="mailto:navarrojavi107@gmail.com"
              className="group relative w-20 h-20 flex items-center justify-center transform transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Gmail"
            >
              <div className="absolute inset-0 bg-red-500 rounded-full transform transition-transform duration-300 group-hover:scale-110"></div>
              <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full transform transition-transform duration-300 group-hover:scale-90"></div>
              <svg className="w-8 h-8 text-red-500 relative z-10 transform transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 20v-9.99l7.99 7.99c.39.39 1.02.39 1.41 0L20 10.01V20H4z" />
              </svg>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Gmail</span>
            </a>
            <a
              href="/CV-Javier-Navarro.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-20 h-20 flex items-center justify-center transform transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Currículum Vitae"
            >
              <div className="absolute inset-0 bg-blue-800 dark:bg-blue-700 rounded-full transform transition-transform duration-300 group-hover:scale-110"></div>
              <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full transform transition-transform duration-300 group-hover:scale-90"></div>
              <svg className="w-8 h-8 text-blue-800 dark:text-blue-300 relative z-10 transform transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM6 20V4h7v4h4v12H6z" />
              </svg>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Currículum</span>
            </a>
          </div>

          {/* Añadir espacio extra para scroll */}
          <div className="my-[100px]"></div>

        </section>

      </main>

      {/* Footer minimalista */}
      <footer className="w-full max-w-5xl mx-auto mt-8 py-6 flex flex-col md:flex-row items-center justify-between border-t border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm">
        <span className="mb-2 md:mb-0">{t.copyright}</span>
        <div className="flex space-x-6">
          <a
            href="https://github.com/JavierNavarro12"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white transition-colors duration-200"
            aria-label="GitHub"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
          <a
            href="https://wa.me/34693744798"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-600 transition-colors duration-200"
            aria-label="WhatsApp"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/javier-navarro-rodr%C3%ADguez-056023331/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-900 dark:hover:text-blue-300 transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </footer>

      {/* Modal de vista previa - moved outside main for proper stacking */}
      {modalProyecto && (
        <div className="modal-preview" onClick={closeModal}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 max-w-3xl w-full relative" onClick={e => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-2xl font-bold"
              aria-label="Cerrar"
            >
              ×
            </button>
            <div className="w-full h-[60vh] flex items-center justify-center">
              <iframe
                src={modalProyecto.previewUrl}
                title={modalProyecto.titulo}
                className="w-full h-full border-0 rounded-lg"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock allow-top-navigation"
              />
            </div>
            <div className="text-center mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">{modalProyecto.titulo}</div>
          </div>
        </div>
      )}

      {/* Renderizar el ProjectCarousel si showCarousel es true */}
      {showCarousel && <ProjectCarousel onClose={() => setShowCarousel(false)} language={language} translations={translations[language].carousel} />}
    </div>
  );
}

export default App;