import React, { useState, useRef, useLayoutEffect } from "react";
import proyectos from './proyectos';
import ProjectCard from './ProjectCard';
import { gsap } from './hooks/useGSAP';

function ProjectCarousel({ onClose, language, translations }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [paused, setPaused] = useState(false);
  
  const containerRef = useRef(null);
  const backButtonRef = useRef(null);
  const carouselRef = useRef(null);

  // Animación de entrada del carrusel (sutil, sin fade del contenedor)
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animación del botón de volver
      gsap.from(backButtonRef.current, {
        opacity: 0,
        x: -30,
        duration: 0.4,
        delay: 0.1,
        ease: 'power2.out',
      });

      // Animación del carrusel 3D (sutil)
      gsap.from(carouselRef.current, {
        scale: 0.95,
        duration: 0.4,
        delay: 0.05,
        ease: 'power2.out',
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (index) => {
    setSelectedCard(index);
    setPaused(true);
  };

  const handleCloseCard = () => {
    setSelectedCard(null);
    setPaused(false);
  };

  // Cerrar directamente (la transición de App.jsx se encarga de la animación)
  const handleClose = () => {
    onClose();
  };

  const selectedIndex = selectedCard;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#101624] flex flex-col items-center justify-center min-h-screen w-full"
    >
      <button
        ref={backButtonRef}
        className="fixed top-8 left-8 flex items-center gap-2 px-5 py-2.5 bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg text-gray-700 dark:text-gray-200 font-semibold text-base hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 backdrop-blur-md cursor-pointer z-[110]"
        style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.10)' }}
        onClick={handleClose}
        tabIndex={0}
        aria-label={language === 'es' ? 'Volver al portfolio' : 'Back to portfolio'}
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        {language === 'es' ? 'Volver' : 'Back'}
      </button>
      
      <div 
        ref={carouselRef}
        className={`wrapper fullscreen-carousel${paused ? ' paused' : ''}${selectedCard !== null ? ' has-selected' : ''}`} 
        style={{ 
          '--quantity': proyectos.length, 
          minHeight: '100vh', 
          height: '100vh', 
          width: '100vw',
        }}
      >
        <div className="inner">
          {proyectos.map((proyecto, index) => (
            selectedIndex === index ? null : (
              <ProjectCard 
                key={proyecto.id || index}
                proyecto={proyecto}
                index={index}
                isSelected={selectedIndex === index}
                onCardClick={handleCardClick}
                onCloseCard={handleCloseCard}
                language={language}
                translations={translations}
              />
            )
          ))}
        </div>
        {selectedIndex !== null && (
          <ProjectCard 
            key={proyectos[selectedIndex].id || selectedIndex}
            proyecto={proyectos[selectedIndex]}
            index={selectedIndex}
            isSelected={true}
            onCardClick={handleCardClick}
            onCloseCard={handleCloseCard}
            language={language}
            translations={translations}
          />
        )}
      </div>
    </div>
  );
}

export default ProjectCarousel;
