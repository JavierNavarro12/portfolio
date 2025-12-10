import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/**
 * Animación de texto letra por letra
 */
export function splitTextAnimation(element, options = {}) {
  const {
    duration = 0.05,
    stagger = 0.03,
    ease = 'power2.out',
    from = { opacity: 0, y: 20 },
  } = options;

  if (!element) return null;

  const text = element.textContent;
  element.textContent = '';
  
  const chars = text.split('').map((char) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    element.appendChild(span);
    return span;
  });

  return gsap.from(chars, {
    ...from,
    duration,
    stagger,
    ease,
  });
}

// Exportar gsap y ScrollTrigger para uso directo
export { gsap, ScrollTrigger };
