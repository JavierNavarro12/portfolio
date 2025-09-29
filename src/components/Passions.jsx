import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function Passions({ isMobile }) {
  const { t } = useLanguage();

  return (
    <section 
      className="w-full mb-8" 
      data-aos="fade-up" 
      data-aos-offset={isMobile ? "150" : "500"}
    >
      <h3 className="font-bold mb-4 text-2xl text-gray-800 dark:text-gray-200 text-center transition-all duration-300 ease-in-out hover:scale-105 hover:rotate-3" data-aos="fade-up">
        {t.passion}
      </h3>
      <ul className="text-sm space-y-1 flex flex-wrap justify-center gap-4">
        {t.passions.map((passion, index) => (
          <li 
            key={passion} 
            className="px-6 py-3 border-2 border-gray-700 dark:border-gray-600 bg-gray-900 dark:bg-gray-800 text-white rounded-full transition-all duration-400 ease-in-out hover:border-gray-500 hover:bg-gray-800 h-12 flex items-center justify-center hover:scale-105 active:scale-95" 
            data-aos="fade-up" 
            data-aos-delay={100 * (index + 1)}
          >
            {passion}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Passions;
