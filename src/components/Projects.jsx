import React, { useRef, useLayoutEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { gsap } from '../hooks/useGSAP';

function Projects({ onShowCarousel, isMobile, cardRef }) {
  const { t } = useLanguage();
  
  const sectionRef = useRef(null);
  const internalCardRef = useRef(null);
  
  // Usar el ref externo si se proporciona, sino usar el interno
  const actualCardRef = cardRef || internalCardRef;
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const linesRef = useRef([]);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Crear líneas decorativas que convergen
      const linePositions = [
        { x: -100, y: -50, rotation: 45 },
        { x: 100, y: -50, rotation: -45 },
        { x: -100, y: 50, rotation: -45 },
        { x: 100, y: 50, rotation: 45 },
      ];

      // Animación de las líneas convergiendo
      linesRef.current.forEach((line, index) => {
        if (!line) return;
        
        const pos = linePositions[index];
        
        gsap.from(line, {
          x: pos.x * 3,
          y: pos.y * 3,
          opacity: 0,
          scaleX: 0,
          duration: 1,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Animación de la tarjeta principal - scale y rotación 3D
      gsap.from(actualCardRef.current, {
        scale: 0.5,
        rotateY: -15,
        rotateX: 10,
        opacity: 0,
        duration: 1.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animación del título con efecto dramático
      gsap.from(titleRef.current, {
        scale: 0.3,
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.3,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animación del subtítulo con pulso
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      });

      // Efecto de pulso continuo en el subtítulo
      gsap.to(subtitleRef.current, {
        scale: 1.05,
        duration: 1.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1,
      });

      // Efecto hover mejorado con GSAP
      const card = actualCardRef.current;
      
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.05,
          rotateY: 5,
          rotateX: -5,
          boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
          duration: 0.4,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          rotateY: 0,
          rotateX: 0,
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          duration: 0.4,
          ease: 'power2.out',
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };

    }, sectionRef);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section 
      id="proyectos"
      ref={sectionRef}
      className="w-full flex flex-col items-center justify-center flex-1 main-section scroll-mt-24 relative"
      style={{ perspective: '1000px' }}
    >
      {/* Líneas decorativas convergentes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            ref={el => linesRef.current[i] = el}
            className="absolute top-1/2 left-1/2 w-32 h-1 bg-gradient-to-r from-gray-900 to-transparent dark:from-white dark:to-transparent"
            style={{
              transformOrigin: 'center',
              transform: `translate(-50%, -50%) rotate(${[45, -45, -45, 45][i]}deg) translateX(${[-100, 100, -100, 100][i]}px) translateY(${[-50, -50, 50, 50][i]}px)`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      <div
        ref={actualCardRef}
        className="projects-card flex flex-col items-center justify-center w-full min-h-[240px] md:max-h-[420px] cursor-pointer select-none text-center border-4 border-black dark:border-white bg-white dark:bg-gray-800 p-6 md:p-12 aspect-square sm:aspect-[2/1]"
        onClick={onShowCarousel}
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        }}
      >
        <h2 
          ref={titleRef}
          className="text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight drop-shadow-lg"
        >
          {t.projects}
        </h2>
        <span 
          ref={subtitleRef}
          className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 font-medium"
        >
          {isMobile ? t.projectsClickMobile : t.projectsClick}
        </span>
      </div>
    </section>
  );
}

export default Projects;
