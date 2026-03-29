"use client";

import { use, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ScrollToTop from "@/components/ui/ScrollToTop";
import {
  amenities,
  properties,
  propertyTypeLabels,
  statusLabels,
} from "../data";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const currencyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const baTheme: CSSProperties = {
  "--accent": "#1bb3a9",
  "--accent-2": "#5b8cff",
  "--accent-3": "#ffb347",
  "--accent-4": "#8ee06c",
};

const detailHighlights = {
  tradicional: [
    "Documentación completa",
    "Coordinación de visitas",
    "Entrega inmediata",
  ],
  temporario: [
    "Check-in inteligente",
    "Revenue management",
    "Gestión de limpieza",
  ],
  pozo: [
    "Financiación por etapas",
    "Renders y avances",
    "Reservas online",
  ],
  listo: [
    "Mudanza rápida",
    "Crédito hipotecario",
    "Inventario listo",
  ],
};

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1400&q=80",
    label: "Living integrado",
  },
  {
    src: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1400&q=80",
    label: "Dormitorio principal",
  },
  {
    src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80",
    label: "Cocina abierta",
  },
  {
    src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80",
    label: "Amenities & lobby",
  },
];

const calloutContent = {
  tradicional: {
    kicker: "Venta tradicional",
    title: "Una experiencia de compra clara y sin fricciones",
    description:
      "Automatizá visitas, documentación y seguimiento con asesores dedicados.",
    stats: [
      { label: "Visitas/semana", value: "12" },
      { label: "Tiempo cierre", value: "38 días" },
    ],
  },
  temporario: {
    kicker: "Temporarios premium",
    title: "Optimización de ingresos mes a mes",
    description:
      "Dashboard de ocupación, tarifas dinámicas y comunicación automática.",
    stats: [
      { label: "Ocupación", value: "82%" },
      { label: "ADR", value: "$72k" },
    ],
  },
  pozo: {
    kicker: "Torres en pozo",
    title: "Inversión con seguimiento y confianza",
    description:
      "Flujos de avance de obra, reservas digitales y calendario de hitos.",
    stats: [
      { label: "Entrega", value: "Q3 2026" },
      { label: "Reservas", value: "78%" },
    ],
  },
  listo: {
    kicker: "Listos para habitar",
    title: "Inventario listo con alto interés",
    description:
      "Mostrá disponibilidad en tiempo real y agenda de visitas inmediata.",
    stats: [
      { label: "Disponibles", value: "9" },
      { label: "Consultas", value: "28" },
    ],
  },
};

export default function PropiedadDetallePage({ params }: PageProps) {
  const { id } = use(params);
  const property = properties.find((item) => item.id === id);
  const [activeSlide, setActiveSlide] = useState(0);

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

  if (!property) {
    return (
      <div className="ba-shell" style={baTheme}>
        <header className="ba-header">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
            <a href="/" className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-[var(--accent)]" />
              <span className="text-lg font-semibold tracking-tight">
                Listado Propiedades BA · Demo
              </span>
            </a>
            <div className="flex items-center gap-3">
              <a className="btn-secondary" href="/propiedades-ba">
                Volver al catálogo
              </a>
            </div>
          </div>
        </header>
        <main className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-6 pb-24 pt-24 text-center">
          <p className="ba-kicker">No encontrada</p>
          <h1 className="ba-title">Esta propiedad no existe.</h1>
          <p className="ba-subtitle">
            Volvé al catálogo para explorar otras opciones disponibles.
          </p>
          <a className="btn-primary" href="/propiedades-ba">
            Ir al catálogo
          </a>
        </main>
      </div>
    );
  }

  const priceLabel =
    property.type === "temporario"
      ? `${currencyFormatter.format(property.price)} / noche`
      : currencyFormatter.format(property.price);

  const callout = calloutContent[property.type];
  const mapQuery = encodeURIComponent(
    `${property.neighborhood}, Buenos Aires, Argentina`
  );
  const mapSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
  const slideCount = galleryImages.length;

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % slideCount);
  };

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
            <a href="#detalle">// detalle</a>
            <a href="#amenities">// amenities</a>
            <a href="#contacto">// contacto</a>
          </nav>
          <div className="flex items-center gap-3">
            <a className="btn-secondary" href="/propiedades-ba">
              Volver al catálogo
            </a>
            <a className="btn-secondary" href="/propiedades-ba/admin">
              Panel admin
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-24">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6 reveal" data-reveal>
              <p className="ba-kicker">Ficha de propiedad</p>
              <h1 className="ba-title">{property.title}</h1>
              <p className="ba-subtitle">
                {property.neighborhood} · {property.rooms} ambientes · {property.area} m²
              </p>
              <div className="flex flex-wrap gap-3">
                <span className={`ba-pill ba-pill--${property.status}`}>
                  {statusLabels[property.status]}
                </span>
                <span className="ba-pill">{propertyTypeLabels[property.type]}</span>
                <span className="ba-pill">{property.tag}</span>
                <span className="ba-pill">{property.highlight}</span>
              </div>
              <div className="ba-detail-specs">
                <div className="ba-detail-spec">
                  <span>Precio</span>
                  <strong>{priceLabel}</strong>
                </div>
                <div className="ba-detail-spec">
                  <span>Tipo</span>
                  <strong>{propertyTypeLabels[property.type]}</strong>
                </div>
                <div className="ba-detail-spec">
                  <span>Entrega</span>
                  <strong>{property.type === "pozo" ? "Q3 2026" : "Inmediata"}</strong>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <a className="btn-primary" href="/#contacto">
                  Agendar visita
                </a>
                <a className="btn-secondary" href="/propiedades-ba">
                  Volver al catálogo
                </a>
              </div>
            </div>

            <div className="ba-hero-card reveal" data-reveal>
              <div className="ba-hero-media ba-detail-media">
                <div className="ba-sheen" />
                <span className="ba-detail-badge">Tour 360 disponible</span>
              </div>
              <div className="ba-hero-content">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                  <span>Resumen</span>
                  <span className="ba-pill ba-pill--disponible">Ficha premium</span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="ba-metric">
                    <p className="ba-metric__label">Ambientes</p>
                    <p className="ba-metric__value">{property.rooms}</p>
                  </div>
                  <div className="ba-metric">
                    <p className="ba-metric__label">Superficie</p>
                    <p className="ba-metric__value">{property.area} m²</p>
                  </div>
                  <div className="ba-metric">
                    <p className="ba-metric__label">Estado</p>
                    <p className="ba-metric__value">
                      {statusLabels[property.status]}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {detailHighlights[property.type].map((item) => (
                    <span key={item} className="ba-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="detalle" className="mx-auto w-full max-w-6xl px-6 pb-20">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div className="ba-slider reveal" data-reveal>
                <div className="ba-slider__viewport">
                  <div
                    className="ba-slider__track"
                    style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                  >
                    {galleryImages.map((image) => (
                      <figure key={image.src} className="ba-slider__slide">
                        <img src={image.src} alt={image.label} />
                        <figcaption>{image.label}</figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
                <div className="ba-slider__controls">
                  <button className="ba-slider__btn" type="button" onClick={handlePrev}>
                    ← Anterior
                  </button>
                  <div className="ba-slider__dots">
                    {galleryImages.map((image, index) => (
                      <button
                        key={image.src}
                        type="button"
                        className={`ba-slider__dot ${
                          activeSlide === index ? "is-active" : ""
                        }`}
                        onClick={() => setActiveSlide(index)}
                        aria-label={`Ir a ${image.label}`}
                      />
                    ))}
                  </div>
                  <button className="ba-slider__btn" type="button" onClick={handleNext}>
                    Siguiente →
                  </button>
                </div>
                <div className="ba-slider__thumbs">
                  {galleryImages.map((image, index) => (
                    <button
                      key={image.src}
                      type="button"
                      className={`ba-slider__thumb ${
                        activeSlide === index ? "is-active" : ""
                      }`}
                      style={{ backgroundImage: `url(${image.src})` }}
                      onClick={() => setActiveSlide(index)}
                      aria-label={`Seleccionar ${image.label}`}
                    />
                  ))}
                </div>
              </div>

              <div className="ba-panel reveal" data-reveal>
                <p className="ba-kicker">Descripción</p>
                <h2 className="ba-section-title">Detalles principales</h2>
                <p className="ba-subtitle">
                  {property.title} combina diseño moderno, ubicación estratégica
                  en {property.neighborhood} y un flujo de consulta listo para
                  convertir interesados en visitas reales.
                </p>
                <div className="ba-detail-list">
                  {detailHighlights[property.type].map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div id="amenities" className="ba-panel reveal" data-reveal>
                <p className="ba-kicker">Amenities</p>
                <h2 className="ba-section-title">Servicios incluidos</h2>
                <div className="ba-detail-list">
                  {amenities.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>

              <div className="ba-panel ba-map reveal" data-reveal>
                <p className="ba-kicker">Ubicación</p>
                <h2 className="ba-section-title">Mapa de zona</h2>
                <div className="ba-map__frame">
                  <iframe
                    className="ba-map__iframe"
                    title={`Mapa de ${property.neighborhood}`}
                    src={mapSrc}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                  <span className="ba-map__label">{property.neighborhood}</span>
                </div>
                <p className="text-sm text-[var(--muted)]">
                  Ubicación estratégica con acceso rápido a zonas comerciales y
                  transporte.
                </p>
              </div>

              <div className="ba-panel ba-detail-callout reveal" data-reveal>
                <p className="ba-kicker">{callout.kicker}</p>
                <h3 className="mt-3 text-2xl font-semibold">{callout.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {callout.description}
                </p>
                <div className="ba-detail-callout__stats">
                  {callout.stats.map((stat) => (
                    <div key={stat.label} className="ba-detail-callout__stat">
                      <span>{stat.label}</span>
                      <strong>{stat.value}</strong>
                    </div>
                  ))}
                </div>
                <a className="btn-secondary mt-4 w-fit" href="/#contacto">
                  Quiero este formato
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="mx-auto w-full max-w-6xl px-6 pb-24">
          <div className="ba-panel reveal" data-reveal>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="ba-kicker">Contacto rápido</p>
                <h2 className="ba-section-title">Agendemos una visita</h2>
                <p className="ba-subtitle">
                  Coordiná una visita presencial o virtual con nuestro equipo
                  comercial.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a className="btn-primary" href="/#contacto">
                  Agendar ahora
                </a>
                <a className="btn-secondary" href="/propiedades-ba">
                  Ver más propiedades
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ScrollToTop />

      <footer className="ba-footer">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-6 text-sm text-[var(--muted)] md:flex-row md:items-center">
          <span>© 2026 Mauricio Morell. Corrientes, Argentina.</span>
          <div className="flex gap-6">
            <a href="#detalle">Detalle</a>
            <a href="#amenities">Amenities</a>
            <a href="#contacto">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
