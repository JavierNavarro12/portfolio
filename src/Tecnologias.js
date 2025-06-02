import React from 'react';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaJava, FaPython, FaFigma, FaGithub, FaTrello } from "react-icons/fa";
import { SiNextdotjs, SiPostgresql, SiMysql } from "react-icons/si";

const tecnologias = [
  { nombre: "HTML", icono: <FaHtml5 color="#e34c26" /> },
  { nombre: "CSS", icono: <FaCss3Alt color="#264de4" /> },
  { nombre: "JavaScript", icono: <FaJs color="#f0db4f" /> },
  { nombre: "React", icono: <FaReact color="#61dafb" /> },
  { nombre: "Next.js", icono: <SiNextdotjs color="#000" /> },
  { nombre: "Java", icono: <FaJava color="#007396" /> },
  { nombre: "Python", icono: <FaPython color="#306998" /> },
  { nombre: "Figma", icono: <FaFigma color="#a259ff" /> },
  { nombre: "GitHub", icono: <FaGithub color="#333" /> },
  { nombre: "PostgreSQL", icono: <SiPostgresql color="#336791" /> },
  { nombre: "MySQL", icono: <SiMysql color="#00758f" /> },
  { nombre: "Trello", icono: <FaTrello color="#0079bf" /> },
];

export default function Tecnologias({ language }) {
  const title = language === 'es' ? 'Tecnologías' : 'Technologies';
  return (
    <section className="tecnologias w-full my-16 flex flex-col items-center animate-fade-in-scale main-section">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-900 dark:text-white bounce-on-hover">{title}</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {tecnologias.map((tec) => (
          <div key={tec.nombre} className="flex flex-col items-center bg-white rounded-xl p-4 shadow hover:scale-105 transition-transform w-28 bounce-on-hover tap-on-active">
            <span className="text-4xl mb-2 wiggle-on-hover">{tec.icono}</span>
            <span className="text-sm font-medium text-gray-700">{tec.nombre}</span>
          </div>
        ))}
      </div>
    </section>
  );
}