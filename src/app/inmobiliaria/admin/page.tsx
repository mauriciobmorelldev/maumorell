"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ScrollToTop from "@/components/ui/ScrollToTop";

type PropertyType = "tradicional" | "temporario" | "pozo" | "listo";

type LeadStage =
  | "nuevo"
  | "contactado"
  | "visita"
  | "propuesta"
  | "reserva"
  | "cerrado"
  | "perdido";

type Listing = {
  id: string;
  title: string;
  type: PropertyType;
  price: number;
  neighborhood: string;
  status: string;
};

type Lead = {
  id: string;
  client: string;
  listingId: string;
  stage: LeadStage;
  budget: number;
  channel: string;
  assignedTo: string;
  nextAction: string;
};

type Visit = {
  id: string;
  time: string;
  client: string;
  listingId: string;
  mode: string;
  advisor: string;
};

const listings: Listing[] = [
  {
    id: "ba-01",
    title: "Torre Rivera",
    type: "pozo",
    price: 98000000,
    neighborhood: "Puerto Madero",
    status: "En pozo",
  },
  {
    id: "ba-02",
    title: "Tempo Palermo",
    type: "temporario",
    price: 72000,
    neighborhood: "Palermo",
    status: "Temporario",
  },
  {
    id: "ba-03",
    title: "Lumiere Recoleta",
    type: "listo",
    price: 158000000,
    neighborhood: "Recoleta",
    status: "Listo",
  },
  {
    id: "ba-04",
    title: "Loft Norte",
    type: "tradicional",
    price: 119000000,
    neighborhood: "Belgrano",
    status: "Tradicional",
  },
];

const advisors = ["Sofia", "Mateo", "Lola", "Nico"];

const stageLabels: Record<LeadStage, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  visita: "Visita",
  propuesta: "Propuesta",
  reserva: "Reserva",
  cerrado: "Cerrado",
  perdido: "Perdido",
};

const stageOrder: Record<LeadStage, number> = {
  nuevo: 0,
  contactado: 1,
  visita: 2,
  propuesta: 3,
  reserva: 4,
  cerrado: 5,
  perdido: 6,
};

const typeLabelMap: Record<PropertyType, string> = {
  tradicional: "Tradicional",
  temporario: "Temporario",
  pozo: "En pozo",
  listo: "Listo",
};

const stageFilters: Array<{ id: LeadStage | "all"; label: string }> = [
  { id: "all", label: "Todos" },
  { id: "nuevo", label: "Nuevos" },
  { id: "contactado", label: "Contactados" },
  { id: "visita", label: "Visitas" },
  { id: "propuesta", label: "Propuestas" },
  { id: "reserva", label: "Reservas" },
  { id: "cerrado", label: "Cerrados" },
  { id: "perdido", label: "Perdidos" },
];

const typeFilters: Array<{ id: PropertyType | "all"; label: string }> = [
  { id: "all", label: "Todos" },
  { id: "tradicional", label: "Tradicional" },
  { id: "temporario", label: "Temporario" },
  { id: "pozo", label: "En pozo" },
  { id: "listo", label: "Listo" },
];

const seedLeads: Lead[] = [
  {
    id: "lead-01",
    client: "Camila R.",
    listingId: "ba-01",
    stage: "nuevo",
    budget: 125000000,
    channel: "Web",
    assignedTo: "Sofia",
    nextAction: "Enviar brochure",
  },
  {
    id: "lead-02",
    client: "Joaquin M.",
    listingId: "ba-02",
    stage: "contactado",
    budget: 85000,
    channel: "WhatsApp",
    assignedTo: "Mateo",
    nextAction: "Confirmar check-in",
  },
  {
    id: "lead-03",
    client: "Laura S.",
    listingId: "ba-03",
    stage: "visita",
    budget: 170000000,
    channel: "Instagram",
    assignedTo: "Lola",
    nextAction: "Coordinar visita",
  },
  {
    id: "lead-04",
    client: "Martina G.",
    listingId: "ba-04",
    stage: "propuesta",
    budget: 118000000,
    channel: "Web",
    assignedTo: "Nico",
    nextAction: "Enviar propuesta",
  },
  {
    id: "lead-05",
    client: "Diego T.",
    listingId: "ba-01",
    stage: "reserva",
    budget: 98000000,
    channel: "Referral",
    assignedTo: "Sofia",
    nextAction: "Checklist de reserva",
  },
  {
    id: "lead-06",
    client: "Valeria P.",
    listingId: "ba-03",
    stage: "cerrado",
    budget: 158000000,
    channel: "Web",
    assignedTo: "Mateo",
    nextAction: "Onboarding postventa",
  },
];

const visits: Visit[] = [
  {
    id: "visit-01",
    time: "10:30",
    client: "Luciana M.",
    listingId: "ba-03",
    mode: "Visita presencial",
    advisor: "Lola",
  },
  {
    id: "visit-02",
    time: "13:00",
    client: "Tomas B.",
    listingId: "ba-01",
    mode: "Videollamada",
    advisor: "Sofia",
  },
  {
    id: "visit-03",
    time: "16:15",
    client: "Nicolas D.",
    listingId: "ba-02",
    mode: "Check-in tour",
    advisor: "Mateo",
  },
];

const currencyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const baTheme = {
  "--accent": "#1bb3a9",
  "--accent-2": "#5b8cff",
  "--accent-3": "#ffb347",
  "--accent-4": "#8ee06c",
} as CSSProperties;

export default function InmobiliariaAdminPage() {
  const listingMap = useMemo(
    () => new Map(listings.map((listing) => [listing.id, listing])),
    []
  );

  const [leads, setLeads] = useState<Lead[]>(seedLeads);
  const [stageFilter, setStageFilter] = useState<LeadStage | "all">("all");
  const [typeFilter, setTypeFilter] = useState<PropertyType | "all">("all");
  const [query, setQuery] = useState("");

  const filteredLeads = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return leads
      .filter((lead) => {
        const listing = listingMap.get(lead.listingId);
        const matchesStage = stageFilter === "all" || lead.stage === stageFilter;
        const matchesType = typeFilter === "all" || listing?.type === typeFilter;
        const haystack = `${lead.client} ${lead.channel} ${
          listing?.title ?? ""
        } ${listing?.neighborhood ?? ""}`.toLowerCase();
        const matchesQuery = normalized.length === 0 || haystack.includes(normalized);
        return matchesStage && matchesType && matchesQuery;
      })
      .sort((a, b) => stageOrder[a.stage] - stageOrder[b.stage]);
  }, [leads, listingMap, query, stageFilter, typeFilter]);

  const pipelineValue = leads.reduce((sum, lead) => {
    if (lead.stage === "perdido") return sum;
    const listing = listingMap.get(lead.listingId);
    return sum + (listing?.price ?? 0);
  }, 0);

  const leadsThisWeek = leads.filter((lead) => lead.stage === "nuevo").length;
  const visitsScheduled = leads.filter((lead) => lead.stage === "visita").length;
  const proposalsActive = leads.filter((lead) => lead.stage === "propuesta").length;

  const inventoryStats = typeFilters
    .filter((item) => item.id !== "all")
    .map((item) => ({
      label: item.label,
      count: listings.filter((listing) => listing.type === item.id).length,
    }));

  const stageTotals = stageFilters
    .filter((item) => item.id !== "all")
    .map((item) => ({
      stage: item.id as LeadStage,
      count: leads.filter((lead) => lead.stage === item.id).length,
    }));

  const handleStageChange = (id: string, stage: LeadStage) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, stage } : lead))
    );
  };

  const handleAssign = (id: string, assignedTo: string) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, assignedTo } : lead))
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

  return (
    <div className="ba-shell ba-admin" style={baTheme}>
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
              Inmobiliaria · Admin
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)] md:flex">
            <a href="#leads">// leads</a>
            <a href="#pipeline">// pipeline</a>
            <a href="#agenda">// agenda</a>
            <a href="#inventario">// inventario</a>
            <a href="#productos">// productos</a>
          </nav>
          <div className="flex items-center gap-3">
            <a className="btn-secondary" href="/inmobiliaria">
              Ver demo cliente
            </a>
            <a className="btn-secondary" href="/">
              Volver al home
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-24">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6 reveal" data-reveal>
              <p className="ba-kicker">Panel comercial</p>
              <h1 className="ba-title">
                Gestión de leads, temporarios y proyectos en pozo en tiempo
                real.
              </h1>
              <p className="ba-subtitle">
                Un dashboard pensado para equipos de venta inmobiliaria:
                seguimiento de consultas, reservas, pipeline y agenda de
                visitas.
              </p>
              <div className="ba-tags">
                <span>Leads en vivo</span>
                <span>Pipeline activo</span>
                <span>Agenda inteligente</span>
                <span>Inventario dinámico</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <a className="btn-primary" href="#leads">
                  Ver leads
                </a>
                <a className="btn-secondary" href="/inmobiliaria">
                  Volver a demo cliente
                </a>
              </div>
            </div>

            <div className="ba-admin-card reveal" data-reveal>
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                <span>Semana activa</span>
                <span className="ba-pill ba-pill--disponible">Pipeline</span>
              </div>
              <div className="ba-admin-card__stats">
                <div className="ba-metric">
                  <p className="ba-metric__label">Leads nuevos</p>
                  <p className="ba-metric__value">{leadsThisWeek}</p>
                </div>
                <div className="ba-metric">
                  <p className="ba-metric__label">Visitas</p>
                  <p className="ba-metric__value">{visitsScheduled}</p>
                </div>
                <div className="ba-metric">
                  <p className="ba-metric__label">Propuestas</p>
                  <p className="ba-metric__value">{proposalsActive}</p>
                </div>
                <div className="ba-metric">
                  <p className="ba-metric__label">Valor pipeline</p>
                  <p className="ba-metric__value">
                    {currencyFormatter.format(pipelineValue)}
                  </p>
                </div>
              </div>
              <div className="ba-progress">
                <span className="ba-progress__label">Ocupación temporarios</span>
                <div className="ba-progress__bar">
                  <span style={{ width: "86%" }} />
                </div>
                <span className="ba-progress__value">86%</span>
              </div>
            </div>
          </div>
        </section>

        <section id="leads" className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div className="ba-panel reveal" data-reveal>
                <p className="ba-kicker">Inbox comercial</p>
                <h2 className="ba-section-title">Leads entrantes</h2>
                <div className="ba-admin-filter">
                  <input
                    className="ba-input"
                    placeholder="Buscar por cliente, barrio o propiedad"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                  <div className="ba-admin-filter__row">
                    {stageFilters.map((filter) => (
                      <button
                        key={filter.id}
                        type="button"
                        className={`ba-admin-filter__pill ${
                          stageFilter === filter.id ? "is-active" : ""
                        }`}
                        onClick={() => setStageFilter(filter.id)}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                  <div className="ba-admin-filter__row">
                    {typeFilters.map((filter) => (
                      <button
                        key={filter.id}
                        type="button"
                        className={`ba-admin-filter__pill ${
                          typeFilter === filter.id ? "is-active" : ""
                        }`}
                        onClick={() => setTypeFilter(filter.id)}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {filteredLeads.map((lead) => {
                  const listing = listingMap.get(lead.listingId);

                  return (
                    <div key={lead.id} className="ba-lead-card">
                      <div className="ba-lead-card__header">
                        <div>
                          <p className="ba-lead-card__title">{lead.client}</p>
                          <p className="ba-lead-card__meta">
                            {listing?.title} · {listing?.neighborhood}
                          </p>
                        </div>
                        <span className={`ba-stage ba-stage--${lead.stage}`}>
                          {stageLabels[lead.stage]}
                        </span>
                      </div>
                      <div className="ba-lead-card__badges">
                        <span className="ba-pill ba-pill--disponible">
                          {listing?.status}
                        </span>
                        <span className="ba-pill">{lead.channel}</span>
                        <span className="ba-pill">
                          {currencyFormatter.format(lead.budget)}
                        </span>
                      </div>
                      <div className="ba-lead-card__actions">
                        <div className="ba-lead-card__select">
                          <label className="ba-label">Estado</label>
                          <select
                            className="ba-select"
                            value={lead.stage}
                            onChange={(event) =>
                              handleStageChange(
                                lead.id,
                                event.target.value as LeadStage
                              )
                            }
                          >
                            {stageFilters
                              .filter((filter) => filter.id !== "all")
                              .map((filter) => (
                                <option key={filter.id} value={filter.id}>
                                  {filter.label}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="ba-lead-card__select">
                          <label className="ba-label">Asignado</label>
                          <select
                            className="ba-select"
                            value={lead.assignedTo}
                            onChange={(event) =>
                              handleAssign(lead.id, event.target.value)
                            }
                          >
                            {advisors.map((advisor) => (
                              <option key={advisor} value={advisor}>
                                {advisor}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button className="ba-link" type="button">
                          {lead.nextAction} →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div id="pipeline" className="ba-panel reveal" data-reveal>
                <p className="ba-kicker">Pipeline</p>
                <h2 className="ba-section-title">Estado comercial</h2>
                <div className="ba-pipeline">
                  {stageTotals.map((stage) => (
                    <div key={stage.stage} className="ba-pipeline__item">
                      <div className="ba-pipeline__label">
                        <span>{stageLabels[stage.stage]}</span>
                        <span>{stage.count}</span>
                      </div>
                      <div className="ba-pipeline__bar">
                        <span
                          style={{
                            width: `${Math.min(100, stage.count * 16)}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div id="agenda" className="ba-panel reveal" data-reveal>
                <p className="ba-kicker">Agenda</p>
                <h2 className="ba-section-title">Visitas de hoy</h2>
                <div className="ba-agenda">
                  {visits.map((visit) => {
                    const listing = listingMap.get(visit.listingId);
                    return (
                      <div key={visit.id} className="ba-agenda__item">
                        <div>
                          <p className="ba-agenda__time">{visit.time}</p>
                          <p className="ba-agenda__meta">
                            {visit.client} · {listing?.title}
                          </p>
                          <p className="ba-agenda__meta">{visit.advisor}</p>
                        </div>
                        <span className="ba-pill">{visit.mode}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div id="inventario" className="ba-panel reveal" data-reveal>
                <p className="ba-kicker">Inventario</p>
                <h2 className="ba-section-title">Stock disponible</h2>
                <div className="ba-inventory">
                  {inventoryStats.map((item) => (
                    <div key={item.label} className="ba-inventory__item">
                      <span>{item.label}</span>
                      <strong>{item.count}</strong>
                    </div>
                  ))}
                </div>
                <div className="ba-inventory__summary">
                  <p className="ba-kicker">Insight</p>
                  <p className="text-sm text-[var(--muted)]">
                    Temporarios y en pozo son los segmentos con mayor demanda.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="productos" className="mx-auto w-full max-w-6xl px-6 pb-24 pt-4">
          <div className="ba-panel reveal" data-reveal>
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="space-y-3">
                <p className="ba-kicker">Productos</p>
                <h2 className="ba-section-title">Vista de propiedades</h2>
                <p className="ba-subtitle">
                  Una previsualización rápida de cómo se ven los listados
                  activos para el equipo comercial.
                </p>
              </div>
              <div className="ba-tags">
                <span>Cards premium</span>
                <span>Estados claros</span>
                <span>Ficha rápida</span>
              </div>
            </div>

            <div className="ba-grid">
              {listings.map((listing) => {
                const priceLabel =
                  listing.type === "temporario"
                    ? `${currencyFormatter.format(listing.price)} / noche`
                    : currencyFormatter.format(listing.price);

                return (
                  <article key={listing.id} className="ba-card reveal" data-reveal>
                    <div className="ba-card__media">
                      <span className="ba-pill ba-pill--disponible">
                        {listing.status}
                      </span>
                      <span className="ba-card__tag">
                        {typeLabelMap[listing.type]}
                      </span>
                    </div>
                    <div className="ba-card__body">
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                        <span>{listing.neighborhood}</span>
                        <span>{typeLabelMap[listing.type]}</span>
                      </div>
                      <h3 className="mt-3 text-xl font-semibold">
                        {listing.title}
                      </h3>
                      <p className="mt-2 text-sm text-[var(--muted)]">
                        Estado: {listing.status}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="ba-price">{priceLabel}</span>
                        <a className="ba-link" href={`/inmobiliaria/${listing.id}`}>
                          Ver ficha →
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <ScrollToTop />

      <footer className="ba-footer">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-6 text-sm text-[var(--muted)] md:flex-row md:items-center">
          <span>© 2026 Mauricio Morell. Corrientes, Argentina.</span>
          <div className="flex gap-6">
            <a href="#leads">Leads</a>
            <a href="#pipeline">Pipeline</a>
            <a href="#agenda">Agenda</a>
            <a href="#inventario">Inventario</a>
            <a href="#productos">Productos</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
