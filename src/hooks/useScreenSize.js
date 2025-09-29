import { useState, useEffect } from 'react';

/**
 * Hook personalizado para detectar el tamaño de pantalla
 * @param {number} breakpoint - Punto de corte en píxeles (default: 768)
 * @returns {boolean} isMobile - true si la pantalla es menor o igual al breakpoint
 */
export function useScreenSize(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize, { passive: true });
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [breakpoint]);

  return isMobile;
}
