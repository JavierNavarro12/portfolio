import React, { useRef, useEffect, useState } from 'react';
import { tecnologias } from './Tecnologias';

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
  // Obtener el título traducido
  const title = translations?.technologies || (language === 'en' ? 'Technologies' : 'Tecnologías');
  return (
    <section className="w-full my-16 flex flex-col items-center" data-aos="fade-up">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-900 dark:text-white">{title}</h2>
      <div className="w-full max-w-5xl mx-auto">
        <div className="relative w-full flex flex-col">
          {/* Overlay izquierdo global */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-20 z-10 fade-gradient"
               style={{background: 'linear-gradient(to right, var(--fade-gradient, rgba(255,255,255,0.85)) 60%, transparent 100%)'}}
          />
          {/* Overlay derecho global */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-20 z-10 fade-gradient"
               style={{background: 'linear-gradient(to left, var(--fade-gradient, rgba(255,255,255,0.85)) 60%, transparent 100%)'}}
          />
          {techRows.map((row, i) => (
            <CarouselRow key={i} techs={row} direction={directions[i]} />
          ))}
          <style>{`
            .fade-gradient {
              --fade-gradient: rgba(255,255,255,0.85);
            }
            .dark .fade-gradient {
              --fade-gradient: rgba(26,32,44,0.85);
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}

function CarouselRow({ techs, direction }) {
  const containerRef = useRef(null);
  const [items, setItems] = useState(techs);
  const [isPaused, setIsPaused] = useState(false);
  const speed = 1; // px por frame
  const GAP = 16; // px, igual que el gap visual entre tarjetas

  useEffect(() => {
    let animationId;
    const container = containerRef.current;
    if (!container) return;

    function animate() {
      if (!isPaused) {
        if (direction === 'left') {
          container.scrollLeft += speed;
          const first = container.firstChild;
          if (first && first.getBoundingClientRect().right <= container.getBoundingClientRect().left - GAP) {
            const width = first.offsetWidth + GAP;
            setItems(prev => {
              const newItems = [...prev.slice(1), prev[0]];
              setTimeout(() => {
                container.scrollLeft -= width;
              }, 0);
              return newItems;
            });
          }
        } else {
          container.scrollLeft -= speed;
          const last = container.lastChild;
          if (last && last.getBoundingClientRect().left >= container.getBoundingClientRect().right + GAP) {
            const width = last.offsetWidth + GAP;
            setItems(prev => {
              const newItems = [prev[prev.length - 1], ...prev.slice(0, -1)];
              setTimeout(() => {
                container.scrollLeft += width;
              }, 0);
              return newItems;
            });
          }
        }
      }
      animationId = requestAnimationFrame(animate);
    }
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused, direction]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden w-full my-0 min-h-[90px] py-2"
      style={{ whiteSpace: 'nowrap', display: 'flex' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {items.map((tec, idx) => (
        <a
          key={tec.nombre + idx}
          href={tec.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl px-4 py-3 shadow hover:scale-110 transition-transform border border-gray-200 dark:border-gray-700 min-w-[90px] sm:min-w-[110px] max-w-[140px] cursor-pointer mx-2"
          title={tec.nombre}
        >
          <span className="text-3xl mb-1">{tec.icono}</span>
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap text-center">{tec.nombre}</span>
        </a>
      ))}
    </div>
  );
} 