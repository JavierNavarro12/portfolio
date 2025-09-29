import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function Projects({ onShowCarousel, isMobile }) {
  const { t } = useLanguage();

  return (
    <section 
      id="proyectos" 
      className="w-full flex flex-col items-center justify-center flex-1 main-section scroll-mt-24" 
      data-aos="fade-up" 
      data-aos-offset={isMobile ? "150" : "550"}
    >
      <div
        className="flex flex-col items-center justify-center w-full min-h-[240px] md:max-h-[420px] cursor-pointer select-none transition-transform duration-300 hover:scale-105 text-center border-4 border-black dark:border-white bg-white dark:bg-gray-800 p-6 md:p-12 aspect-square sm:aspect-[2/1] transform-gpu will-change-transform active:scale-95"
        onClick={onShowCarousel}
      >
        <h2 className="text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight drop-shadow-lg transform-gpu will-change-transform transition-transform duration-300 hover:scale-105">
          {t.projects}
        </h2>
        <span className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 font-medium transform-gpu will-change-transform transition-transform duration-300 hover:scale-105">
          {isMobile ? t.projectsClickMobile : t.projectsClick}
        </span>
      </div>
    </section>
  );
}

export default Projects;
