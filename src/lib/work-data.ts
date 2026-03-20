export type WorkProject = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  metaBlocks: Array<{ label: string; value: string }>;
  gallery: Array<{ src: string; alt: string; priority?: boolean }>;
  cta?: { label: string; href: string };
};

export const workProjects: WorkProject[] = [
  {
    slug: "corrientes-market",
    title: "Ecommerce local con foco en promociones",
    category: "Ecommerce · Corrientes",
    summary:
      "Experiencia pensada para compras rápidas, catálogo profundo y pagos en ARS con foco en conversión local.",
    metaBlocks: [
      { label: "Cliente", value: "Negocio local" },
      { label: "Stack", value: "Next.js + Woo + MP" },
      { label: "Objetivo", value: "+ ventas / + recurrencia" },
    ],
    gallery: [
      { src: "/work/market-1.svg", alt: "Pantalla de promociones", priority: true },
      { src: "/work/market-2.svg", alt: "Catálogo con filtros" },
      { src: "/work/market-3.svg", alt: "Checkout y entregas" },
    ],
    cta: { label: "Quiero este flujo", href: "/#contacto" },
  },
  {
    slug: "turnos-pro",
    title: "Sistema de turnos y agenda inteligente",
    category: "Turnos · Servicios",
    summary:
      "Reservas online con recordatorios, pagos anticipados y automatización para reducir ausencias.",
    metaBlocks: [
      { label: "Cliente", value: "Servicios profesionales" },
      { label: "Stack", value: "Next.js + Integraciones" },
      { label: "Objetivo", value: "Agenda al 90%" },
    ],
    gallery: [
      { src: "/work/market-2.svg", alt: "Agenda semanal", priority: true },
      { src: "/work/market-3.svg", alt: "Confirmaciones automáticas" },
      { src: "/work/market-1.svg", alt: "Pagos y recordatorios" },
    ],
    cta: { label: "Agendar diagnóstico", href: "/#contacto" },
  },
];

export const getWorkBySlug = (slug: string) =>
  workProjects.find((project) => project.slug === slug);

export const getNextProject = (slug: string) => {
  const index = workProjects.findIndex((project) => project.slug === slug);
  if (index === -1) return null;
  const next = workProjects[(index + 1) % workProjects.length];
  return { title: next.title, href: `/work/${next.slug}` };
};
