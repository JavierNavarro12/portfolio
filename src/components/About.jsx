import React, { forwardRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const About = forwardRef(({ isMobile }, ref) => {
  const { t } = useLanguage();

  return (
    <section 
      id="como-ayudarte" 
      ref={ref} 
      className="w-full mb-8 scroll-mt-24" 
      data-aos="fade-up" 
      data-aos-offset={isMobile ? "250" : "300"}
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight bounce-on-hover text-center" data-aos="fade-up">
        {t.howCanIHelp}
      </h2>
      <div className="text-gray-700 dark:text-gray-300 text-lg text-center max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
        {t.description}
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;
