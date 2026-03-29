"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ScrollToTop from "@/components/ui/ScrollToTop";

type PropertyType = "tradicional" | "temporario" | "pozo" | "listo";

type PropertyStatus = "disponible" | "reservado" | "vendido";

type Property = {
  id: string;
  title: string;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  location: string;
  area: number;
  rooms: number;
  tag: string;
};

const propertyTypes: Array<{ id: "all" | PropertyType; label: string }> = [
  { id: "all", label: "Todos" },
  { id: "tradicional", label: "Tradicional" },
  { id: "temporario", label: "Temporario" },
  { id: "pozo", label: "En pozo" },
  { id: "listo", label: "Listo" },
];

const statusLabels: Record<PropertyStatus, string> = {
  disponible: "Disponible",
  reservado: "Reservado",
  vendido: "Vendido",
};

const properties: Property[] = [
  {
    id: "prop-01",
    title: "Skyline Rivera",
    type: "pozo",
    status: "disponible",
    price: 98000000,
    location: "Centro · Corrientes",
    area: 78,
    rooms: 3,
    tag: "Torre premium",
  },
  {
    id: "prop-02",
    title: "Tempo Costanera",
    type: "temporario",
    status: "reservado",
    price: 65000,
    location: "Costanera · 2 noches",
    area: 52,
    rooms: 2,
    tag: "Full amenities",
  },
  {
    id: "prop-03",
    title: "Bosque Alto",
    type: "listo",
    status: "disponible",
    price: 135000000,
    location: "Parque Mitre",
    area: 96,
    rooms: 4,
    tag: "Entrega inmediata",
  },
  {
    id: "prop-04",
    title: "Vista Norte",
    type: "tradicional",
    status: "vendido",
    price: 112000000,
    location: "Barrio Camba",
    area: 88,
    rooms: 3,
    tag: "Vista abierta",
  },
  {
    id: "prop-05",
    title: "Lago Urbano",
    type: "pozo",
    status: "disponible",
    price: 89000000,
    location: "Macrocentro",
    area: 72,
    rooms: 3,
    tag: "Últimas unidades",
  },
  {
    id: "prop-06",
    title: "Tempo Río",
    type: "temporario",
    status: "disponible",
    price: 54000,
    location: "Costanera · 3 noches",
    area: 48,
    rooms: 2,
    tag: "Check-in smart",
  },
];

const experienceSteps = [
  {
    title: "Exploración inmersiva",
    description: "Tours visuales, filtros inteligentes y shortlist inmediato.",
  },
  {
    title: "Asesoría en tiempo real",
    description: "Chat, WhatsApp y agenda con asesores para acelerar visitas.",
  },
  {
    title: "Cierre guiado",
    description: "Documentación, pagos y avances en un flujo transparente.",
  },
];

const investmentStages = [
  {
    title: "Lanzamiento",
    detail: "Reservas con precio preferencial y financiación flexible.",
  },
  {
    title: "Avance de obra",
    detail: "Reportes mensuales con renders, fotos y hitos clave.",
  },
  {
    title: "Entrega",
    detail: "Entrega de unidades y coordinación postventa.",
  },
];

const currencyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const toNumber = (value: string) => {
  const normalized = value.replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};

const estateTheme: CSSProperties = {
  "--accent": "#0bb58b",
  "--accent-2": "#6ec3ff",
  "--accent-3": "#ffb347",
  "--accent-4": "#7f7cff",
};

export default function InmobiliariaPage() {
  const [activeType, setActiveType] = useState<"all" | PropertyType>("all");
  const [nightlyRate, setNightlyRate] = useState("65000");
  const [occupancy, setOccupancy] = useState("72");

  const filteredProperties = useMemo(() => {
    if (activeType === "all") return properties;
    return properties.filter((property) => property.type === activeType);
  }, [activeType]);

  const featuredProperty = filteredProperties[0] ?? properties[0];

  const nightlyRateNumber = Math.max(0, toNumber(nightlyRate));
  const occupancyNumber = Math.min(Math.max(0, toNumber(occupancy)), 100);
  const bookedNights = Math.round((occupancyNumber / 100) * 30);
  const estimatedRevenue = nightlyRateNumber * bookedNights;

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

  return (
    <div className="estate-shell" style={estateTheme}>
      <ScrollProgress variant="bar" position="top" />
      <div className="estate-bg">
        <div className="estate-orb estate-orb--a" />
        <div className="estate-orb estate-orb--b" />
        <div className="estate-orb estate-orb--c" />
      </div>

      <header className="estate-header">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-[var(--accent)]" />
            <span className="text-lg font-semibold tracking-tight">
              maumorell real estate lab
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)] md:flex">
            <a href="#catalogo">// catálogo</a>
            <a href="#temporarios">// temporarios</a>
            <a href="#pozo">// en pozo</a>
          </nav>
          <div className="flex items-center gap-3">
            <a className="btn-secondary" href="/inmobiliaria/admin">
              Panel admin
            </a>
            <a className="btn-secondary" href="/">
              Volver al home
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto w-full max-w-6xl px-6 pb-20 pt-24">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6 reveal" data-reveal>
              <p className="estate-kicker">Demo inmersiva</p>
              <h1 className="estate-title">
                Inmobiliaria inteligente para ventas, temporarios y proyectos en
                pozo.
              </h1>
              <p className="estate-subtitle">
                Una experiencia inmersiva para mostrar propiedades con filtros
                dinámicos, recorridos visuales y acciones rápidas que convierten
                interesados en visitas.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="estate-chip">Tours 360</span>
                <span className="estate-chip">Shortlist inteligente</span>
                <span className="estate-chip">Agenda de visitas</span>
                <span className="estate-chip">Analytics premium</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <a className="btn-primary" href="#catalogo">
                  Explorar catálogo
                </a>
                <a className="btn-secondary" href="/#contacto">
                  Quiero esta experiencia
                </a>
              </div>
            </div>

            <div className="estate-hero-card reveal" data-reveal>
              <div className="estate-hero-media">
                <div className="estate-hero-glow" />
              </div>
              <div className="estate-hero-content">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                  <span>Destacado</span>
                  <span className="estate-pill estate-pill--disponible">
                    Disponible
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold">
                  {featuredProperty?.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {featuredProperty?.location}
                </p>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="estate-metric">
                    <p className="estate-metric__label">Superficie</p>
                    <p className="estate-metric__value">
                      {featuredProperty?.area} m²
                    </p>
                  </div>
                  <div className="estate-metric">
                    <p className="estate-metric__label">Ambientes</p>
                    <p className="estate-metric__value">
                      {featuredProperty?.rooms}
                    </p>
                  </div>
                  <div className="estate-metric">
                    <p className="estate-metric__label">Ticket</p>
                    <p className="estate-metric__value">
                      {featuredProperty
                        ? currencyFormatter.format(featuredProperty.price)
                        : "--"}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="estate-tag">{featuredProperty?.tag}</span>
                  <span className="estate-tag">Visita virtual</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="catalogo" className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-3 reveal" data-reveal>
              <p className="estate-kicker">Catálogo inteligente</p>
              <h2 className="estate-section-title">Descubrí propiedades por tipo</h2>
              <p className="estate-subtitle">
                Seleccioná el segmento y explorá propiedades con info completa,
                estados y microinteracciones.
              </p>
            </div>
            <div className="estate-toggle">
              {propertyTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  className={`estate-toggle__pill ${
                    activeType === type.id ? "is-active" : ""
                  }`}
                  onClick={() => setActiveType(type.id)}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="estate-grid mt-10">
            {filteredProperties.map((property, index) => (
              <article
                key={property.id}
                className="estate-card reveal"
                data-reveal
                style={{ "--delay": `${index * 80}ms` } as CSSProperties}
              >
                <div className="estate-card__media">
                  <span className={`estate-pill estate-pill--${property.status}`}>
                    {statusLabels[property.status]}
                  </span>
                </div>
                <div className="estate-card__body">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                    <span>{property.location}</span>
                    <span>{property.tag}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold">
                    {property.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    {property.rooms} ambientes · {property.area} m²
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="estate-price">
                      {currencyFormatter.format(property.price)}
                    </span>
                    <button className="estate-link" type="button">
                      Ver detalle →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="temporarios" className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-6 reveal" data-reveal>
              <p className="estate-kicker">Temporarios</p>
              <h2 className="estate-section-title">Simulador de ingreso mensual</h2>
              <p className="estate-subtitle">
                Calculá el potencial de un departamento temporario según tarifa
                y ocupación estimada.
              </p>
              <div className="estate-sim">
                <label className="estate-label">
                  Tarifa por noche (ARS)
                  <input
                    className="estate-input"
                    type="number"
                    min="0"
                    value={nightlyRate}
                    onChange={(event) => setNightlyRate(event.target.value)}
                  />
                </label>
                <label className="estate-label">
                  Ocupación mensual (%)
                  <input
                    className="estate-input"
                    type="number"
                    min="0"
                    max="100"
                    value={occupancy}
                    onChange={(event) => setOccupancy(event.target.value)}
                  />
                </label>
              </div>
              <div className="estate-sim__results">
                <div>
                  <p className="estate-metric__label">Noches ocupadas</p>
                  <p className="estate-metric__value">{bookedNights} noches</p>
                </div>
                <div>
                  <p className="estate-metric__label">Ingreso estimado</p>
                  <p className="estate-metric__value">
                    {currencyFormatter.format(estimatedRevenue)}
                  </p>
                </div>
              </div>
              <p className="text-xs text-[var(--muted)]">
                Estimación referencial para comparar escenarios.
              </p>
            </div>

            <div className="estate-panel reveal" data-reveal>
              <div className="estate-panel__header">
                <p className="estate-kicker">Temporarios activos</p>
                <span className="estate-pill estate-pill--disponible">89% ocup.</span>
              </div>
              <div className="estate-panel__body">
                <div className="estate-panel__item">
                  <div>
                    <p className="estate-panel__title">Tempo Río</p>
                    <p className="estate-panel__meta">Check-in smart · 2 huéspedes</p>
                  </div>
                  <span className="estate-tag">Disponible</span>
                </div>
                <div className="estate-panel__item">
                  <div>
                    <p className="estate-panel__title">Tempo Costanera</p>
                    <p className="estate-panel__meta">Full amenities · 3 huéspedes</p>
                  </div>
                  <span className="estate-tag">Reservado</span>
                </div>
                <div className="estate-panel__item">
                  <div>
                    <p className="estate-panel__title">Tempo Centro</p>
                    <p className="estate-panel__meta">Self check-in · 1 huésped</p>
                  </div>
                  <span className="estate-tag">Disponible</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pozo" className="mx-auto w-full max-w-6xl px-6 pb-24 pt-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6 reveal" data-reveal>
              <p className="estate-kicker">Torre en pozo</p>
              <h2 className="estate-section-title">Venta de proyectos desde el lanzamiento</h2>
              <p className="estate-subtitle">
                Mostrá avances, disponibilidad y beneficios de inversión con un
                storytelling visual claro.
              </p>
              <div className="estate-timeline">
                {investmentStages.map((stage) => (
                  <div key={stage.title} className="estate-timeline__item">
                    <div className="estate-timeline__dot" />
                    <div>
                      <h3 className="text-lg font-semibold">{stage.title}</h3>
                      <p className="text-sm text-[var(--muted)]">{stage.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="estate-vision reveal" data-reveal>
              <div className="estate-vision__panel">
                <p className="estate-kicker">Experiencia inmersiva</p>
                <h3 className="mt-3 text-2xl font-semibold">
                  Presentaciones que cierran ventas
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Renders, recorridos y dashboards para transmitir confianza y
                  acelerar decisiones de inversión.
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {experienceSteps.map((step) => (
                    <div key={step.title} className="estate-mini-card">
                      <h4 className="text-sm font-semibold">{step.title}</h4>
                      <p className="mt-2 text-xs text-[var(--muted)]">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="estate-vision__image" />
            </div>
          </div>
        </section>
      </main>

      <ScrollToTop />

      <footer className="estate-footer">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-6 text-sm text-[var(--muted)] md:flex-row md:items-center">
          <span>© 2026 Mauricio Morell. Corrientes, Argentina.</span>
          <div className="flex gap-6">
            <a href="#catalogo">Catálogo</a>
            <a href="#temporarios">Temporarios</a>
            <a href="#pozo">En pozo</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
