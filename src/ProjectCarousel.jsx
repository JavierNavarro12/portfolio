import React, { useState } from "react";
import proyectos from './proyectos';
import ProjectCard from './ProjectCard';

function ProjectCarousel({ onClose, language, translations }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [paused, setPaused] = useState(false);

  const handleCardClick = (index) => {
    setSelectedCard(index);
    setPaused(true);
  };

  const handleCloseCard = () => {
    setSelectedCard(null);
    setPaused(false);
  };

  // Encuentra el índice de la tarjeta seleccionada (si hay una)
  const selectedIndex = selectedCard;

  return (
    <div className="fixed inset-0 z-50 bg-transparent flex flex-col items-center justify-center min-h-screen w-full">
      {/* <Starfield /> */}
      <button
        className="fixed top-8 left-8 flex items-center gap-2 px-5 py-2.5 bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg text-gray-700 dark:text-gray-200 font-semibold text-base hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 backdrop-blur-md cursor-pointer z-[10000]"
        style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.10)' }}
        onClick={onClose}
        tabIndex={0}
        aria-label={language === 'es' ? 'Volver al portfolio' : 'Back to portfolio'}
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        {language === 'es' ? 'Volver' : 'Back'}
      </button>
      <div className={`wrapper fullscreen-carousel${paused ? ' paused' : ''}${selectedCard !== null ? ' has-selected' : ''}`} style={{ '--quantity': proyectos.length, minHeight: '100vh', height: '100vh', width: '100vw', animation: 'fadeInScale 0.7s' }}>
        <div className="inner">
          {proyectos.map((proyecto, index) => (
            // Renderizar solo las tarjetas que no están seleccionadas dentro del carrusel 3D
            selectedIndex === index ? null : (
                <ProjectCard 
                    key={proyecto.id || index}
                    proyecto={proyecto}
                    index={index}
                    isSelected={selectedIndex === index} // Siempre false aquí para el carrusel 3D
                    onCardClick={handleCardClick}
                    onCloseCard={handleCloseCard} // Este no debería usarse en la vista no seleccionada, pero se pasa por completitud
                    language={language}
                    translations={translations}
                />
            )
          ))}
        </div>
        {/* Renderizar la tarjeta seleccionada fuera del carrusel 3D */}
        {selectedIndex !== null && (
          <ProjectCard 
              key={proyectos[selectedIndex].id || selectedIndex}
              proyecto={proyectos[selectedIndex]}
              index={selectedIndex}
              isSelected={true} // Siempre true para la tarjeta seleccionada
              onCardClick={handleCardClick} // Este no debería usarse en la vista seleccionada, pero se pasa por completitud
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