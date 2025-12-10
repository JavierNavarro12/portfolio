import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '../hooks/useGSAP';

// Definido fuera del componente para evitar re-creación
const SECTIONS = [
  { id: 'hero', label: 'Inicio' },
  { id: 'como-ayudarte', label: 'Sobre mí' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'contacto', label: 'Contacto' },
];

/**
 * Indicador de progreso del scroll que muestra en qué sección está el usuario.
 * Aparece como una línea vertical con puntos en el lateral derecho.
 */
function ScrollProgress() {
  const progressRef = useRef(null);
  const lineRef = useRef(null);
  const dotsRef = useRef([]);
  const [activeSection, setActiveSection] = useState(0);

  useLayoutEffect(() => {
    if (!progressRef.current) return;

    const ctx = gsap.context(() => {
      // Animación de entrada del indicador
      gsap.from(progressRef.current, {
        opacity: 0,
        x: 50,
        duration: 1,
        delay: 2,
        ease: 'power3.out',
      });

      // Animar la línea de progreso basada en el scroll
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });

      // Detectar sección activa
      SECTIONS.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (!element && section.id !== 'hero') return;

        ScrollTrigger.create({
          trigger: section.id === 'hero' ? document.body : element,
          start: section.id === 'hero' ? 'top top' : 'top center',
          end: section.id === 'hero' ? '20% top' : 'bottom center',
          onEnter: () => setActiveSection(index),
          onEnterBack: () => setActiveSection(index),
        });
      });

    }, progressRef);

    return () => ctx.revert();
  }, []);

  // Actualizar estilos de los puntos cuando cambia la sección activa
  useLayoutEffect(() => {
    dotsRef.current.forEach((dot, index) => {
      if (!dot) return;

      if (index === activeSection) {
        gsap.to(dot, {
          scale: 1.5,
          backgroundColor: '#1f2937',
          duration: 0.3,
          ease: 'back.out(1.7)',
        });
      } else if (index < activeSection) {
        gsap.to(dot, {
          scale: 1,
          backgroundColor: '#6b7280',
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(dot, {
          scale: 1,
          backgroundColor: '#d1d5db',
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    });
  }, [activeSection]);

  const scrollToSection = (sectionId) => {
    const element = sectionId === 'hero' 
      ? document.body 
      : document.getElementById(sectionId);
    
    if (element) {
      gsap.to(window, {
        scrollTo: { y: sectionId === 'hero' ? 0 : element, offsetY: 100 },
        duration: 1,
        ease: 'power3.inOut',
      });
    }
  };

  return (
    <div
      ref={progressRef}
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-1"
      style={{ height: '200px' }}
    >
      {/* Línea de fondo */}
      <div className="absolute inset-0 w-0.5 bg-gray-200 dark:bg-gray-700 rounded-full left-1/2 transform -translate-x-1/2" />
      
      {/* Línea de progreso */}
      <div
        ref={lineRef}
        className="absolute top-0 w-0.5 bg-gray-900 dark:bg-white rounded-full left-1/2 transform -translate-x-1/2 origin-top"
        style={{ 
          height: '100%',
          scaleY: 0,
        }}
      />

      {/* Puntos de las secciones */}
      <div className="relative flex flex-col justify-between h-full py-2">
        {SECTIONS.map((section, index) => (
          <button
            key={section.id}
            ref={el => dotsRef.current[index] = el}
            onClick={() => scrollToSection(section.id)}
            className="group relative w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 transition-colors cursor-pointer hover:scale-125"
            style={{ zIndex: 10 }}
            aria-label={`Ir a ${section.label}`}
          >
            {/* Tooltip */}
            <span className="absolute right-6 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {section.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ScrollProgress;
