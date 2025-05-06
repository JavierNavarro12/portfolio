import React, { useState } from "react";
import proyectos from "./proyectos";

function App() {
  const [activeSection, setActiveSection] = useState("proyectos");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                Portfolio
              </h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <button
                  onClick={() => setActiveSection("proyectos")}
                  className={`${
                    activeSection === "proyectos"
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-slate-600 hover:text-slate-900"
                  } px-3 py-2 text-sm font-medium transition-all duration-200`}
                >
                  Proyectos
                </button>
                <button
                  onClick={() => setActiveSection("contacto")}
                  className={`${
                    activeSection === "contacto"
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-slate-600 hover:text-slate-900"
                  } px-3 py-2 text-sm font-medium transition-all duration-200`}
                >
                  Contacto
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 pb-16">
        {/* Hero Section */}
        <section className="relative text-center py-32 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fade-in tracking-tight">
              Desarrollador Web Full Stack
            </h1>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Creando experiencias web únicas y funcionales con las últimas tecnologías
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="#proyectos"
                className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Ver Proyectos
              </a>
              <a
                href="#contacto"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Contactar
              </a>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="proyectos" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-slate-800 mb-16">
              Mis Proyectos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {proyectos.map((proyecto, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl"
                >
                  <div className="w-full h-64 relative overflow-hidden">
                    <iframe
                      src={proyecto.previewUrl}
                      title={proyecto.titulo}
                      className="w-full h-full border-0 transform group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold text-slate-800 mb-3">
                      {proyecto.titulo}
                    </h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {proyecto.descripcion}
                    </p>
                    <a
                      href={proyecto.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200 font-medium"
                    >
                      Ver proyecto
                      <svg
                        className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="py-24 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-slate-800 mb-16">
              Contacto
            </h2>
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <form
                action="https://formsubmit.co/tu-email@dominio.com"
                method="POST"
                className="space-y-8"
              >
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="mensaje"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Tu mensaje..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-4 px-8 rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <p className="text-slate-400">
                © 2024 Javier Navarro. Todos los derechos reservados.
              </p>
            </div>
            <div className="flex space-x-8">
              <a
                href="https://github.com/JavierNavarro12"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
