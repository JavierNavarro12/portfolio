import React, { forwardRef, useRef, useLayoutEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { gsap } from '../hooks/useGSAP';

const About = forwardRef(({ isMobile }, ref) => {
  const { t } = useLanguage();
  
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || isMobile) return;

    const ctx = gsap.context(() => {
      // Configurar el título con máscara
      if (titleRef.current) {
        gsap.set(titleRef.current, {
          clipPath: 'inset(0 100% 0 0)',
          opacity: 1,
        });
      }

      // Configurar la descripción - dividir en palabras
      if (descriptionRef.current) {
        const text = descriptionRef.current.textContent;
        descriptionRef.current.innerHTML = '';
        
        const words = text.split(' ');
        words.forEach((word, index) => {
          const span = document.createElement('span');
          span.textContent = word + ' ';
          span.style.opacity = '0';
          span.style.display = 'inline';
          span.style.transform = 'translateY(20px)';
          span.className = 'about-word';
          descriptionRef.current.appendChild(span);
        });
      }

      // Timeline principal con ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 55%',
          end: 'bottom 45%',
          scrub: 0.5,
          // Pin suave mientras se revela el contenido
        },
      });

      // Reveal del título con máscara
      tl.to(titleRef.current, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.4,
        ease: 'power2.inOut',
      }, 0);

      // Reveal de las palabras de la descripción
      tl.to('.about-word', {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.02,
        ease: 'power2.out',
      }, 0.2);

      // Efecto de "glow" en el título
      tl.to(titleRef.current, {
        textShadow: '0 0 30px rgba(0,0,0,0.1)',
        duration: 0.3,
      }, 0.5);

    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Animación simple para móvil
  useLayoutEffect(() => {
    if (!sectionRef.current || !isMobile) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.set(titleRef.current, {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          textShadow: 'none',
        });
      }

      if (descriptionRef.current) {
        const words = descriptionRef.current.querySelectorAll('.about-word');
        if (words.length > 0) {
          const text = Array.from(words)
            .map((word) => word.textContent)
            .join('')
            .replace(/\s+/g, ' ')
            .trim();
          descriptionRef.current.textContent = text;
        }
      }

      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 55%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section 
      id="como-ayudarte" 
      ref={(node) => {
        sectionRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className="w-full mb-16 scroll-mt-24 relative"
    >
      <div ref={containerRef} className="relative">
        {/* Título con reveal de máscara */}
        <h2 
          ref={titleRef}
          className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight text-center about-title"
          style={{ opacity: isMobile ? 1 : 0 }}
        >
          {t.howCanIHelp}
        </h2>
        
        {/* Descripción con reveal por palabras */}
        <div 
          ref={descriptionRef}
          className="text-gray-700 dark:text-gray-300 text-lg text-center max-w-2xl mx-auto about-description"
        >
          {t.description}
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;
