import React, { useState, useEffect, useRef, Suspense, useCallback } from "react";
import TechCarousel from "./TechCarousel";
import ProjectCarousel from "./ProjectCarousel";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Passions from "./components/Passions";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingControls from "./components/FloatingControls";
import ScrollProgress from "./components/ScrollProgress";
import ProjectsTransition from "./components/ProjectsTransition";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import { useScreenSize } from "./hooks/useScreenSize";
import { ScrollTrigger } from "./hooks/useGSAP";

function AppContent() {
  const [showCarousel, setShowCarousel] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isMobile = useScreenSize(768);
  const comoAyudarteRef = useRef(null);
  const mainRef = useRef(null);
  const projectsCardRef = useRef(null);
  const transitionRef = useRef(null);
  const { language, t } = useLanguage();

  // Inicializar GSAP ScrollTrigger
  useEffect(() => {
    ScrollTrigger.refresh();
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Establecer título del documento
  useEffect(() => {
    if (t?.title) {
      document.title = t.title;
    }
  }, [t]);

  // Función para abrir el carrusel con transición
  const handleOpenCarousel = useCallback(async () => {
    if (isTransitioning) return;
    
    if (!projectsCardRef.current || !transitionRef.current) {
      setShowCarousel(true);
      document.body.style.overflow = 'hidden';
      return;
    }

    setIsTransitioning(true);
    document.body.style.overflow = 'hidden';

    const cardRect = projectsCardRef.current.getBoundingClientRect();

    // Animar: expande desde la tarjeta hasta pantalla completa
    await transitionRef.current.enter(cardRect);

    // Mostrar carrusel PRIMERO (debajo del overlay)
    setShowCarousel(true);
    
    // Esperar a que React renderice el carrusel completamente
    await new Promise(resolve => requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    }));
    
    // Ahora ocultar el overlay (el carrusel ya está visible debajo)
    transitionRef.current.hide();
    
    setIsTransitioning(false);
  }, [isTransitioning]);

  // Función para cerrar el carrusel con transición
  const handleCloseCarousel = useCallback(async () => {
    if (isTransitioning) return;
    
    if (!projectsCardRef.current || !transitionRef.current) {
      setShowCarousel(false);
      document.body.style.overflow = '';
      return;
    }

    setIsTransitioning(true);

    const cardRect = projectsCardRef.current.getBoundingClientRect();

    // Ocultar carrusel primero
    setShowCarousel(false);

    // Animar: contrae desde pantalla completa hasta la tarjeta
    await transitionRef.current.exit(cardRect);

    document.body.style.overflow = '';
    setIsTransitioning(false);
  }, [isTransitioning]);

  return (
    <div className="min-h-screen bg-[#edeadd] dark:bg-gray-900 flex flex-col items-center py-8 transition-colors duration-300">
      {/* Controles flotantes */}
      <FloatingControls />

      {/* Indicador de progreso del scroll */}
      {!isMobile && <ScrollProgress />}

      {/* Navegación */}
      <Navigation />

      {/* Caja central */}
      <main 
        ref={mainRef}
        className="w-full max-w-5xl bg-white/60 dark:bg-gray-800/60 rounded-2xl border border-gray-300 dark:border-gray-700 shadow-md p-8 md:p-16 flex flex-col items-center transform transition-all duration-500 hover:shadow-xl hover:scale-[1.01] main-section"
      >
        
        {/* Hero: Título y Robot */}
        <Hero isMobile={isMobile} scrollTargetRef={comoAyudarteRef} />

        {/* About: ¿Cómo puedo ayudarte? */}
        <About ref={comoAyudarteRef} isMobile={isMobile} />

        {/* Passions */}
        <Passions />

        {/* Tecnologías */}
        <div className="mt-2 sm:mt-5">
          <TechCarousel language={language} translations={t} />
        </div>

        {/* Proyectos */}
        <Projects 
          onShowCarousel={handleOpenCarousel} 
          isMobile={isMobile}
          cardRef={projectsCardRef}
        />

        {/* Contacto */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Componente de transición cinematográfica */}
      <ProjectsTransition ref={transitionRef} />

      {/* Carrusel de proyectos */}
      {showCarousel && (
        <Suspense fallback={null}>
          <ProjectCarousel 
            onClose={handleCloseCarousel} 
            language={language} 
            translations={t.carousel} 
          />
        </Suspense>
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
