import socialRunPreview from "../img/socialrun-preview.webp";
import cancelaYaPreview from "../img/cancela-ya-preview.webp";
import secureScanPreview from "../img/securescan-preview.webp";
import aifinder from "../img/aifinder.webp";
import taidlixPreview from "../img/taidlix-preview.webp";
import cookieboyPreview from "../img/cookieboy-preview.webp";

const proyectos = [
    {
      id: 10,
      titulo: { es: "Taidlix", en: "Taidlix" },
      descripcion: {
        es: "Plataforma SaaS de gestión y analítica de redes sociales. Programación de posts, inbox unificado, generación de contenido con IA, informes PDF y análisis de competencia para Facebook, Instagram, TikTok y LinkedIn.",
        en: "SaaS platform for social media management and analytics. Post scheduling, unified inbox, AI content generation, PDF reports, and competitor analysis for Facebook, Instagram, TikTok, and LinkedIn."
      },
      url: "https://taidlix.com",
      previewUrl: "https://taidlix.com",
      codigoUrl: "",
      tecnologias: ["Next.js", "React", "TypeScript", "PostgreSQL", "Drizzle ORM", "NextAuth v5", "Anthropic SDK", "FFmpeg", "Stripe", "Redis", "PM2"],
      imagenPreview: taidlixPreview,
      imageFit: "contain"
    },
    {
      id: 11,
      titulo: { es: "CookieBoy", en: "CookieBoy" },
      descripcion: {
        es: "Solución SaaS GDPR para WordPress compuesta por plugin premium, API propia y portal de clientes. Detección automática de cookies, banner en 7 idiomas, Google Consent Mode v2 y sistema propio de licencias con Stripe.",
        en: "GDPR SaaS solution for WordPress featuring a premium plugin, custom API, and client portal. Automatic cookie detection, banner in 7 languages, Google Consent Mode v2, and custom licensing system with Stripe."
      },
      url: "https://cookieboy.es",
      previewUrl: "https://cookieboy.es",
      codigoUrl: "",
      tecnologias: ["PHP", "JavaScript", "MySQL", "Stripe", "WordPress", "GTM Consent Mode v2"],
      imagenPreview: cookieboyPreview,
      imageFit: "contain"
    },
    {
      id: 7,
      titulo: { es: "SocialRun", en: "SocialRun" },
      descripcion: {
        es: "App de iOS para competir con amigos: crea retos, registra cada km y recibe notificaciones cuando te superen.",
        en: "iOS app to compete with friends: create challenges, track each km, and get notifications when someone passes you."
      },
      url: "https://apps.apple.com/es/app/socialrun/id6754617429",
      previewUrl: "https://socialrun-web.vercel.app",
      codigoUrl: "",
      tecnologias: ["Swift", "SwiftUI", "iOS", "watchOS", "HealthKit", "Supabase", "Firebase Analytics"],
      imagenPreview: socialRunPreview,
      imageFit: "contain"
    },
    {
      id: 9,
      titulo: { es: "SecureScan", en: "SecureScan" },
      descripcion: {
        es: "Escáner de seguridad web que detecta API keys expuestas, archivos sensibles y configuraciones inseguras.",
        en: "Web security scanner that detects exposed API keys, sensitive files, and insecure configurations."
      },
      url: "https://securescan-eight.vercel.app",
      previewUrl: "https://securescan-eight.vercel.app",
      codigoUrl: "",
      tecnologias: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Stripe", "Framer Motion", "OpenAI"],
      imagenPreview: secureScanPreview,
      imageFit: "contain"
    },
    {
      id: 8,
      titulo: { es: "CancelaYa", en: "CancelaYa" },
      descripcion: {
        es: "Web app que detecta suscripciones olvidadas desde tu extracto y te da el enlace directo para cancelarlas.",
        en: "Web app that detects forgotten subscriptions from your statement and provides direct cancel links."
      },
      url: "https://cancela-ya.vercel.app",
      previewUrl: "https://cancela-ya.vercel.app",
      codigoUrl: "https://github.com/JavierNavarro12/cancelaya",
      tecnologias: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase", "Stripe", "OpenAI"],
      imagenPreview: cancelaYaPreview,
      imageFit: "contain"
    },
    {
      id: 6,
      titulo: { es: "AIFinder", en: "AIFinder" },
      descripcion: {
        es: "AIFinder.es es una plataforma web que reúne y organiza herramientas de inteligencia artificial, permitiendo explorarlas por categorías, leer artículos relacionados y proponer nuevas aplicaciones para su inclusión.",
        en: "AIFinder is a web platform that gathers and organizes AI tools, allowing exploration by categories, reading related articles, and proposing new apps for inclusion."
      },
      url: "https://www.aifinder.es",
      previewUrl: "https://www.aifinder.es",
      codigoUrl: "https://github.com/JavierNavarro12/web_next.js",
      tecnologias: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase"],
      imagenPreview: aifinder,
      forceImagePreview: true
    }
  ];

  export default proyectos;
