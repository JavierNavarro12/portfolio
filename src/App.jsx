import React, { useState } from "react";
import proyectos from "./proyectos";
import Tecnologias from "./Tecnologias";

function App() {
  const [modalProyecto, setModalProyecto] = useState(null);

  const openModal = (proyecto) => setModalProyecto(proyecto);
  const closeModal = () => setModalProyecto(null);

  return (
    <div className="min-h-screen bg-[#edeadd] flex flex-col items-center py-8">
      {/* Menú minimalista */}
      <nav className="w-full max-w-5xl flex justify-center mb-8">
        <ul className="flex space-x-10 text-gray-700 text-base font-medium tracking-wide">
          <li>
            <a href="#introduccion" className="hover:underline hover:text-black transition-colors duration-200">Introducción</a>
          </li>
          <li>
            <a href="#proyectos" className="hover:underline hover:text-black transition-colors duration-200">Proyectos</a>
          </li>
          <li>
            <a href="#contacto" className="hover:underline hover:text-black transition-colors duration-200">Contacto</a>
          </li>
        </ul>
      </nav>
      {/* Fin menú minimalista */}

      {/* Menú superior minimalista (antiguo) */}
      <header className="w-full max-w-5xl mb-8">
        <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
          <span className="tracking-widest">01</span>
          <span className="tracking-widest">MAIN PAGE</span>
        </div>
        <div className="border-t border-gray-300 w-full mb-2" />
      </header>

      {/* Caja central */}
      <main className="w-full max-w-5xl bg-white/60 rounded-2xl border border-gray-300 shadow-md p-8 md:p-16 flex flex-col items-center">
        {/* Cabecera y presentación */}
        <div id="introduccion" className="w-full flex flex-col items-center mb-12 scroll-mt-24">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold tracking-widest text-gray-700 mb-2">DESARROLLADOR WEB</span>
            <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 leading-none mb-2">PORTFOLIO</h1>
            <span className="text-6xl md:text-7xl font-extrabold text-transparent stroke-gray-400 mb-6" style={{ WebkitTextStroke: '2px #d1d5db', color: 'transparent' }}>PORTFOLIO</span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8 mt-8">
            {/* Placeholder de foto */}
            
            
          </div>
        </div>

        {/* Sección ¿CÓMO PUEDO AYUDARTE? */}
        <section className="w-full mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">¿CÓMO PUEDO AYUDARTE?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
            <div>
              <p className="mb-4">Soy un desarrollador web especializado en front-end. Mi objetivo es crear interfaces atractivas, accesibles y eficientes, aportando valor real a cada proyecto. Me apasiona aprender nuevas tecnologías y trabajar en equipo para lograr los mejores resultados.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2 text-gray-800">HABILIDADES</h3>
                <ul className="text-sm space-y-1">
                  <li>HTML</li>
                  <li>CSS</li>
                  <li>JavaScript</li>
                  <li>React</li>
                  <li>Next.js</li>
                  <li>Java</li>
                  <li>Python</li>
                  <li>SQL</li>
                  <li>Git</li>
                  <li>Figma</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-gray-800">PASIÓN</h3>
                <ul className="text-sm space-y-1">
                  <li>Desarrollo de interfaces</li>
                  <li>UX/UI</li>
                  <li>Accesibilidad web</li>
                  <li>Responsive Design</li>
                  <li>Animaciones e interactividad</li>
                  <li>Optimización de rendimiento</li>
                  <li>Trabajo en equipo</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Separador decorativo */}
        <div className="border-t border-gray-300 w-full mb-8" />

        {/* Grid de proyectos */}
        <section id="proyectos" className="w-full scroll-mt-24">
          <div className="flex flex-wrap justify-center gap-2 mb-6 text-xs text-gray-500 tracking-widest">
            {Array(8).fill('MY WORKS').map((txt, i) => (
              <span key={i} className="px-2">{txt}</span>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {proyectos.map((proyecto, index) => (
              <div key={index} className="bg-white/80 border border-gray-300 rounded-xl p-4 flex flex-col shadow-sm transition-all duration-300 group hover:shadow-lg hover:scale-105">
                <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-4 flex items-center justify-center transition-all duration-300 group-hover:h-64 group-hover:bg-gray-100">
                  {/* Imagen o preview del proyecto */}
                  <iframe
                    src={proyecto.previewUrl}
                    title={proyecto.titulo}
                    className="w-full h-full border-0 transition-all duration-300 group-hover:scale-110"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
                <div className="mb-2 flex flex-col items-center">
                  <span className="text-sm font-semibold text-gray-700 text-center">{proyecto.titulo}</span>
                </div>
                <p className="text-gray-500 text-sm mb-2 text-center">{proyecto.descripcion}</p>
                <div className="flex justify-center mt-4 space-x-4">
                  <button
                    onClick={() => openModal(proyecto)}
                    className="text-xs text-[#444] border border-[#d1d5db] rounded px-3 py-1 bg-[#f3f3f3] hover:bg-[#e0e0e0] transition-colors duration-200 text-center"
                  >
                    Vista previa
                  </button>
                  <a
                    href={proyecto.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#444] border border-[#d1d5db] rounded px-3 py-1 bg-[#f3f3f3] hover:bg-[#e0e0e0] transition-colors duration-200 text-center"
                  >
                    Ver proyecto
                  </a>
                  <a
                    href={proyecto.codigoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#444] border border-[#d1d5db] rounded px-3 py-1 bg-[#f3f3f3] hover:bg-[#e0e0e0] transition-colors duration-200 text-center"
                  >
                    Ver código
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Barra separadora entre proyectos y tecnologías */}
        <div className="border-t border-gray-300 w-full my-12" />

        <Tecnologias />

        {/* Separador entre tecnologías y contacto */}
        <div className="border-t border-gray-300 w-full my-16" />

        {/* Sección de contacto estilo imagen */}
        <section id="contacto" className="w-full flex flex-col items-center scroll-mt-24">
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-none mb-8">CONTACTO</h2>
          <div className="flex space-x-10 mt-4 mb-16">
            <a
              href="https://wa.me/34693744798"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-600 transition-colors duration-200"
              aria-label="WhatsApp"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <a
              href="https://github.com/JavierNavarro12"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black transition-colors duration-200"
              aria-label="GitHub"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/javier-navarro-rodr%C3%ADguez-056023331/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="mailto:navarrojavi107@gmail.com"
              className="text-red-500 hover:text-red-700 transition-colors duration-200"
              aria-label="Gmail"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 20v-9.99l7.99 7.99c.39.39 1.02.39 1.41 0L20 10.01V20H4z" />
              </svg>
            </a>
          </div>
        </section>

      </main>

      {/* Footer minimalista */}
      <footer className="w-full max-w-5xl mx-auto mt-8 py-6 flex flex-col md:flex-row items-center justify-between border-t border-gray-300 text-gray-500 text-sm">
        <span className="mb-2 md:mb-0">© 2024 Javier Navarro. Todos los derechos reservados.</span>
        <div className="flex space-x-6">
          <a
            href="https://github.com/JavierNavarro12"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors duration-200"
            aria-label="GitHub"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
          <a
            href="https://wa.me/34693744798"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-600 transition-colors duration-200"
            aria-label="WhatsApp"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/javier-navarro-rodr%C3%ADguez-056023331/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-900 transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </footer>

      {/* Modal de vista previa */}
      {modalProyecto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={closeModal}>
          <div className="bg-white rounded-xl shadow-2xl p-4 max-w-3xl w-full relative" onClick={e => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl font-bold"
              aria-label="Cerrar"
            >
              ×
            </button>
            <div className="w-full h-[60vh] flex items-center justify-center">
              <iframe
                src={modalProyecto.previewUrl}
                title={modalProyecto.titulo}
                className="w-full h-full border-0 rounded-lg"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
            <div className="text-center mt-4 text-lg font-semibold text-gray-700">{modalProyecto.titulo}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
