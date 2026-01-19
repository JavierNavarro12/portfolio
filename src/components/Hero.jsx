import React, { Suspense, useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSpline } from '../hooks/useSpline';
import { useScrollVisibility } from '../hooks/useScrollVisibility';
import { gsap } from '../hooks/useGSAP';

function Hero({ isMobile, scrollTargetRef }) {
  const { t, language } = useLanguage();
  const { 
    SplineComponent, 
    shouldShowLoadingIndicator, 
    handleSplineLoad 
  } = useSpline(isMobile);
  const showScrollDown = useScrollVisibility(scrollTargetRef);

  // Refs para animaciones GSAP
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const portfolioRef = useRef(null);
  const robotContainerRef = useRef(null);
  const speechBubbleRef = useRef(null);
  
  // Estado para las letras del título (evita manipular DOM directamente)
  const [titleChars, setTitleChars] = useState([]);
  const hasAnimated = useRef(false);

  // Preparar las letras del título
  useEffect(() => {
    if (t.title) {
      setTitleChars(t.title.split(''));
    }
  }, [t.title]);

  useEffect(() => {
    hasAnimated.current = false;
  }, [language]);

  // Animaciones GSAP - solo se ejecuta UNA vez cuando las letras están listas
  useLayoutEffect(() => {
    if (!heroRef.current || hasAnimated.current || titleChars.length === 0) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      // Timeline principal para la entrada
      const tl = gsap.timeline({ 
        defaults: { ease: 'power3.out' }
      });

      // Animación del título letra por letra
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.title-char');
        if (chars.length > 0) {
          tl.to(chars, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.08,
            stagger: 0.02,
            ease: 'back.out(1.7)',
          }, 0.2);
        }
      }

      // Animación de "PORTFOLIO" con scale elástico
      if (portfolioRef.current) {
        tl.to(portfolioRef.current, {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1.2,
          ease: 'elastic.out(1, 0.5)',
        }, 0.6);
      }

      // Animación del robot - "aterrizaje" desde arriba
      if (robotContainerRef.current) {
        tl.to(robotContainerRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'bounce.out',
        }, 1);
      }

      // Animación del bocadillo (al mismo tiempo que el robot)
      if (speechBubbleRef.current) {
        tl.to(speechBubbleRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          x: '0%',
          ease: 'back.out(2)',
        }, 1);
      }

    }, heroRef);

    return () => ctx.revert();
  }, [titleChars, language]);

  return (
    <div ref={heroRef}>
      {/* Sección: Título y Subtítulo */}
      <section className="w-full flex flex-col items-center mb-12 text-center">
        <span 
          ref={titleRef}
          className="text-2xl font-bold tracking-widest text-gray-700 dark:text-gray-300 mb-2 bounce-on-hover hero-title"
        >
          {titleChars.map((char, index) => (
            <span 
              key={index} 
              className="title-char"
              style={{ 
                display: 'inline-block',
                opacity: 0,
                transform: 'translateY(30px) rotateX(90deg)',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
        <div>
          <h1 
            ref={portfolioRef}
            className="text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-none mb-2 wiggle-on-hover hero-portfolio"
            style={{ opacity: 0, transform: 'scale(0.3) rotateY(-15deg)' }}
          >
            {t.portfolio}
          </h1>
        </div>
      </section>

      {/* Sección: Robot de bienvenida */}
      <section 
        className="w-full flex flex-col items-center justify-center min-h-[30vh] mb-20"
      >
        <div 
          ref={robotContainerRef}
          className="flex flex-col items-center justify-center"
          style={{
            width: 400,
            height: 400,
            maxWidth: '80vw',
            maxHeight: '80vw',
            position: 'relative',
            opacity: 0,
            transform: 'translateY(-100px) scale(0.8)',
          }}
        >
          {/* Indicador de carga mientras el Spline carga */}
          {shouldShowLoadingIndicator && !isMobile && (
            <div style={{
              position: 'absolute', 
              inset: 0, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              backgroundColor: '#edeadd',
              color: '#333',
              zIndex: 5
            }}>
              Cargando Robot...
            </div>
          )}

          {/* Mostrar imagen estática en móvil, Spline en escritorio */}
          {isMobile ? (
            <img
              src="/robot-static.png"
              alt="Robot de bienvenida"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          ) : (
            SplineComponent && (
              <Suspense fallback={null}>
                <SplineComponent
                  scene="https://prod.spline.design/ZY6f65Za3BSGmQH9/scene.splinecode"
                  onLoad={handleSplineLoad}
                  style={{ 
                    visibility: shouldShowLoadingIndicator ? 'hidden' : 'visible',
                    pointerEvents: 'none'
                  }}
                />
              </Suspense>
            )
          )}

          {/* Bocadillo de texto - Posicionado para tapar "built with spline" */}
          <div 
            ref={speechBubbleRef}
            className="flex flex-col items-center justify-center gap-6"
            style={{
              position: 'absolute',
              bottom: isMobile ? '5%' : '-10%',
              left: '50%',
              transform: 'translateX(-50%) scale(0)',
              opacity: 0,
              zIndex: 20,
            }}
          >
            <div className="speech-bubble">
              <span className="typing-text">{isMobile ? t.welcomeMobile : t.welcome}</span>
            </div>
            <div 
              className="scroll-down alt" 
              aria-label="Scroll down" 
              style={{
                position: 'relative', 
                bottom: 'auto', 
                left: 'auto', 
                visibility: showScrollDown ? 'visible' : 'hidden'
              }}
            >
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
