"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ScrollToTop from "@/components/ui/ScrollToTop";
import {
  amenities,
  neighborhoods,
  properties,
  statusLabels,
  type PropertyType,
} from "./data";

const typeFilters: Array<{ id: "all" | PropertyType; label: string }> = [
  { id: "all", label: "Todos" },
  { id: "tradicional", label: "Tradicional" },
  { id: "temporario", label: "Temporario" },
  { id: "pozo", label: "En pozo" },
  { id: "listo", label: "Listo" },
];


const investmentStages = [
  {
    title: "Lanzamiento",
    detail: "Reservas con valores preferenciales y comunicación clara.",
  },
  {
    title: "Avance de obra",
    detail: "Reportes mensuales, renders y actualizaciones por hito.",
  },
  {
    title: "Entrega",
    detail: "Coordinación de entrega y postventa sin fricciones.",
  },
];

const experienceSteps = [
  {
    title: "Recorrido inmersivo",
    description: "Galerías 360, tours interactivos y shortlists inteligentes.",
  },
  {
    title: "Agenda inteligente",
    description: "Visitas automáticas, calendario y recordatorios.",
  },
  {
    title: "Cierre guiado",
    description: "Documentación, pagos y seguimiento en un solo panel.",
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

const baTheme: CSSProperties = {
  "--accent": "#1bb3a9",
  "--accent-2": "#5b8cff",
  "--accent-3": "#ffb347",
  "--accent-4": "#8ee06c",
};

export default function PropiedadesBaPage() {
  const [activeType, setActiveType] = useState<"all" | PropertyType>("all");
  const [neighborhood, setNeighborhood] = useState("all");
  const [minRooms, setMinRooms] = useState("all");
  const [sort, setSort] = useState("featured");
  const [nightlyRate, setNightlyRate] = useState("72000");
  const [occupancy, setOccupancy] = useState("76");

  const filteredProperties = useMemo(() => {
    let list = [...properties];
    if (activeType !== "all") {
      list = list.filter((property) => property.type === activeType);
    }
    if (neighborhood !== "all") {
      list = list.filter((property) => property.neighborhood === neighborhood);
    }
    if (minRooms !== "all") {
      const rooms = Number(minRooms);
      list = list.filter((property) => property.rooms >= rooms);
    }
    if (sort === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    }
    if (sort === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    }
    return list;
  }, [activeType, minRooms, neighborhood, sort]);

  const nightlyRateNumber = Math.max(0, toNumber(nightlyRate));
  const occupancyNumber = Math.min(Math.max(0, toNumber(occupancy)), 100);
  const bookedNights = Math.round((occupancyNumber / 100) * 30);
  const revenue = nightlyRateNumber * bookedNights;

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
    <div className="ba-shell" style={baTheme}>
      <ScrollProgress variant="bar" position="top" />
      <div className="ba-bg">
        <div className="ba-orb ba-orb--one" />
        <div className="ba-orb ba-orb--two" />
        <div className="ba-orb ba-orb--three" />
      </div>

      <header className="ba-header">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-[var(--accent)]" />
            <span className="text-lg font-semibold tracking-tight">
              Listado Propiedades BA · Demo
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)] md:flex">
            <a href="#catalogo">// catálogo</a>
            <a href="#temporarios">// temporarios</a>
            <a href="#pozo">// en pozo</a>
          </nav>
          <div className="flex items-center gap-3">
            <a className="btn-secondary" href="/propiedades-ba/admin">
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
              <p className="ba-kicker">Rediseño inmersivo</p>
              <h1 className="ba-title">
                Encontrá tu próximo hogar con un catálogo claro, dinámico e
                inteligente.
              </h1>
              <p className="ba-subtitle">
                Una propuesta premium para mostrar departamentos tradicionales,
                temporarios, torres en pozo y unidades listas, con animaciones
                suaves y un flujo pensado para convertir visitas en consultas.
              </p>
              <div className="ba-tags">
                <span>Filtros dinámicos</span>
                <span>Visitas programadas</span>
                <span>Agenda con asesores</span>
                <span>Dashboards en vivo</span>
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

            <div className="ba-hero-card reveal" data-reveal>
              <div className="ba-hero-media">
                <div className="ba-sheen" />
              </div>
              <div className="ba-hero-content">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                  <span>Destacado</span>
                  <span className="ba-pill ba-pill--disponible">Disponible</span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold">Torre Rivera</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Puerto Madero · 3 ambientes · 78 m²
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="ba-metric">
                    <p className="ba-metric__label">Ticket</p>
                    <p className="ba-metric__value">$98M</p>
                  </div>
                  <div className="ba-metric">
                    <p className="ba-metric__label">Entrega</p>
                    <p className="ba-metric__value">Q3 2026</p>
                  </div>
                  <div className="ba-metric">
                    <p className="ba-metric__label">Reservas</p>
                    <p className="ba-metric__value">78%</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="ba-pill">Vista al río</span>
                  <span className="ba-pill">Amenities</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="catalogo" className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-3 reveal" data-reveal>
              <p className="ba-kicker">Catálogo inteligente</p>
              <h2 className="ba-section-title">Explorá propiedades por tipo</h2>
              <p className="ba-subtitle">
                Filtros claros, navegación visual y acciones rápidas para cada
                segmento.
              </p>
            </div>
            <div className="ba-toggle">
              {typeFilters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  className={`ba-toggle__pill ${
                    activeType === filter.id ? "is-active" : ""
                  }`}
                  onClick={() => setActiveType(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="ba-filter" data-reveal>
            <div className="ba-filter__group">
              <label className="ba-label">Barrio</label>
              <select
                className="ba-select"
                value={neighborhood}
                onChange={(event) => setNeighborhood(event.target.value)}
              >
                <option value="all">Todos</option>
                {neighborhoods.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="ba-filter__group">
              <label className="ba-label">Ambientes</label>
              <select
                className="ba-select"
                value={minRooms}
                onChange={(event) => setMinRooms(event.target.value)}
              >
                <option value="all">Todos</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
            <div className="ba-filter__group">
              <label className="ba-label">Ordenar por</label>
              <select
                className="ba-select"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio menor</option>
                <option value="price-desc">Precio mayor</option>
              </select>
            </div>
            <div className="ba-filter__amenities">
              {amenities.map((amenity) => (
                <span key={amenity} className="ba-amenity">
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          <div className="ba-note reveal" data-reveal>
            <div>
              <p className="ba-kicker">Nota</p>
              <p className="ba-subtitle">
                Podés entrar a la ficha completa desde estos productos de la
                demo.
              </p>
            </div>
            <div className="ba-note__links">
              {properties.map((property) => (
                <a
                  key={property.id}
                  className="ba-note__link"
                  href={`/propiedades-ba/${property.id}`}
                >
                  {property.title}
                </a>
              ))}
            </div>
          </div>

          <div className="ba-grid">
            {filteredProperties.map((property, index) => (
              <article
                key={property.id}
                className="ba-card reveal"
                data-reveal
                style={{ "--delay": `${index * 80}ms` } as CSSProperties}
              >
                <div className="ba-card__media">
                  <span className={`ba-pill ba-pill--${property.status}`}>
                    {statusLabels[property.status]}
                  </span>
                  <span className="ba-card__tag">{property.highlight}</span>
                </div>
                <div className="ba-card__body">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                    <span>{property.neighborhood}</span>
                    <span>{property.tag}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold">
                    {property.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    {property.rooms} ambientes · {property.area} m²
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="ba-price">
                      {currencyFormatter.format(property.price)}
                    </span>
                    <a className="ba-link" href={`/propiedades-ba/${property.id}`}>
                      Ver ficha →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="temporarios" className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-6 reveal" data-reveal>
              <p className="ba-kicker">Temporarios</p>
              <h2 className="ba-section-title">Simulador de ingreso mensual</h2>
              <p className="ba-subtitle">
                Ajustá tarifa y ocupación para visualizar ingresos estimados en
                departamentos temporarios.
              </p>
              <div className="ba-sim">
                <label className="ba-label">
                  Tarifa por noche (ARS)
                  <input
                    className="ba-input"
                    type="number"
                    min="0"
                    value={nightlyRate}
                    onChange={(event) => setNightlyRate(event.target.value)}
                  />
                </label>
                <label className="ba-label">
                  Ocupación mensual (%)
                  <input
                    className="ba-input"
                    type="number"
                    min="0"
                    max="100"
                    value={occupancy}
                    onChange={(event) => setOccupancy(event.target.value)}
                  />
                </label>
              </div>
              <div className="ba-sim__results">
                <div>
                  <p className="ba-metric__label">Noches ocupadas</p>
                  <p className="ba-metric__value">{bookedNights} noches</p>
                </div>
                <div>
                  <p className="ba-metric__label">Ingreso estimado</p>
                  <p className="ba-metric__value">
                    {currencyFormatter.format(revenue)}
                  </p>
                </div>
              </div>
            </div>

            <div className="ba-panel reveal" data-reveal>
              <div className="ba-panel__header">
                <p className="ba-kicker">Temporarios activos</p>
                <span className="ba-pill ba-pill--disponible">88% ocup.</span>
              </div>
              <div className="ba-panel__body">
                <div className="ba-panel__item">
                  <div>
                    <p className="ba-panel__title">Tempo Palermo</p>
                    <p className="ba-panel__meta">Check-in smart · 2 huéspedes</p>
                  </div>
                  <span className="ba-pill">Disponible</span>
                </div>
                <div className="ba-panel__item">
                  <div>
                    <p className="ba-panel__title">Tempo Recoleta</p>
                    <p className="ba-panel__meta">Full amenities · 3 huéspedes</p>
                  </div>
                  <span className="ba-pill">Reservado</span>
                </div>
                <div className="ba-panel__item">
                  <div>
                    <p className="ba-panel__title">Tempo Microcentro</p>
                    <p className="ba-panel__meta">Self check-in · 1 huésped</p>
                  </div>
                  <span className="ba-pill">Disponible</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pozo" className="mx-auto w-full max-w-6xl px-6 pb-24 pt-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6 reveal" data-reveal>
              <p className="ba-kicker">Torres en pozo</p>
              <h2 className="ba-section-title">Lanzamientos con narrativa clara</h2>
              <p className="ba-subtitle">
                Presentá inversión en pozo con storytelling visual, avances y
                disponibilidad por etapa.
              </p>
              <div className="ba-timeline">
                {investmentStages.map((stage) => (
                  <div key={stage.title} className="ba-timeline__item">
                    <div className="ba-timeline__dot" />
                    <div>
                      <h3 className="text-lg font-semibold">{stage.title}</h3>
                      <p className="text-sm text-[var(--muted)]">{stage.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ba-vision reveal" data-reveal>
              <div className="ba-vision__panel">
                <p className="ba-kicker">Experiencia premium</p>
                <h3 className="mt-3 text-2xl font-semibold">
                  Diseñada para convertir interesados en reservas
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Landing cinematográfica, catálogo inteligente y flujo de
                  contacto rápido con asesores dedicados.
                </p>
                <div className="ba-vision__cards">
                  {experienceSteps.map((step) => (
                    <div key={step.title} className="ba-mini-card">
                      <h4 className="text-sm font-semibold">{step.title}</h4>
                      <p className="mt-2 text-xs text-[var(--muted)]">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="ba-vision__image" />
            </div>
          </div>
        </section>
      </main>

      <ScrollToTop />

      <footer className="ba-footer">
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
