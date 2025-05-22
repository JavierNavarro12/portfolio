import React from 'react';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaJava, FaPython, FaFigma, FaGithub, FaTrello } from "react-icons/fa";
import { SiNextdotjs, SiPostgresql, SiMysql } from "react-icons/si";

const iconMap = {
  HTML: <FaHtml5 color="#e34c26" />,
  CSS: <FaCss3Alt color="#264de4" />,
  JavaScript: <FaJs color="#f0db4f" />,
  React: <FaReact color="#61dafb" />,
  "Next.js": <SiNextdotjs color="#000" />,
  Java: <FaJava color="#007396" />,
  Python: <FaPython color="#306998" />,
  Figma: <FaFigma color="#a259ff" />,
  GitHub: <FaGithub color="#333" />,
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

function ProjectCard({
  proyecto,
  index,
  isSelected,
  onCardClick,
  onCloseCard,
}) {
  const cardStyle = {
    '--index': index,
    '--color-card': colorPalette[index % colorPalette.length],
    zIndex: isSelected ? 200 : 'auto', // Asegura que la tarjeta seleccionada esté al frente
  };

  return (
    <div
      key={proyecto.id || index} // Usar un ID único si está disponible, si no, el índice
      className={`card ${isSelected ? 'selected' : ''}`}
      style={cardStyle}
      onClick={() => !isSelected && onCardClick(index)}
    >
      {isSelected ? (
        <div className="card-content" onClick={(e) => e.stopPropagation()}>
          {/* Botón de cerrar tipo Uiverse */}
          <button
            className="close-btn"
            onClick={(e) => { e.stopPropagation(); onCloseCard(); }}
            aria-label="Cerrar"
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
          <div className="preview-iframe">
            <iframe
              src={proyecto.previewUrl}
              title={proyecto.titulo}
              className="w-full h-full border-0 rounded-lg"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock allow-top-navigation"
            />
          </div>
          <div className="project-title">{proyecto.titulo}</div>
          <div className="project-desc">{proyecto.descripcion}</div>
          <div className="tech-list">
            {proyecto.tecnologias &&
              proyecto.tecnologias.map((tec) => (
                <span
                  key={tec}
                  className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full text-xs font-medium text-gray-700 dark:text-gray-200 shadow-sm"
                >
                  <span className="text-base">{iconMap[tec]}</span>
                  {tec}
                </span>
              ))}
          </div>
          <div className="action-buttons">
            <a
              href={proyecto.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-semibold text-[#444] dark:text-gray-300 border border-[#d1d5db] dark:border-gray-600 rounded-lg px-5 py-2 bg-[#f3f3f3] dark:bg-gray-700 hover:bg-[#e0e0e0] dark:hover:bg-gray-600 transition-colors duration-200 text-center cursor-pointer"
            >
              Ver proyecto
            </a>
            <a
              href={proyecto.codigoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-semibold text-[#444] dark:text-gray-300 border border-[#d1d5db] dark:border-gray-600 rounded-lg px-5 py-2 bg-[#f3f3f3] dark:bg-gray-700 hover:bg-[#e0e0e0] dark:hover:bg-gray-600 transition-colors duration-200 text-center cursor-pointer"
            >
              Ver código
            </a>
          </div>
        </div>
      ) : (
        <div className="w-full h-full rounded-lg overflow-hidden shadow-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
          <img
            src={proyecto.imagenPreview}
            alt={proyecto.titulo}
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}

export default ProjectCard; 