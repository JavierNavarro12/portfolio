import { useState, useEffect } from 'react';

/**
 * Hook para cargar Spline dinámicamente
 * @param {boolean} isMobile - Si es móvil, no carga Spline
 * @returns {Object} { SplineComponent, isLoading, showLoadingIndicator }
 */
export function useSpline(isMobile) {
  const [SplineComponent, setSplineComponent] = useState(null);
  const [isLoadingSpline, setIsLoadingSpline] = useState(true);
  const [showMinimumLoadTime, setShowMinimumLoadTime] = useState(true);

  // Cargar Spline solo en desktop
  useEffect(() => {
    if (!isMobile) {
      import('@splinetool/react-spline').then(mod => {
        setSplineComponent(() => mod.default);
      });
    } else {
      setSplineComponent(null);
      setIsLoadingSpline(false);
    }
  }, [isMobile]);

  // Tiempo mínimo de carga
  useEffect(() => {
    const minLoadTimer = setTimeout(() => {
      setShowMinimumLoadTime(false);
    }, 500);

    return () => clearTimeout(minLoadTimer);
  }, []);

  const handleSplineLoad = () => {
    setIsLoadingSpline(false);
  };

  const shouldShowLoadingIndicator = isLoadingSpline || showMinimumLoadTime;

  return {
    SplineComponent,
    isLoadingSpline,
    shouldShowLoadingIndicator,
    handleSplineLoad
  };
}
