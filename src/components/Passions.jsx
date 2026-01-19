import React, { useRef, useLayoutEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { gsap } from '../hooks/useGSAP';

function Passions() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const pillsRef = useRef([]);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animación del título con rotación 3D
      gsap.from(titleRef.current, {
        opacity: 0,
        rotateX: -90,
        y: -30,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 55%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animación de "explosión" de las pills
      // Primero todas se colocan en el centro
      pillsRef.current.forEach((pill, index) => {
        if (!pill) return;
        
        // Calcular rotación aleatoria entre -15 y 15 grados
        const rotation = (Math.random() - 0.5) * 30;

        gsap.from(pill, {
          opacity: 0,
          scale: 0,
          x: 0,
          y: 0,
          rotation: rotation * 2,
          duration: 0.8,
          delay: index * 0.08,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        });

        // Efecto de "respiración" continua para cada pill
        gsap.to(pill, {
          y: Math.random() * 6 - 3,
          rotation: rotation * 0.5,
          duration: 2 + Math.random(),
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: index * 0.1,
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [t.passions]);

  // Efecto de focus cuando se hace hover en una pill
  const handlePillHover = (index) => {
    pillsRef.current.forEach((pill, i) => {
      if (!pill) return;
      
      if (i === index) {
        gsap.to(pill, {
          scale: 1.1,
          zIndex: 10,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(pill, {
          opacity: 0.4,
          filter: 'blur(2px)',
          scale: 0.95,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    });
  };

  const handlePillLeave = () => {
    pillsRef.current.forEach((pill) => {
      if (!pill) return;
      
      gsap.to(pill, {
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        zIndex: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="w-full mb-16 pt-8 relative overflow-visible"
    >
      <h3 
        ref={titleRef}
        className="font-bold mb-6 text-2xl text-gray-800 dark:text-gray-200 text-center"
        style={{ perspective: '1000px' }}
      >
        {t.passion}
      </h3>
      
      <ul className="text-sm flex flex-wrap justify-center gap-4 relative">
        {t.passions.map((passion, index) => (
          <li 
            key={passion}
            ref={el => pillsRef.current[index] = el}
            className="passion-pill px-6 py-3 border-2 border-gray-700 dark:border-gray-600 bg-gray-900 dark:bg-gray-800 text-white rounded-full cursor-pointer h-12 flex items-center justify-center select-none"
            onMouseEnter={() => handlePillHover(index)}
            onMouseLeave={handlePillLeave}
            style={{
              willChange: 'transform, opacity, filter',
              transformStyle: 'preserve-3d',
            }}
          >
            {passion}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Passions;
