import React, { useRef, useLayoutEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { gsap } from '../hooks/useGSAP';
import proyectos from '../data/proyectos';

const destacados = proyectos.slice(0, 4);

function Projects({ onOpenProject }) {
  const { t, language } = useLanguage();
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('h2, .project-tile', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 55%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="proyectos"
      ref={sectionRef}
      className="w-full mb-16 main-section scroll-mt-24"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight text-center">
        {t.projects}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {destacados.map((proyecto, index) => (
          <button
            key={proyecto.id}
            type="button"
            onClick={(e) => onOpenProject(index, e.currentTarget)}
            className="project-tile group text-left bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <img
                src={proyecto.imagenPreview}
                alt={proyecto.titulo[language]}
                loading="lazy"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{proyecto.titulo[language]}</h3>
              <p className="text-gray-700 dark:text-gray-300 line-clamp-2 mb-3">{proyecto.descripcion[language]}</p>
              <div className="flex flex-wrap gap-2">
                {proyecto.tecnologias.slice(0, 4).map((tec) => (
                  <span
                    key={tec}
                    className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  >
                    {tec}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          type="button"
          onClick={(e) => onOpenProject(null, e.currentTarget)}
          className="project-tile inline-flex items-center justify-center min-h-[44px] px-6 py-3 rounded-full border-2 border-gray-900 text-gray-900 dark:border-white dark:text-white font-semibold hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors"
        >
          {t.viewAllProjects} ({proyectos.length})
        </button>
      </div>
    </section>
  );
}

export default Projects;
