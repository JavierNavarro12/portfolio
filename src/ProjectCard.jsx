import React, { useState, useEffect } from 'react';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaJava, FaPython, FaFigma, FaGithub, FaTrello, FaGitAlt } from "react-icons/fa";
import { SiNextdotjs, SiPostgresql, SiMysql, SiTypescript, SiFirebase, SiTailwindcss } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";
import { BsCodeSlash } from "react-icons/bs";

const iconMap = {
  HTML: <FaHtml5 color="#e34c26" />,
  CSS: <FaCss3Alt color="#264de4" />,
  "Tailwind CSS": <SiTailwindcss color="#38bdf8" />,
  JavaScript: <FaJs color="#f0db4f" />,
  TypeScript: <SiTypescript color="#3178c6" />,
  React: <FaReact color="#61dafb" />,
  "Next.js": <SiNextdotjs color="#000" />,
  Java: <FaJava color="#007396" />,
  Python: <FaPython color="#306998" />,
  Figma: <FaFigma color="#a259ff" />,
  GitHub: <FaGithub color="#333" />,
  Git: <FaGitAlt color="#f34f29" />,
  Firebase: <SiFirebase color="#FFCA28" />,
  APIs: <BsCodeSlash color="#4CAF50" />,
  PostgreSQL: <SiPostgresql color="#336791" />,
  MySQL: <SiMysql color="#00758f" />,
  Trello: <FaTrello color="#0079bf" />,
};

const colorPalette = [
  "142, 249, 252",
  "142, 252, 204",
  "142, 252, 157",
  "215, 252, 142",
  "252, 252, 142",
  "252, 208, 142",
  "252, 142, 142",
  "252, 142, 239",
  "204, 142, 252",
  "142, 202, 252"
];

const techBgColor = {
  HTML: '#fff3e0', // naranja claro
  CSS: '#e3f0ff', // azul claro
  JavaScript: '#fffde7', // amarillo claro
  TypeScript: '#e0f2ff', // azul claro
  React: '#e0f7fa', // celeste claro
  'Next.js': '#f3f4f6', // gris claro
  Java: '#e0ecff', // azul muy claro
  Python: '#e0f2f1', // verde agua claro
  Figma: '#f3e8ff', // violeta claro
  GitHub: '#f4f4f4', // gris claro
  Git: '#ffe8e6', // rojo claro
  Firebase: '#fff8e1', // amarillo claro
  APIs: '#e8f5e8', // verde claro
  PostgreSQL: '#e8f0fe', // azul claro
  MySQL: '#e0f7fa', // celeste claro
  Trello: '#e3f2fd', // azul claro
  "Tailwind CSS": '#e0f2fe', // celeste claro
};
const techTextColor = {
  HTML: '#e34c26',
  CSS: '#264de4',
  "Tailwind CSS": '#38bdf8',
  JavaScript: '#eab308',
  TypeScript: '#3178c6',
  React: '#0ea5e9',
  'Next.js': '#222',
  Java: '#007396',
  Python: '#306998',
  Figma: '#a259ff',
  GitHub: '#333',
  Git: '#f34f29',
  Firebase: '#FFCA28',
  APIs: '#4CAF50',
  PostgreSQL: '#336791',
  MySQL: '#00758f',
  Trello: '#0079bf',
};

function ProjectCard({
  proyecto,
  index,
  isSelected,
  onCardClick,
  onCloseCard,
  language,
  translations
}) {
  const cardStyle = {
    '--index': index,
    '--color-card': colorPalette[index % colorPalette.length],
    zIndex: isSelected ? 200 : 'auto', // Asegura que la tarjeta seleccionada esté al frente
  };
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  useEffect(() => {
    setIframeLoaded(false);
    setIframeError(false);
    // Fallback por timeout si el iframe no carga
    const timeout = setTimeout(() => {
      if (!iframeLoaded) setIframeError(true);
    }, 500);
    return () => clearTimeout(timeout);
  }, [proyecto.previewUrl, proyecto.id, iframeLoaded]);

  return (
    <div
      key={proyecto.id || index} // Usar un ID único si está disponible, si no, el índice
      className={`card ${isSelected ? 'selected' : ''}`}
      style={cardStyle}
      onClick={() => !isSelected && onCardClick(index)}
    >
      {isSelected ? (
        <div className="card-content compact-project-card" onClick={(e) => e.stopPropagation()}>
          {/* Botón de cerrar tipo Uiverse */}
          <button
            className="close-btn"
            onClick={(e) => { e.stopPropagation(); onCloseCard(); }}
            aria-label={translations.close}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="preview-iframe compact-preview" style={{ position: 'relative' }}>
            {!iframeLoaded && !iframeError && (
              <div className="skeleton-preview" />
            )}
            {!iframeError ? (
              <iframe
                src={proyecto.previewUrl}
                title={proyecto.titulo[language]}
                className="w-full h-full border-0 rounded-lg"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock allow-top-navigation"
                style={{ position: 'relative', zIndex: 1 }}
                onLoad={() => setIframeLoaded(true)}
                onError={() => setIframeError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-0 m-0">
                <img
                  src={proyecto.imagenPreview}
                  alt={proyecto.titulo[language]}
                  className="w-full h-full object-cover rounded-lg"
                  style={{ background: '#f3f4f6', width: '100%', height: '100%', margin: 0, padding: 0 }}
                />
              </div>
            )}
          </div>
          <div className="project-title compact-title">{proyecto.titulo[language]}</div>
          <div className="project-desc compact-desc">{proyecto.descripcion[language]}</div>
          <div className="tech-list compact-tech-list">
            {proyecto.tecnologias &&
              proyecto.tecnologias.map((tec) => (
                <span
                  key={tec}
                  style={{
                    background: techBgColor[tec] || '#f3f4f6',
                    color: techTextColor[tec] || '#222',
                    border: `1.5px solid ${techTextColor[tec] || '#bbb'}`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                    fontWeight: 600,
                  }}
                  className="flex items-center gap-1 px-3 py-1 rounded-full text-xs shadow-sm"
                >
                  <span className="text-base" style={{ color: techTextColor[tec] || '#222' }}>{iconMap[tec]}</span>
                  {tec}
                </span>
              ))}
          </div>
          <div className="action-buttons compact-action-buttons">
            <a
              href={proyecto.codigoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-action-btn"
            >
              <FaGithub className="w-6 h-6 mr-2" />
              {translations.viewCode || 'Ver código'}
            </a>
            <a
              href={proyecto.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-action-btn"
            >
              <FiExternalLink className="w-6 h-6 mr-2" />
              {translations.viewProject}
            </a>
          </div>
        </div>
      ) : (
        <div className="w-full h-full rounded-lg overflow-hidden shadow-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
          <img
            src={proyecto.imagenPreview}
            alt={proyecto.titulo[language]}
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}

export default ProjectCard; 