import React, { useRef, useEffect, useState, useMemo, useLayoutEffect } from 'react';
import { tecnologias } from './Tecnologias';
import { gsap } from './hooks/useGSAP';

// Unimos todas las tecnologías en un solo array y eliminamos duplicados por nombre
const allTechsRaw = [
  ...tecnologias.frontend,
  ...tecnologias.backend,
  ...tecnologias.database,
  ...tecnologias.tools,
];
const allTechs = allTechsRaw.filter((item, idx, arr) =>
  arr.findIndex(t => t.nombre === item.nombre) === idx
);

// Divide el array en 3 filas lo más equilibradas posible
function splitInRows(arr, numRows) {
  const rows = Array.from({ length: numRows }, () => []);
  arr.forEach((item, idx) => {
    rows[idx % numRows].push(item);
  });
  return rows;
}

const techRows = splitInRows(allTechs, 3);
const directions = ['left', 'right', 'left'];

export default function TechCarousel({ language = 'es', translations }) {
  const title = translations?.technologies || (language === 'en' ? 'Technologies' : 'Tecnologías');
  
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const rowRefs = useRef([]);

  // Animaciones GSAP de entrada
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animación del título con clip-path reveal
      gsap.from(titleRef.current, {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 0,
        duration: 1,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animación de entrada de cada fila con fade in simple
      rowRefs.current.forEach((row, index) => {
        if (!row) return;
        
        gsap.from(row, {
          opacity: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full my-16 flex flex-col items-center tech-carousel-section"
    >
      <h2 
        ref={titleRef}
        className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-900 dark:text-white tech-title"
        style={{ clipPath: 'inset(0 0% 0 0)' }}
      >
        {title}
      </h2>
      <div className="w-full max-w-5xl mx-auto">
        <div className="relative w-full flex flex-col overflow-hidden">
          {/* Overlay izquierdo global */}
          <div 
            className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10 fade-left"
          />
          {/* Overlay derecho global */}
          <div 
            className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10 fade-right"
          />
          {techRows.map((row, i) => (
            <div 
              key={i} 
              ref={el => rowRefs.current[i] = el}
              className="tech-row"
            >
              <CarouselRow techs={row} direction={directions[i]} />
            </div>
          ))}
          <style>{`
            .fade-left {
              background: linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
            }
            .fade-right {
              background: linear-gradient(to left, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
            }
            .dark .fade-left {
              background: linear-gradient(to right, rgba(31, 41, 55, 1) 0%, rgba(31, 41, 55, 0) 100%);
            }
            .dark .fade-right {
              background: linear-gradient(to left, rgba(31, 41, 55, 1) 0%, rgba(31, 41, 55, 0) 100%);
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}

function CarouselRow({ techs, direction }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [duration, setDuration] = useState(30);
  const [isPaused, setIsPaused] = useState(false);
  const [baseWidth, setBaseWidth] = useState(0);
  const [repeatCount, setRepeatCount] = useState(2);

  const repeatedItems = useMemo(() => {
    const repeats = Math.max(repeatCount, 2);
    const sequence = [];
    for (let cycle = 0; cycle < repeats; cycle += 1) {
      techs.forEach((item, idx) => {
        sequence.push({
          item,
          key: `${item.nombre}-${cycle}-${idx}`,
        });
      });
    }
    return sequence;
  }, [techs, repeatCount]);

  useEffect(() => {
    const SPEED_PX_PER_SEC = 80;

    const updateMetrics = () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const containerWidth = container.offsetWidth;
    const repeats = Math.max(repeatCount, 1);
    const totalWidth = track.scrollWidth;
    if (containerWidth === 0 || totalWidth === 0) return;

    const singleCycleWidth = totalWidth / repeats;
    if (!Number.isFinite(singleCycleWidth) || singleCycleWidth === 0) return;

    const desiredRepeats = Math.max(2, Math.ceil((containerWidth * 2) / singleCycleWidth));
    if (desiredRepeats !== repeatCount) {
      setRepeatCount(desiredRepeats);
      return;
    }

    const newDuration = Math.max(singleCycleWidth / SPEED_PX_PER_SEC, 12);
    setDuration(prev => (Math.abs(prev - newDuration) > 0.1 ? newDuration : prev));
    setBaseWidth(prev => (Math.abs(prev - singleCycleWidth) > 1 ? singleCycleWidth : prev));
    };

    updateMetrics();

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(() => updateMetrics());
      if (trackRef.current) observer.observe(trackRef.current);
      if (containerRef.current) observer.observe(containerRef.current);
      return () => observer.disconnect();
    } else {
      window.addEventListener('resize', updateMetrics);
      return () => window.removeEventListener('resize', updateMetrics);
    }
  }, [techs, repeatCount]);

  const handlePauseStart = () => setIsPaused(true);
  const handlePauseEnd = () => setIsPaused(false);
  const isReady = baseWidth > 0;

  return (
    <div
      ref={containerRef}
      className="overflow-hidden w-full my-0 min-h-[90px] py-2"
      onMouseEnter={handlePauseStart}
      onMouseLeave={handlePauseEnd}
      onTouchStart={handlePauseStart}
      onTouchEnd={handlePauseEnd}
      onTouchCancel={handlePauseEnd}
    >
      <div
        ref={trackRef}
        className={`inline-flex items-center ${direction === 'left' ? 'animate-carousel-left' : 'animate-carousel-right'}`}
        style={{
          width: 'max-content',
          animationDuration: `${duration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
          animationPlayState: isPaused || !isReady ? 'paused' : 'running',
          willChange: 'transform',
          '--marquee-translate': `${baseWidth}px`
        }}
      >
        {repeatedItems.map(({ item, key }) => (
          <a
            key={key}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl px-4 py-3 shadow hover:scale-110 transition-transform border border-gray-200 dark:border-gray-700 min-w-[90px] sm:min-w-[110px] max-w-[140px] cursor-pointer mx-2 flex-shrink-0"
            title={item.nombre}
          >
            <span className="text-3xl mb-1">{item.icono}</span>
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap text-center">{item.nombre}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
