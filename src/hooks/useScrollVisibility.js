import { useState, useEffect } from 'react';

/**
 * Hook para manejar la visibilidad de elementos al hacer scroll
 * @param {Object} targetRef - Referencia al elemento objetivo
 * @param {number} threshold - Porcentaje de viewport (default: 0.85)
 * @returns {boolean} isVisible
 */
export function useScrollVisibility(targetRef, threshold = 0.85) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * threshold) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [targetRef, threshold]);

  return isVisible;
}
