import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { gsap } from '../hooks/useGSAP';

/**
 * Componente de transición simple para entrar en la sección de proyectos.
 * Un rectángulo que se expande desde la tarjeta hasta cubrir toda la pantalla.
 */
const ProjectsTransition = forwardRef((props, ref) => {
  const frameRef = useRef(null);

  useImperativeHandle(ref, () => ({
    // Animación de entrada: expande desde la tarjeta hasta pantalla completa
    enter: (cardRect) => {
      return new Promise((resolve) => {
        const frame = frameRef.current;
        if (!frame) {
          resolve();
          return;
        }

        // Matar cualquier animación anterior
        gsap.killTweensOf(frame);

        // Configurar posición inicial (tamaño y posición de la tarjeta)
        gsap.set(frame, {
          display: 'block',
          position: 'fixed',
          left: cardRect.left,
          top: cardRect.top,
          width: cardRect.width,
          height: cardRect.height,
          borderRadius: '16px',
          opacity: 1,
        });

        // Animar hasta cubrir toda la pantalla
        gsap.to(frame, {
          left: 0,
          top: 0,
          width: '100vw',
          height: '100vh',
          borderRadius: '0px',
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: resolve,
        });
      });
    },

    // Ocultar el overlay (el carrusel ya está visible con su propio fondo)
    hide: () => {
      const frame = frameRef.current;
      if (frame) {
        gsap.set(frame, { display: 'none' });
      }
    },

    // Animación de salida: contrae desde pantalla completa hasta la tarjeta
    exit: (cardRect) => {
      return new Promise((resolve) => {
        const frame = frameRef.current;
        if (!frame) {
          resolve();
          return;
        }

        // Matar cualquier animación anterior
        gsap.killTweensOf(frame);

        // Configurar posición inicial (pantalla completa)
        gsap.set(frame, {
          display: 'block',
          position: 'fixed',
          left: 0,
          top: 0,
          width: '100vw',
          height: '100vh',
          borderRadius: '0px',
          opacity: 1,
        });

        // Animar hasta el tamaño de la tarjeta
        gsap.to(frame, {
          left: cardRect.left,
          top: cardRect.top,
          width: cardRect.width,
          height: cardRect.height,
          borderRadius: '16px',
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.set(frame, { display: 'none' });
            resolve();
          },
        });
      });
    },
  }));

  return (
    <div
      ref={frameRef}
      className="bg-[#101624] z-[200]"
      style={{ display: 'none' }}
    />
  );
});

ProjectsTransition.displayName = 'ProjectsTransition';

export default ProjectsTransition;
