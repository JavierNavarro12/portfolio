import React, { useState, useEffect } from "react";
import Tecnologias from "./Tecnologias";
import Spline from '@splinetool/react-spline';
import ProjectCarousel from './ProjectCarousel';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [modalProyecto, setModalProyecto] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const closeModal = () => setModalProyecto(null);

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

  return (
    <div className="min-h-screen bg-[#edeadd] dark:bg-gray-900 flex flex-col items-center py-8 transition-colors duration-300">
      {/* Botón de tema oscuro */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center cursor-pointer transition-all duration-500 hover:scale-110 hover:rotate-12 active:scale-95"
          aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 transition-transform duration-500 ${isDarkMode ? 'translate-y-0' : 'translate-y-full'}`}></div>
          </div>
          <div className="relative z-10 w-6 h-6 flex items-center justify-center">
            {isDarkMode ? (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </div>
        </button>
      </div>

      {/* Menú minimalista */}
      <nav className="w-full max-w-5xl flex justify-center mb-8 pr-20 pl-4 sm:pr-0 sm:pl-0">
        <ul className="flex space-x-10 text-gray-700 dark:text-gray-300 text-base font-medium tracking-wide">
          <li>
            <a href="#introduccion" className="relative group hover:text-black dark:hover:text-white transition-colors duration-200">
              <span className="relative z-10">Introducción</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a href="#proyectos" className="relative group hover:text-black dark:hover:text-white transition-colors duration-200">
              <span className="relative z-10">Proyectos</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a href="#contacto" className="relative group hover:text-black dark:hover:text-white transition-colors duration-200">
              <span className="relative z-10">Contacto</span>
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
        {/* Sección 1: Robot de bienvenida */}
        <section className="w-full flex flex-col items-center justify-center min-h-[40vh] mb-12" data-aos="fade-up" data-aos-offset="100">
          <div className="flex-shrink-0 flex items-center justify-center relative">
            <div style={{
              width: 400,
              height: 400,
              maxWidth: '80vw',
              maxHeight: '80vw',
              position: 'relative',
            }}>
              <>
                <Spline scene="https://prod.spline.design/ZY6f65Za3BSGmQH9/scene.splinecode" />
                <div className="speech-bubble"><span className="typing-text">{isMobile ? 'BIENVENIDO A MI PORTFOLIO! DESLIZA PARA VERLO!' : 'BIENVENIDO A MI PORTFOLIO! HAZ SCROLL PARA VERLO!'}</span></div>
              </>
            </div>
          </div>
        </section>

        {/* Sección 2: Título y Subtítulo */}
        <section className="w-full flex flex-col items-center mb-12 text-center" data-aos="fade-up" data-aos-offset="200">
          <span className="text-2xl font-bold tracking-widest text-gray-700 dark:text-gray-300 mb-2 bounce-on-hover">JAVIER NAVARRO | DESARROLLADOR WEB</span>
          <div className="title-with-reflection">
            <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-none mb-2 wiggle-on-hover">PORTFOLIO</h1>
          </div>
        </section>

        {/* Sección 3: ¿CÓMO PUEDO AYUDARTE? y descripción */}
        <section className="w-full mb-8" data-aos="fade-up" data-aos-offset="300">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight bounce-on-hover text-center">¿CÓMO PUEDO AYUDARTE?</h2>
          <div className="text-gray-700 dark:text-gray-300 text-lg text-center max-w-2xl mx-auto">
            Soy un desarrollador web especializado en front-end. Mi objetivo es crear interfaces atractivas, accesibles y eficientes, aportando valor real a cada proyecto. Me apasiona aprender nuevas tecnologías y trabajar en equipo para lograr los mejores resultados.
          </div>
        </section>

        {/* Sección 4: Habilidades */}
        <section className="w-full mb-8" data-aos="fade-up" data-aos-offset="400">
          <h3 className="font-bold mb-4 text-2xl text-gray-800 dark:text-gray-200 text-center transition-all duration-300 ease-in-out hover:scale-105 hover:rotate-3">HABILIDADES</h3>
          <ul className="text-sm space-y-1 flex flex-wrap justify-center gap-4">
            {['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Java', 'Python', 'SQL', 'Git', 'Figma'].map((skill) => (
              <li key={skill} className="px-6 py-3 border-2 border-gray-700 dark:border-gray-600 bg-gray-900 dark:bg-gray-800 text-white rounded-full transition-all duration-400 ease-in-out hover:border-gray-500 hover:bg-gray-800 h-12 flex items-center justify-center hover:scale-105 active:scale-95">{skill}</li>
            ))}
          </ul>
        </section>

        {/* Sección 5: Pasiones */}
        <section className="w-full mb-8" data-aos="fade-up" data-aos-offset="500">
          <h3 className="font-bold mb-4 text-2xl text-gray-800 dark:text-gray-200 text-center transition-all duration-300 ease-in-out hover:scale-105 hover:rotate-3">PASIÓN</h3>
          <ul className="text-sm space-y-1 flex flex-wrap justify-center gap-4">
            {[
              'Desarrollo de interfaces',
              'UX/UI',
              'Accesibilidad web',
              'Responsive Design',
              'Animaciones e interactividad',
              'Optimización de rendimiento',
              'Trabajo en equipo'
            ].map((passion) => (
              <li key={passion} className="px-6 py-3 border-2 border-gray-700 dark:border-gray-600 bg-gray-900 dark:bg-gray-800 text-white rounded-full transition-all duration-400 ease-in-out hover:border-gray-500 hover:bg-gray-800 h-12 flex items-center justify-center hover:scale-105 active:scale-95">{passion}</li>
            ))}
          </ul>
        </section>

        {/* Sección 6: Proyectos */}
        <section id="proyectos" className="w-full flex flex-col items-center justify-center flex-1 main-section opacity-0" data-aos="fade-up" data-aos-offset="550">
          <div
            className="flex flex-col items-center justify-center w-full h-full min-h-[300px] cursor-pointer select-none transition-all duration-500 hover:scale-105 bounce-on-hover text-center"
            onClick={() => setShowCarousel(true)}
          >
            <h2 className="text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight drop-shadow-lg transform transition-all duration-300 hover:scale-105 wiggle-on-hover">Proyectos</h2>
            <span className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 font-medium transform transition-all duration-300 hover:scale-105 tap-on-active">
              {isMobile ? 'Pulsa para ver los proyectos' : 'Haz clic para ver los proyectos'}
            </span>
          </div>
        </section>

        {/* Sección 7: Tecnologías */}
        <div data-aos="fade-up" data-aos-offset="560" className="mt-2 sm:mt-5">
          <Tecnologias />
        </div>

        {/* Sección 8: Contacto */}
        <section id="contacto" className="w-full flex flex-col items-center scroll-mt-24 main-section mt-10" data-aos="fade-up" data-aos-offset="580">
          <div>
            <h2 className="text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight drop-shadow-lg transform transition-all duration-300 hover:scale-105 wiggle-on-hover">Contacto</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mt-4 mb-16">
            <a
              href="https://wa.me/34693744798"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-20 h-20 flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:rotate-12 active:scale-95 bounce-on-hover tap-on-active"
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
              className="group relative w-20 h-20 flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:rotate-12 active:scale-95 wiggle-on-hover tap-on-active"
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
              className="group relative w-20 h-20 flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:rotate-12 active:scale-95 bounce-on-hover tap-on-active"
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
              className="group relative w-20 h-20 flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:rotate-12 active:scale-95 wiggle-on-hover tap-on-active"
              aria-label="Gmail"
            >
              <div className="absolute inset-0 bg-red-500 rounded-full transform transition-transform duration-300 group-hover:scale-110"></div>
              <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full transform transition-transform duration-300 group-hover:scale-90"></div>
              <svg className="w-8 h-8 text-red-500 relative z-10 transform transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 20v-9.99l7.99 7.99c.39.39 1.02.39 1.41 0L20 10.01V20H4z" />
              </svg>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Gmail</span>
            </a>
          </div>

          {/* Añadir espacio extra para scroll */}
          <div className="my-[100px]"></div>

        </section>

      </main>

      {/* Footer minimalista */}
      <footer className="w-full max-w-5xl mx-auto mt-8 py-6 flex flex-col md:flex-row items-center justify-between border-t border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm">
        <span className="mb-2 md:mb-0">© 2024 Javier Navarro. Todos los derechos reservados.</span>
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
      {showCarousel && <ProjectCarousel onClose={() => setShowCarousel(false)} />}
    </div>
  );
}

export default App;