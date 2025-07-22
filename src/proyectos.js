import flyingPolitics from "./img/flying-politics.png";
import opticaVision from "./img/optica-vision.png";
import fitnessApp from "./img/fitness-app.png";
import portfolio from "./img/portfolio.png";
import scapeRoom from "./img/scape-room.png";

const proyectos = [
    {
      id: 1,
      titulo: { es: "Juego de Pájaros", en: "Bird Game" },
      descripcion: { es: "Un juego interactivo donde tienes que superar obstáculos.", en: "An interactive game where you have to overcome obstacles." },
      url: "https://flyingpolitics.netlify.app/",
      previewUrl: "https://flyingpolitics.netlify.app/",
      codigoUrl: "https://github.com/JavierNavarro12/Curso/tree/master/JuegoPajaros",
      tecnologias: ["HTML", "CSS", "JavaScript"],
      imagenPreview: flyingPolitics
    },
    {
      id: 3,
      titulo: { es: "Fitness App", en: "Fitness App" },
      descripcion: { 
        es: "Aplicación fullstack que, usando IA, genera informes personalizados sobre los suplementos que debes tomar.", 
        en: "A fullstack app that uses AI to generate personalized reports on the supplements you should take." 
      },
      url: "https://endlessgoalsnutrition.com",
      previewUrl: "https://endlessgoalsnutrition.com",
      codigoUrl: "https://github.com/JavierNavarro12/Fitness",
      tecnologias: ["React", "TypeScript", "Firebase", "APIs", "Tailwind CSS"],
      imagenPreview: fitnessApp
    },
    {
      id: 4,
      titulo: { es: "Portfolio", en: "Portfolio" },
      descripcion: { es: "Portfolio con mis proyectos", en: "Portfolio with my projects" },
      url: "https://portfoliojaviernavarro.netlify.app/",
      previewUrl: "https://portfoliojaviernavarro.netlify.app/",
      codigoUrl: "https://github.com/JavierNavarro12/portfolio",
      tecnologias: ["React", "JavaScript", "CSS"],
      imagenPreview: portfolio
    },
    {
      id: 5,
      titulo: { es: "Juego de Programación", en: "Programming Game" },
      descripcion: { es: "Un escape room virtual de programación.", en: "A virtual programming escape room." },
      url: "https://scape-room.netlify.app",
      previewUrl: "https://scape-room.netlify.app",
      codigoUrl: "",
      tecnologias: ["React", "JavaScript", "CSS"],
      imagenPreview: scapeRoom
    }
  ];

  export default proyectos;
  