import React, { Suspense } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSpline } from '../hooks/useSpline';
import { useScrollVisibility } from '../hooks/useScrollVisibility';

function Hero({ isMobile, scrollTargetRef }) {
  const { t } = useLanguage();
  const { 
    SplineComponent, 
    shouldShowLoadingIndicator, 
    handleSplineLoad 
  } = useSpline(isMobile);
  const showScrollDown = useScrollVisibility(scrollTargetRef);

  return (
    <>
      {/* Sección 2: Título y Subtítulo */}
      <section className="w-full flex flex-col items-center mb-12 text-center" data-aos="fade-up">
        <span className="text-2xl font-bold tracking-widest text-gray-700 dark:text-gray-300 mb-2 bounce-on-hover" data-aos="fade-up" data-aos-delay="100">
          {t.title}
        </span>
        <div>
          <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-none mb-2 wiggle-on-hover" data-aos="fade-up" data-aos-delay="200">
            {t.portfolio}
          </h1>
        </div>
      </section>

      {/* Sección 1: Robot de bienvenida */}
      <section className="w-full flex flex-col items-center justify-center min-h-[30vh] mb-20" data-aos="fade-up" data-aos-offset="100">
        <div className="flex-shrink-0 flex items-center justify-center relative">
          <div style={{
            width: 400,
            height: 400,
            maxWidth: '80vw',
            maxHeight: '80vw',
            position: 'relative',
          }}>
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
                    style={{ visibility: shouldShowLoadingIndicator ? 'hidden' : 'visible' }}
                  />
                </Suspense>
              )
            )}

            {/* Bocadillo de texto */}
            {((!shouldShowLoadingIndicator && !isMobile) || isMobile) && (
              <div style={{
                position: 'absolute',
                bottom: isMobile ? '5%' : '-14%',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1.5rem',
                minHeight: '80px'
              }}>
                <div className="speech-bubble" style={{position: 'relative'}}>
                  <span className="typing-text">{isMobile ? t.welcomeMobile : t.welcome}</span>
                </div>
                <div 
                  className="scroll-down alt" 
                  aria-label="Scroll down" 
                  style={{
                    position: 'relative', 
                    bottom: 'auto', 
                    left: 'auto', 
                    transform: 'none',
                    visibility: showScrollDown ? 'visible' : 'hidden'
                  }}
                >
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
