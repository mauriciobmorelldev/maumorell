"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import AnimatedLogoSVG from "@/components/motion/AnimatedLogoSVG";
import CursorReactiveParallax from "@/components/motion/CursorReactiveParallax";
import SwipeySvgImageGrid from "@/components/motion/SwipeySvgImageGrid";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ScrollToTop from "@/components/ui/ScrollToTop";

const services = [
  {
    title: "Desarrollo web a medida",
    description:
      "Landing pages, sitios corporativos y plataformas rápidas con foco en performance y conversión.",
    items: ["Arquitectura escalable", "SEO técnico", "UX de alto impacto"],
  },
  {
    title: "Ecommerce end-to-end",
    description:
      "Tiendas con catálogo, pagos, logística y automatizaciones en WooCommerce, Tiendanube o Empretienda.",
    items: [
      "WooCommerce + Mercado Pago",
      "Tiendanube / Empretienda",
      "Checkout optimizado",
    ],
  },
  {
    title: "Tiendanube / Empretienda",
    description:
      "Implementaciones rápidas con diseño premium, performance y configuración lista para vender.",
    items: ["Plantillas personalizadas", "Pagos y envíos locales", "Escalables"],
  },
  {
    title: "Sistemas de turnos",
    description:
      "Reservas inteligentes con recordatorios, pagos y sincronización con calendarios.",
    items: ["Automatización", "Google Calendar", "Zoom / Meet"],
  },
  {
    title: "Optimización & CRO",
    description:
      "Auditoría, mejora de embudos y velocidad para convertir más tráfico en ventas.",
    items: ["Core Web Vitals", "A/B testing", "Copy + UI"],
  },
  {
    title: "Integraciones",
    description:
      "Conecto tu ecommerce con ERP, CRM, envíos, facturación y herramientas clave.",
    items: ["APIs a medida", "Webhooks", "Dashboards"],
  },
  {
    title: "Portfolios premium",
    description:
      "Experiencias visuales inmersivas para mostrar producto, servicios y casos de éxito.",
    items: ["Scroll storytelling", "Animaciones suaves", "Narrativa visual"],
  },
];

const platforms = [
  {
    id: "woo",
    label: "WooCommerce",
    title: "WooCommerce para catálogos potentes",
    description: "Ideal si necesitás personalización profunda e integraciones.",
    points: ["Plugins avanzados", "Checkout flexible", "SEO técnico"],
  },
  {
    id: "nube",
    label: "Tiendanube",
    title: "Tiendanube lista para vender rápido",
    description: "Implementación express con foco en conversión local.",
    points: ["Plantillas premium", "Pagos en ARS", "Integraciones locales"],
  },
  {
    id: "empre",
    label: "Empretienda",
    title: "Empretienda simple y escalable",
    description: "Perfecta para negocios locales que buscan velocidad.",
    points: ["Catálogo claro", "Flujos sin fricción", "Soporte rápido"],
  },
  {
    id: "custom",
    label: "Custom",
    title: "Custom commerce a medida",
    description: "UX 100% propio para marcas con alto impacto visual.",
    points: ["Diseño único", "APIs a medida", "Escalabilidad"],
  },
];

const localPillars = [
  "Pagos en ARS",
  "WhatsApp directo",
  "Catálogo por rubro",
  "Entrega / retiro",
  "Google Maps",
  "Promos estacionales",
];

const localFlow = [
  {
    title: "Landing + catálogo",
    description:
      "Carga rápida, filtros claros y productos listos para comparar.",
  },
  {
    title: "WhatsApp + checkout",
    description:
      "Contacto inmediato, pagos simples y opciones de financiación en ARS.",
  },
  {
    title: "Entrega / retiro",
    description:
      "Logística local, seguimiento y experiencia post-compra cuidada.",
  },
];

const checklistItems = [
  {
    title: "Catálogo ordenado",
    detail: "Fotos y stock listos para publicar.",
  },
  {
    title: "Pagos en ARS",
    detail: "Mercado Pago o tarjetas locales activos.",
  },
  {
    title: "WhatsApp conectado",
    detail: "Respuestas rápidas + links directos.",
  },
  {
    title: "Logística definida",
    detail: "Envíos, retiro y zonas claras.",
  },
  {
    title: "Promos activas",
    detail: "Combos locales y fechas clave.",
  },
  {
    title: "Analytics listo",
    detail: "Medimos visitas, ventas y campañas.",
  },
];

const sectors = [
  {
    label: "Farmacias",
    headline: "Venta rápida, catálogo enorme, promos claras.",
    description:
      "Flujo pensado para reposición rápida, productos destacados y recorridos simples.",
    features: [
      "Promos 2x1 y combos",
      "Filtros por necesidad",
      "Retiro en sucursal",
    ],
  },
  {
    label: "Moda & regalos",
    headline: "Storytelling + packs estacionales que convierten.",
    description:
      "Visuales aspiracionales, cross-sell y campañas para fechas locales.",
    features: ["Lookbook dinámico", "Gift guide", "Checkout express"],
  },
  {
    label: "Gastronomía",
    headline: "Carta digital + pedidos en minutos.",
    description:
      "Menús claros, horarios visibles y pedidos listos para WhatsApp o delivery.",
    features: ["Menú por horario", "Pedidos rápidos", "Mapas + delivery"],
  },
  {
    label: "Servicios",
    headline: "Reservas online y agenda organizada.",
    description:
      "Automatización de turnos, recordatorios y pagos para reducir ausencias.",
    features: ["Agenda inteligente", "Pagos anticipados", "Confirmaciones auto"],
  },
];

const promoIdeas = [
  {
    title: "Promo local del mes",
    description: "20% off en compras superiores a $18.000 ARS.",
    cta: "Comprar ahora",
  },
  {
    title: "Combo de temporada",
    description: "Armá tu pack y llevate envío gratis en Corrientes.",
    cta: "Ver combos",
  },
  {
    title: "Flash sale",
    description: "Descuento por 24 horas para clientes recurrentes.",
    cta: "Activar promo",
  },
];

const turnosHighlights = [
  "Recordatorios WhatsApp",
  "Pagos anticipados",
  "Reagendado automático",
  "Google Calendar",
  "Lista de espera",
  "Panel de ocupación",
];

const turnosStatusLabels = {
  confirmado: "Confirmado",
  pendiente: "Pendiente",
  cancelado: "Cancelado",
};

type TurnosStatus = keyof typeof turnosStatusLabels;

const turnosPreview: Array<{
  time: string;
  name: string;
  service: string;
  status: TurnosStatus;
}> = [
  {
    time: "09:30",
    name: "Lucía B.",
    service: "Control mensual",
    status: "confirmado",
  },
  {
    time: "11:00",
    name: "Carlos R.",
    service: "Consulta inicial",
    status: "pendiente",
  },
  {
    time: "14:30",
    name: "Agus M.",
    service: "Videollamada",
    status: "confirmado",
  },
];

const turnosMetrics = [
  { label: "Ocupación", value: "82%" },
  { label: "No show", value: "6%" },
  { label: "Slots libres", value: "9" },
];

const estateStatusLabels = {
  disponible: "Disponible",
  reservado: "Reservado",
  vendido: "Vendido",
};

type EstateStatus = keyof typeof estateStatusLabels;

const estateHighlights = [
  "Tours 360",
  "Shortlist inteligente",
  "Agenda de visitas",
  "Temporarios premium",
  "En pozo + renders",
  "Ventas de desarrollados",
];

const estatePreview: Array<{
  title: string;
  location: string;
  status: EstateStatus;
  tag: string;
}> = [
  {
    title: "Skyline Rivera",
    location: "Centro · Corrientes",
    status: "disponible",
    tag: "En pozo",
  },
  {
    title: "Tempo Costanera",
    location: "Costanera",
    status: "reservado",
    tag: "Temporario",
  },
  {
    title: "Bosque Alto",
    location: "Parque Mitre",
    status: "disponible",
    tag: "Listo",
  },
];

const estateMetrics = [
  { label: "Leads / mes", value: "210" },
  { label: "Ocupación temp.", value: "89%" },
  { label: "Ventas en pozo", value: "18" },
];

const baHighlights = [
  "Catálogo inteligente",
  "Agenda de visitas",
  "Torres en pozo",
  "Temporarios premium",
  "Panel comercial",
];

const baStatusLabels = {
  disponible: "Disponible",
  reservado: "Reservado",
  vendido: "Vendido",
};

type BaStatus = keyof typeof baStatusLabels;

const baPreview: Array<{
  title: string;
  location: string;
  status: BaStatus;
  tag: string;
}> = [
  {
    title: "Torre Rivera",
    location: "Puerto Madero",
    status: "disponible",
    tag: "En pozo",
  },
  {
    title: "Tempo Palermo",
    location: "Palermo",
    status: "reservado",
    tag: "Temporario",
  },
  {
    title: "Lumiere Recoleta",
    location: "Recoleta",
    status: "disponible",
    tag: "Listo",
  },
];

const baMetrics = [
  { label: "Leads / mes", value: "340" },
  { label: "Consultas", value: "58" },
  { label: "Reservas", value: "22" },
];

const projects = [
  {
    tag: "Referencia local",
    title: "Farmanova",
    url: "https://farmanovaofertas.com.ar",
    description:
      "Ecommerce de farmacia con foco en promociones y catálogo amplio para compras rápidas.",
    result: "Benchmark",
    note: "Referencia de mi historial laboral.",
  },
  {
    tag: "Referencia local",
    title: "A caballo regalado",
    url: "https://acaballoregalado.ar",
    description:
      "Retail con storytelling de marca, packs estacionales y UX pensada para regalos.",
    result: "Benchmark",
    note: "Referencia de mi historial laboral.",
  },
  {
    tag: "Referencia Internacional",
    title: "Courts",
    url: "https://courts.com",
    description:
      "Retail con navegación profunda, financiación visible y catálogos extensos.",
    result: "Benchmark",
    note: "Referencia de mi historial laboral.",
  },
  {
    tag: "Referencia Internacional",
    title: "Imeca",
    url: "https://imeca.com",
    description:
      "B2B con catálogo técnico y procesos de cotización ágiles.",
    result: "Benchmark",
    note: "Referencia de mi historial laboral.",
  },
  {
    tag: "Proyecto entrante",
    title: "Portfolio premium marca personal",
    description:
      "Identidad visual potente, narrativa personal y animaciones sutiles para destacar expertise.",
    result: "En desarrollo",
    note: "Proyecto en fase inicial.",
  },
];

const processSteps = [
  {
    title: "Diagnóstico local",
    description:
      "Objetivos, análisis de tu plaza y roadmap priorizado para ganar tracción rápido.",
  },
  {
    title: "UX/UI orientado a ventas",
    description:
      "Wireframes, prototipos y diseño visual para públicos locales y regionales.",
  },
  {
    title: "Build & automatización",
    description:
      "Desarrollo modular, integraciones y control de calidad continuo.",
  },
  {
    title: "Lanzamiento & growth",
    description:
      "Monitoreo, mejoras iterativas y performance constante.",
  },
];

const commitments = [
  {
    title: "Comunicación clara",
    description:
      "Actualizaciones simples, sin tecnicismos y foco en decisiones rápidas.",
  },
  {
    title: "Experiencia local",
    description:
      "Entiendo la dinámica de Corrientes y el NEA para acelerar resultados.",
  },
  {
    title: "Performance real",
    description:
      "Velocidad, SEO técnico y conversiones como prioridad desde el día uno.",
  },
];

const stack = [
  "Next.js",
  "WordPress",
  "WooCommerce",
  "Tiendanube",
  "Empretienda",
  "Mercado Pago",
  "Stripe",
  "PayPal",
  "GSAP",
  "Framer Motion",
  "PostgreSQL",
  "Cloudflare",
  "Analytics",
  "Meta Pixel",
  "Zapier",
];

const stats = [
  { value: "Corrientes", label: "Base local" },
  { value: "Ecommerce", label: "Especialidad" },
  { value: "+Ventas", label: "Objetivo" },
];

const swipeyItems = [
  { src: "/work/market-1.svg", alt: "Preview 1", x: 0, y: 0, w: 45, h: 55 },
  { src: "/work/market-2.svg", alt: "Preview 2", x: 50, y: 10, w: 45, h: 40 },
  { src: "/work/market-3.svg", alt: "Preview 3", x: 20, y: 60, w: 50, h: 35 },
];

const currencyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("es-AR", {
  maximumFractionDigits: 0,
});

const toNumber = (value: string) => {
  const normalized = value.replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};

const withDelay = (index: number): CSSProperties =>
  ({ "--delay": `${index * 90}ms` } as CSSProperties);

export default function HomeClient() {
  const [visits, setVisits] = useState("3000");
  const [conversion, setConversion] = useState("1.6");
  const [ticket, setTicket] = useState("18000");
  const [activeSector, setActiveSector] = useState(0);
  const [promoIndex, setPromoIndex] = useState(0);
  const [playMode, setPlayMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [checklist, setChecklist] = useState(() =>
    checklistItems.map(() => false)
  );
  const [activePlatform, setActivePlatform] = useState(platforms[0]?.id ?? "woo");

  const visitsNumber = Math.max(0, toNumber(visits));
  const conversionNumber = Math.min(Math.max(0, toNumber(conversion)), 100);
  const ticketNumber = Math.max(0, toNumber(ticket));

  const baselineOrders = (visitsNumber * conversionNumber) / 100;
  const baselineRevenue = baselineOrders * ticketNumber;

  const improvedConversion = Math.min(conversionNumber + 0.4, 100);
  const improvedTicket = ticketNumber * 1.08;
  const improvedOrders = (visitsNumber * improvedConversion) / 100;
  const improvedRevenue = improvedOrders * improvedTicket;
  const deltaRevenue = improvedRevenue - baselineRevenue;

  const sector = sectors[activeSector] ?? sectors[0];
  const promo = promoIdeas[promoIndex] ?? promoIdeas[0];
  const platform =
    platforms.find((item) => item.id === activePlatform) ?? platforms[0];
  const checkedCount = checklist.filter(Boolean).length;
  const readiness = Math.round((checkedCount / checklistItems.length) * 100);

  const shufflePromo = () => {
    setPromoIndex((prev) => {
      if (promoIdeas.length <= 1) return prev;
      let next = Math.floor(Math.random() * promoIdeas.length);
      if (next === prev) next = (next + 1) % promoIdeas.length;
      return next;
    });
  };

  const toggleChecklist = (index: number) => {
    setChecklist((prev) =>
      prev.map((value, currentIndex) =>
        currentIndex === index ? !value : value
      )
    );
  };


  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (!elements.length) return;

    if (prefersReducedMotion) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (coarsePointer) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".btn-primary, .btn-secondary")
    );
    if (!elements.length) return;

    const cleanups: Array<() => void> = [];

    elements.forEach((element) => {
      let frame: number | null = null;
      let latestX = 0;
      let latestY = 0;

      const update = () => {
        element.style.setProperty("--mag-x", `${latestX}px`);
        element.style.setProperty("--mag-y", `${latestY}px`);
        frame = null;
      };

      const handleMove = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        latestX = x * 10;
        latestY = y * 10;
        if (!frame) frame = requestAnimationFrame(update);
      };

      const handleLeave = () => {
        latestX = 0;
        latestY = 0;
        if (!frame) frame = requestAnimationFrame(update);
      };

      element.addEventListener("pointermove", handleMove);
      element.addEventListener("pointerleave", handleLeave);

      cleanups.push(() => {
        element.removeEventListener("pointermove", handleMove);
        element.removeEventListener("pointerleave", handleLeave);
        if (frame) cancelAnimationFrame(frame);
        element.style.removeProperty("--mag-x");
        element.style.removeProperty("--mag-y");
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div className={`relative overflow-hidden ${playMode ? "play-mode" : ""}`}>
      <ScrollProgress variant="bar" position="top" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-50" />
        <div className="noise absolute inset-0 opacity-70" />
        <div className="float-slow absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,107,61,0.55),transparent_70%)] blur-3xl" />
        <div className="float-fast absolute top-[40%] left-[-12%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(42,166,255,0.45),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[-10%] right-[10%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(124,77,255,0.28),transparent_70%)] blur-3xl" />
      </div>

      <header className="header-glass sticky top-0 z-40 border-b border-[var(--ring)] backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-[var(--accent)]" />
            <span className="text-lg font-semibold tracking-tight">maumorell</span>
          </div>
          <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)] md:flex">
            <a href="#servicios">// servicios</a>
            <a href="#local">// local</a>
            <a href="#laboratorio">// lab</a>
            <a href="#checklist">// checklist</a>
            <a href="#estimador">// estimador</a>
            <a href="#turnos">// turnos</a>
            <a href="#inmobiliaria">// inmobiliaria</a>
            <a href="#propiedades-ba">// propiedades ba</a>
            <a href="#casos">// referencias</a>
            <a href="#contacto">// contacto</a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              className="md:hidden rounded-full border border-[var(--ring)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              Menu
            </button>
            <a className="btn-secondary hidden md:inline-flex" href="#contacto">
              Agendar diagnóstico
            </a>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur md:hidden"
        >
          <div className="absolute right-6 top-20 w-[min(320px,90vw)] rounded-3xl bg-[var(--surface)] p-6 shadow-[0_30px_80px_rgba(15,23,42,0.18)]">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
                Navegación
              </span>
              <button
                className="rounded-full border border-[var(--ring)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em]"
                onClick={() => setMenuOpen(false)}
              >
                Cerrar
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-4 text-sm font-semibold">
              <a href="#servicios" onClick={() => setMenuOpen(false)}>
                Servicios
              </a>
              <a href="#local" onClick={() => setMenuOpen(false)}>
                Enfoque local
              </a>
              <a href="#laboratorio" onClick={() => setMenuOpen(false)}>
                Laboratorio
              </a>
              <a href="#checklist" onClick={() => setMenuOpen(false)}>
                Checklist local
              </a>
              <a href="#estimador" onClick={() => setMenuOpen(false)}>
                Estimador
              </a>
              <a href="#turnos" onClick={() => setMenuOpen(false)}>
                Simulador de turnos
              </a>
              <a href="#inmobiliaria" onClick={() => setMenuOpen(false)}>
                Demo inmobiliaria
              </a>
              <a href="#propiedades-ba" onClick={() => setMenuOpen(false)}>
                Demo propiedades BA
              </a>
              <a href="#casos" onClick={() => setMenuOpen(false)}>
                Referencias
              </a>
              <a href="#contacto" onClick={() => setMenuOpen(false)}>
                Contacto
              </a>
              <a href="#contacto" className="btn-primary mt-2">
                Agendar diagnóstico
              </a>
            </div>
          </div>
        </div>
      )}

      <main>
        <section
          className="mx-auto w-full max-w-6xl px-6 pb-20 pt-24"
        >
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8 reveal" data-reveal style={withDelay(0)}>
              <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.45em] text-[var(--muted)]">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                Corrientes · Argentina · Ecommerce local
              </div>
              <div className="space-y-6">
                <h1 className="hero-title">
                  Ecommerce para negocios locales,{" "}
                  <span className="text-gradient">webs a medida</span> que venden
                  todos los días.
                </h1>
                <p className="hero-subtitle">
                  Trabajo con comercios de Corrientes y Argentina creando
                  ecommerce, sistemas de turnos y sitios a medida con foco en
                  conversión, performance y una narrativa visual premium.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a className="btn-primary" href="#contacto">
                  Agendar diagnóstico
                </a>
                <button
                  className="btn-secondary"
                  onClick={() => setPlayMode((prev) => !prev)}
                >
                  {playMode ? "Modo play activado" : "Activar modo play"}
                </button>
              </div>
              <div className="flex flex-wrap gap-8 pt-2 text-sm text-[var(--muted)]">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-semibold text-[var(--foreground)]">
                      {stat.value}
                    </div>
                    <div className="uppercase tracking-[0.18em]">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.45em] text-[var(--muted)]">
                <span className="h-[2px] w-12 rounded-full bg-[var(--muted)]" />
                Scroll para explorar
              </div>
            </div>

            <div className="space-y-6">
              <CursorReactiveParallax
                className="relative min-h-[360px] md:min-h-[420px]"
                layers={[
                  {
                    id: "logo",
                    depth: 0.6,
                    children: (
                      <div className="absolute -top-8 right-6 w-[180px] md:w-[210px]">
                        <AnimatedLogoSVG animateOn="inView" />
                      </div>
                    ),
                  },
                  {
                    id: "panel",
                    depth: 0.2,
                    children: (
                      <div
                        className="glass reveal card-tilt rounded-[32px] p-6"
                        data-reveal
                        style={withDelay(2)}
                      >
                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                          <span>Panel local</span>
                          <span className="rounded-full bg-[rgba(255,107,61,0.2)] px-3 py-1 text-[0.65rem] font-semibold text-[var(--accent)]">
                            Corrientes
                          </span>
                        </div>
                        <div className="mt-6 grid gap-4">
                          <div className="rounded-2xl bg-[rgba(15,23,42,0.06)] p-4">
                            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                              Pedidos del día
                            </p>
                            <p className="mt-3 text-2xl font-semibold">128</p>
                            <p className="mt-1 text-sm text-[var(--muted)]">
                              +14% vs ayer
                            </p>
                          </div>
                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-2xl bg-[rgba(15,23,42,0.05)] p-4">
                              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                                WhatsApp
                              </p>
                              <p className="mt-3 text-xl font-semibold">62 chats</p>
                            </div>
                            <div className="rounded-2xl bg-[rgba(15,23,42,0.05)] p-4">
                              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                                Entregas
                              </p>
                              <p className="mt-3 text-xl font-semibold">24 envíos</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    id: "panel-secondary",
                    depth: 0.35,
                    children: (
                      <div
                        className="glass reveal card-tilt absolute -bottom-10 left-6 hidden w-[70%] rounded-2xl p-5 md:block"
                        data-reveal
                        style={withDelay(3)}
                      >
                        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                          Reservas activas
                        </p>
                        <p className="mt-2 text-lg font-semibold">Agenda al 82%</p>
                        <p className="mt-1 text-sm text-[var(--muted)]">
                          Automatización + recordatorios.
                        </p>
                      </div>
                    ),
                  },
                  {
                    id: "sticker-primary",
                    depth: 0.5,
                    children: (
                      <div className="sticker absolute -left-6 top-6 hidden md:flex">
                        + ventas
                      </div>
                    ),
                  },
                  {
                    id: "sticker-secondary",
                    depth: 0.55,
                    children: (
                      <div className="sticker sticker-alt absolute -right-4 bottom-12 hidden md:flex">
                        Whatsapp first
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </section>

        <section
          id="local"
          className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10"
        >
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6 reveal" data-reveal style={withDelay(0)}>
              <p className="kicker">Foco local</p>
              <h2 className="section-title">Pensado para Corrientes y el NEA</h2>
              <p className="section-subtitle">
                Diseños, flujos y copy adaptados al comportamiento local para
                vender más en tu ciudad y escalar sin fricción.
              </p>
              <div className="flex flex-wrap gap-3">
                {localPillars.map((pillar) => (
                  <span key={pillar} className="chip">
                    {pillar}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <a className="btn-primary" href="#estimador">
                  Simular ventas
                </a>
                <a className="btn-secondary" href="#contacto">
                  Pedir diagnóstico
                </a>
              </div>
            </div>

            <div className="relative space-y-4">
              {localFlow.map((step, index) => (
                <div
                  key={step.title}
                  className="glass reveal card-tilt flex gap-4 rounded-3xl p-6"
                  data-reveal
                  style={withDelay(index)}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(255,107,61,0.15)] text-sm font-semibold text-[var(--accent)]">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm text-[var(--muted)]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="laboratorio"
          className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10"
        >
          <div className="rounded-[36px] border border-[var(--ring)] bg-[color:var(--surface)] p-10">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
              <div className="space-y-6">
                <p className="kicker">Laboratorio local</p>
                <h2 className="section-title">Elegí tu rubro y activemos el plan</h2>
                <p className="section-subtitle">
                  Personalizo la experiencia según tu negocio. Seleccioná un
                  rubro y mirá un flujo sugerido listo para implementar.
                </p>
                <div className="flex flex-wrap gap-3">
                  {sectors.map((item, index) => (
                    <button
                      key={item.label}
                      className={`chip ${index === activeSector ? "chip-active" : ""}`}
                      onClick={() => setActiveSector(index)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <div className="glass card-tilt rounded-3xl p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                    Promoción sugerida
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold">{promo.title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    {promo.description}
                  </p>
                  <button className="btn-secondary mt-4" onClick={shufflePromo}>
                    Barajar idea
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="glass card-tilt rounded-3xl p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                    Enfoque para {sector.label}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold">{sector.headline}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    {sector.description}
                  </p>
                  <ul className="mt-5 space-y-2 text-sm font-semibold">
                    {sector.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[var(--accent-2)]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a className="btn-primary mt-5 w-fit" href="#contacto">
                    Quiero este flujo
                  </a>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="glass card-tilt rounded-3xl p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                      Tiempo de implementación
                    </p>
                    <p className="mt-3 text-xl font-semibold">2 a 4 semanas</p>
                  </div>
                  <div className="glass card-tilt rounded-3xl p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                      Objetivo inmediato
                    </p>
                    <p className="mt-3 text-xl font-semibold">Más ventas locales</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="servicios"
          className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10"
        >
          <div className="max-w-2xl space-y-4 reveal" data-reveal style={withDelay(0)}>
            <h2 className="section-title">Servicios diseñados para vender</h2>
            <p className="section-subtitle">
              Combino estrategia, diseño y desarrollo para crear experiencias
              que impactan desde el primer scroll y convierten en resultados.
            </p>
          </div>

          <div
            className="platform-switcher mt-10 reveal"
            data-reveal
            style={withDelay(1)}
          >
            <div className="platform-switcher__tabs">
              {platforms.map((item) => (
                <button
                  key={item.id}
                  className={
                    item.id === activePlatform
                      ? "platform-pill is-active"
                      : "platform-pill"
                  }
                  onClick={() => setActivePlatform(item.id)}
                  type="button"
                  aria-pressed={item.id === activePlatform}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="platform-switcher__panel">
              <p className="kicker">Plataforma sugerida</p>
              <h3 className="mt-3 text-2xl font-semibold">{platform.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {platform.description}
              </p>
              <ul className="mt-4 space-y-2 text-sm font-semibold">
                {platform.points.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--accent-2)]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <article
                key={service.title}
                className="glass reveal card-tilt rounded-3xl p-6"
                data-reveal
                style={withDelay(index)}
              >
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm text-[var(--muted)]">
                  {service.description}
                </p>
                <ul className="mt-5 space-y-2 text-sm font-medium text-[var(--foreground)]">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section
          id="checklist"
          className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10"
        >
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6 reveal" data-reveal style={withDelay(0)}>
              <p className="kicker">Checklist express</p>
              <h2 className="section-title">
                ¿Tu ecommerce está listo para vender?
              </h2>
              <p className="section-subtitle">
                Marcá los puntos que ya tenés resueltos y te doy un mapa claro
                de lo que falta para lanzar con fuerza.
              </p>
              <div className="rounded-3xl border border-[var(--ring)] bg-[color:var(--surface)] p-6">
                <p className="kicker">Nivel de preparación</p>
                <p className="mt-3 text-3xl font-semibold">{readiness}%</p>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {checkedCount} de {checklistItems.length} puntos listos.
                </p>
              </div>
              <a className="btn-primary w-fit" href="#contacto">
                Quiero completar el checklist
              </a>
            </div>

            <div className="checklist">
              {checklistItems.map((item, index) => (
                <label
                  key={item.title}
                  className="check-item reveal"
                  data-reveal
                  style={withDelay(index)}
                >
                  <input
                    type="checkbox"
                    checked={checklist[index]}
                    onChange={() => toggleChecklist(index)}
                  />
                  <div>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-xs text-[var(--muted)]">{item.detail}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </section>

        <section
          id="estimador"
          className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10"
        >
          <div className="rounded-[36px] border border-[var(--ring)] bg-[color:var(--surface)] p-10">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-6">
                <p className="kicker">Valor rápido</p>
                <h2 className="section-title">Estimador de ventas locales</h2>
                <p className="section-subtitle">
                  Usá estos números como referencia para visualizar el potencial
                  de tu ecommerce. Te ayudo a optimizar cada punto del flujo.
                </p>
                <div className="grid gap-4">
                  <label className="text-sm font-semibold text-[var(--foreground)]">
                    Visitas mensuales
                    <input
                      type="number"
                      min="0"
                      step="50"
                      value={visits}
                      onChange={(event) => setVisits(event.target.value)}
                      className="input-field"
                    />
                  </label>
                  <label className="text-sm font-semibold text-[var(--foreground)]">
                    Conversión actual (%)
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={conversion}
                      onChange={(event) => setConversion(event.target.value)}
                      className="input-field"
                    />
                  </label>
                  <label className="text-sm font-semibold text-[var(--foreground)]">
                    Ticket promedio (ARS)
                    <input
                      type="number"
                      min="0"
                      step="500"
                      value={ticket}
                      onChange={(event) => setTicket(event.target.value)}
                      className="input-field"
                    />
                  </label>
                </div>
                <p className="text-xs text-[var(--muted)]">
                  Estimación referencial. Los resultados dependen del rubro,
                  tráfico y propuesta de valor.
                </p>
              </div>

              <div className="grid gap-4">
                <div
                  className="reveal rounded-3xl border border-[var(--ring)] bg-[color:var(--surface-strong)] p-6"
                  data-reveal
                  style={withDelay(0)}
                >
                  <p className="kicker">Escenario actual</p>
                  <p className="mt-3 text-3xl font-semibold">
                    {currencyFormatter.format(Math.round(baselineRevenue))}
                  </p>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    Pedidos estimados:{" "}
                    {numberFormatter.format(Math.round(baselineOrders))}
                  </p>
                </div>
                <div
                  className="reveal rounded-3xl border border-[rgba(0,179,164,0.2)] bg-[rgba(0,179,164,0.12)] p-6"
                  data-reveal
                  style={withDelay(1)}
                >
                  <p className="kicker">Escenario optimizado</p>
                  <p className="mt-3 text-3xl font-semibold text-[var(--accent-2)]">
                    {currencyFormatter.format(Math.round(improvedRevenue))}
                  </p>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    Pedidos estimados:{" "}
                    {numberFormatter.format(Math.round(improvedOrders))}
                  </p>
                </div>
                <div
                  className="reveal rounded-3xl border border-[var(--ring)] bg-[color:var(--surface)] p-6"
                  data-reveal
                  style={withDelay(2)}
                >
                  <p className="kicker">Potencial mensual</p>
                  <p className="mt-3 text-2xl font-semibold">
                    +{currencyFormatter.format(Math.round(deltaRevenue))}
                  </p>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    Podemos lograrlo con UX, performance y automatizaciones.
                  </p>
                  <a className="btn-primary mt-4 w-fit" href="#contacto">
                    Quiero optimizar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="turnos"
          className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10"
        >
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6 reveal" data-reveal style={withDelay(0)}>
              <p className="kicker">Simulador de turnos</p>
              <h2 className="section-title">Agenda inteligente para servicios locales</h2>
              <p className="section-subtitle">
                Mostrá tu sistema en acción con un flujo real: elección de
                servicio, profesional, horarios disponibles y automatizaciones
                activas para reducir ausencias.
              </p>
              <div className="flex flex-wrap gap-3">
                {turnosHighlights.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <a className="btn-primary" href="/turnos">
                  Abrir simulador
                </a>
                <a className="btn-secondary" href="/turnos/admin">
                  Ver panel admin
                </a>
                <a className="btn-secondary" href="#contacto">
                  Quiero un sistema así
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass reveal card-tilt rounded-3xl p-6" data-reveal style={withDelay(1)}>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                  <span>Agenda demo</span>
                  <span className="rounded-full bg-[rgba(0,194,168,0.15)] px-3 py-1 text-[0.65rem] font-semibold text-[var(--accent-4)]">
                    Hoy
                  </span>
                </div>
                <div className="mt-5 space-y-3">
                  {turnosPreview.map((item) => (
                    <div
                      key={`${item.time}-${item.name}`}
                      className="flex items-center justify-between rounded-2xl border border-[var(--ring)] bg-[color:var(--surface-strong)] px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-semibold">
                          {item.time} · {item.name}
                        </p>
                        <p className="text-xs text-[var(--muted)]">
                          {item.service}
                        </p>
                      </div>
                      <span className={`status-pill status-pill--${item.status}`}>
                        {turnosStatusLabels[item.status]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {turnosMetrics.map((metric, index) => (
                  <div
                    key={metric.label}
                    className="glass reveal card-tilt rounded-2xl p-4"
                    data-reveal
                    style={withDelay(index + 2)}
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                      {metric.label}
                    </p>
                    <p className="mt-3 text-xl font-semibold">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="inmobiliaria"
          className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10"
        >
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6 reveal" data-reveal style={withDelay(0)}>
              <p className="kicker">Inmobiliaria inmersiva</p>
              <h2 className="section-title">
                Demo para ventas, temporarios y proyectos en pozo
              </h2>
              <p className="section-subtitle">
                Una experiencia visual distinta para presentar inmuebles con
                storytelling, filtros dinámicos y simuladores para inversión y
                ocupación.
              </p>
              <div className="flex flex-wrap gap-3">
                {estateHighlights.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <a className="btn-primary" href="/inmobiliaria">
                  Abrir demo inmobiliaria
                </a>
                <a className="btn-secondary" href="/inmobiliaria/admin">
                  Ver panel admin
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <div
                className="glass reveal card-tilt rounded-3xl p-6"
                data-reveal
                style={withDelay(1)}
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                  <span>Vista rápida</span>
                  <span className="rounded-full bg-[rgba(11,181,139,0.18)] px-3 py-1 text-[0.65rem] font-semibold text-[var(--accent)]">
                    Demo premium
                  </span>
                </div>
                <div className="mt-5 space-y-3">
                  {estatePreview.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center justify-between rounded-2xl border border-[var(--ring)] bg-[color:var(--surface-strong)] px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="text-xs text-[var(--muted)]">
                          {item.location} · {item.tag}
                        </p>
                      </div>
                      <span className={`estate-pill estate-pill--${item.status}`}>
                        {estateStatusLabels[item.status]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {estateMetrics.map((metric, index) => (
                  <div
                    key={metric.label}
                    className="glass reveal card-tilt rounded-2xl p-4"
                    data-reveal
                    style={withDelay(index + 2)}
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                      {metric.label}
                    </p>
                    <p className="mt-3 text-xl font-semibold">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="propiedades-ba"
          className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10"
        >
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6 reveal" data-reveal style={withDelay(0)}>
              <p className="kicker">Listado Propiedades BA</p>
              <h2 className="section-title">
                Rediseño premium para inmobiliarias en Buenos Aires
              </h2>
              <p className="section-subtitle">
                Una propuesta para elevar listados, temporarios y torres en pozo
                con un flujo claro, visual y orientado a leads.
              </p>
              <div className="flex flex-wrap gap-3">
                {baHighlights.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <a className="btn-primary" href="/propiedades-ba">
                  Abrir demo BA
                </a>
                <a className="btn-secondary" href="/propiedades-ba/admin">
                  Ver panel admin
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <div
                className="glass reveal card-tilt rounded-3xl p-6"
                data-reveal
                style={withDelay(1)}
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                  <span>Listado BA</span>
                  <span className="ba-pill ba-pill--disponible">Rediseño</span>
                </div>
                <div className="mt-5 space-y-3">
                  {baPreview.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center justify-between rounded-2xl border border-[var(--ring)] bg-[color:var(--surface-strong)] px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="text-xs text-[var(--muted)]">
                          {item.location} · {item.tag}
                        </p>
                      </div>
                      <span className={`ba-pill ba-pill--${item.status}`}>
                        {baStatusLabels[item.status]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {baMetrics.map((metric, index) => (
                  <div
                    key={metric.label}
                    className="glass reveal card-tilt rounded-2xl p-4"
                    data-reveal
                    style={withDelay(index + 2)}
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                      {metric.label}
                    </p>
                    <p className="mt-3 text-xl font-semibold">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="casos"
          className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10"
        >
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <p className="kicker">Referencias </p>
              <h2 className="section-title">Inspiración</h2>
              <p className="section-subtitle">
                Estos ejemplos son referencias del mercado local y exterior. El
                objetivo es superar ese estándar en tu proyecto.
              </p>
              <a className="btn-primary w-fit" href="#contacto">
                Quiero un ecommerce así
              </a>
            </div>

            <div className="grid gap-6">
              <div
                className="reveal rounded-3xl border border-[var(--ring)] bg-[color:var(--surface-strong)] p-6"
                data-reveal
                style={withDelay(0)}
              >
                <p className="kicker">Preview inmersivo</p>
                <h3 className="mt-3 text-2xl font-semibold">
                  Experiencia visual estilo scrollytelling
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Un vistazo al ritmo visual que vamos a construir para tu
                  ecommerce local.
                </p>
                <div className="mt-5">
                  <SwipeySvgImageGrid items={swipeyItems} revealOn="scroll" />
                </div>
              </div>
              {projects.map((project, index) => (
                <article
                  key={project.title}
                  className="reveal card-tilt rounded-3xl border border-[var(--ring)] bg-[color:var(--surface)] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.1)]"
                  data-reveal
                  style={withDelay(index + 1)}
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                    <span>{project.tag}</span>
                    <div className="flex items-center gap-3">
                      {project.url ? (
                        <a
                          className="rounded-full border border-[var(--ring)] px-3 py-1 text-[0.65rem] font-semibold text-[var(--foreground)] transition hover:-translate-y-[1px]"
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Visitar
                        </a>
                      ) : null}
                      <span className="rounded-full bg-[rgba(0,179,164,0.15)] px-3 py-1 text-[0.65rem] font-semibold text-[var(--accent-2)]">
                        {project.result}
                      </span>
                    </div>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold">{project.title}</h3>
                  <p className="mt-3 text-sm text-[var(--muted)]">
                    {project.description}
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                    {project.note}
                  </p>
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {Array.from({ length: 3 }).map((_, blockIndex) => (
                      <div
                        key={`${project.title}-${blockIndex}`}
                        className="h-20 rounded-2xl bg-[rgba(15,23,42,0.06)]"
                      />
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="proceso"
          className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10"
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-4 reveal" data-reveal style={withDelay(0)}>
              <h2 className="section-title">Proceso claro, entregas rápidas</h2>
              <p className="section-subtitle">
                Una metodología simple y transparente que acelera el time to
                market y reduce fricción.
              </p>
            </div>
            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="reveal card-tilt flex gap-4 rounded-3xl border border-[var(--ring)] bg-[color:var(--surface)] p-6"
                  data-reveal
                  style={withDelay(index)}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(255,107,61,0.15)] text-sm font-semibold text-[var(--accent)]">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm text-[var(--muted)]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10">
          <div className="rounded-[36px] border border-[var(--ring)] bg-[color:var(--surface)] p-10">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="space-y-3">
                <p className="kicker">Stack & herramientas</p>
                <h2 className="section-title">Tecnología pensada para escalar</h2>
              </div>
              <p className="max-w-lg text-sm text-[var(--muted)]">
                Trabajo con herramientas modernas, integraciones seguras y
                performance real para ecommerce y productos digitales.
              </p>
            </div>

            <div className="marquee mt-8">
              <div className="marquee-track">
                {stack.concat(stack).map((tool, index) => (
                  <span key={`${tool}-${index}`} className="stack-pill">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10">
          <div className="max-w-2xl space-y-4 reveal" data-reveal style={withDelay(0)}>
            <h2 className="section-title">Compromisos para tu negocio</h2>
            <p className="section-subtitle">
              Transparencia, velocidad y foco en resultados reales.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {commitments.map((item, index) => (
              <div
                key={item.title}
                className="glass reveal card-tilt rounded-3xl p-8"
                data-reveal
                style={withDelay(index)}
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm text-[var(--muted)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="contacto"
          className="mx-auto w-full max-w-6xl px-6 pb-24 pt-10"
        >
          <div className="glass relative rounded-[40px] p-10 md:p-14">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-4">
                <h2 className="section-title">
                  ¿Listo para vender más?
                </h2>
                <p className="section-subtitle max-w-xl">
                  Agendemos un diagnóstico y definamos el plan para lanzar tu
                  proyecto con impacto escalable.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  className="btn-primary"
                  href="https://wa.me/543794934184?text=Hola%20Mauri%21%20Quiero%20mas%20informacion%20sobre%20tus%20servicios%20de%20desarrollo%20web"
                  target="_blank"
                  rel="noreferrer"
                >
                  Escribime ahora
                </a>
                <a
                  className="btn-secondary"
                  href="https://instagram.com/maurimorell"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
                <a className="btn-secondary" href="#servicios">
                  Ver servicios
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ScrollToTop />

      <footer className="border-t border-[rgba(15,23,42,0.08)] py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-6 text-sm text-[var(--muted)] md:flex-row md:items-center">
          <span>© 2026 Mauricio Morell. Corrientes, Argentina.</span>
          <div className="flex gap-6">
            <a href="#servicios">Servicios</a>
            <a href="#casos">Referencias</a>
            <a href="#contacto">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
