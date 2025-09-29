import React, { useState, useEffect, useRef, Suspense } from "react";
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
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import { useScreenSize } from "./hooks/useScreenSize";
import 'aos/dist/aos.css';

function AppContent() {
  const [showCarousel, setShowCarousel] = useState(false);
  const isMobile = useScreenSize(768);
  const comoAyudarteRef = useRef(null);
  const { language, t } = useLanguage();

  // Inicializar AOS
  useEffect(() => {
    import('aos').then(AOS => {
      AOS.init({ duration: 1000, once: false });
    });
  }, []);

  // Establecer título del documento
  useEffect(() => {
    document.title = "Javier Navarro | Desarrollador Web";
  }, []);

  return (
    <div className="min-h-screen bg-[#edeadd] dark:bg-gray-900 flex flex-col items-center py-8 transition-colors duration-300">
      {/* Controles flotantes */}
      <FloatingControls />

      {/* Navegación */}
      <Navigation />

      {/* Caja central */}
      <main className="w-full max-w-5xl bg-white/60 dark:bg-gray-800/60 rounded-2xl border border-gray-300 dark:border-gray-700 shadow-md p-8 md:p-16 flex flex-col items-center transform transition-all duration-500 hover:shadow-xl hover:scale-[1.01] main-section animate-fade-in-scale" {...(!isMobile && { 'data-aos': 'fade-up' })}>
        
        {/* Hero: Título y Robot */}
        <Hero isMobile={isMobile} scrollTargetRef={comoAyudarteRef} />

        {/* About: ¿Cómo puedo ayudarte? */}
        <About ref={comoAyudarteRef} isMobile={isMobile} />

        {/* Passions */}
        <Passions isMobile={isMobile} />

        {/* Tecnologías */}
        <div className="mt-2 sm:mt-5">
          <TechCarousel language={language} translations={t} isMobile={isMobile} />
        </div>

        {/* Proyectos */}
        <Projects onShowCarousel={() => setShowCarousel(true)} isMobile={isMobile} />

        {/* Contacto */}
        <Contact isMobile={isMobile} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Carrusel de proyectos */}
      {showCarousel && (
        <Suspense fallback={null}>
          <ProjectCarousel 
            onClose={() => setShowCarousel(false)} 
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
