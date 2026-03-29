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
  | "oferta"
  | "cerrado"
  | "perdido";

type Listing = {
  id: string;
  title: string;
  type: PropertyType;
  price: number;
  location: string;
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

const listings: Listing[] = [
  {
    id: "est-01",
    title: "Skyline Rivera",
    type: "pozo",
    price: 98000000,
    location: "Centro · Corrientes",
    status: "En pozo",
  },
  {
    id: "est-02",
    title: "Bosque Alto",
    type: "listo",
    price: 135000000,
    location: "Parque Mitre",
    status: "Listo",
  },
  {
    id: "est-03",
    title: "Tempo Río",
    type: "temporario",
    price: 54000,
    location: "Costanera",
    status: "Temporario",
  },
  {
    id: "est-04",
    title: "Vista Norte",
    type: "tradicional",
    price: 112000000,
    location: "Barrio Camba",
    status: "Tradicional",
  },
];

const agents = ["Mica", "Sofi", "Agus", "Leo"];

const stageLabels: Record<LeadStage, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  visita: "Visita",
  oferta: "Oferta",
  cerrado: "Cerrado",
  perdido: "Perdido",
};

const stageOrder: Record<LeadStage, number> = {
  nuevo: 0,
  contactado: 1,
  visita: 2,
  oferta: 3,
  cerrado: 4,
  perdido: 5,
};

const stageFilters: Array<{ id: LeadStage | "all"; label: string }> = [
  { id: "all", label: "Todos" },
  { id: "nuevo", label: "Nuevos" },
  { id: "contactado", label: "Contactados" },
  { id: "visita", label: "Visitas" },
  { id: "oferta", label: "Ofertas" },
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
    client: "Victoria M.",
    listingId: "est-01",
    stage: "nuevo",
    budget: 120000000,
    channel: "Web",
    assignedTo: "Mica",
    nextAction: "Enviar brochure",
  },
  {
    id: "lead-02",
    client: "Santiago P.",
    listingId: "est-02",
    stage: "contactado",
    budget: 140000000,
    channel: "WhatsApp",
    assignedTo: "Sofi",
    nextAction: "Coordinar visita",
  },
  {
    id: "lead-03",
    client: "Julieta R.",
    listingId: "est-03",
    stage: "visita",
    budget: 68000,
    channel: "Instagram",
    assignedTo: "Agus",
    nextAction: "Enviar propuesta",
  },
  {
    id: "lead-04",
    client: "Marcos T.",
    listingId: "est-04",
    stage: "oferta",
    budget: 108000000,
    channel: "Web",
    assignedTo: "Leo",
    nextAction: "Cerrar negociación",
  },
  {
    id: "lead-05",
    client: "Ana L.",
    listingId: "est-01",
    stage: "cerrado",
    budget: 98000000,
    channel: "WhatsApp",
    assignedTo: "Mica",
    nextAction: "Postventa",
  },
];

const currencyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const estateTheme: CSSProperties = {
  "--accent": "#0bb58b",
  "--accent-2": "#6ec3ff",
  "--accent-3": "#ffb347",
  "--accent-4": "#7f7cff",
};

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
        const haystack = `${lead.client} ${lead.channel} ${listing?.title ?? ""}`.toLowerCase();
        const matchesQuery = normalized.length === 0 || haystack.includes(normalized);
        return matchesStage && matchesType && matchesQuery;
      })
      .sort((a, b) => stageOrder[a.stage] - stageOrder[b.stage]);
  }, [leads, listingMap, query, stageFilter, typeFilter]);

  const pipelineValue = leads.reduce((sum, lead) => {
    const listing = listingMap.get(lead.listingId);
    if (lead.stage === "perdido") return sum;
    return sum + (listing?.price ?? 0);
  }, 0);

  const leadsThisWeek = leads.filter((lead) => lead.stage === "nuevo").length;
  const visitsScheduled = leads.filter((lead) => lead.stage === "visita").length;
  const offersActive = leads.filter((lead) => lead.stage === "oferta").length;

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
    <div className="estate-shell estate-admin" style={estateTheme}>
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
              maumorell real estate admin
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)] md:flex">
            <a href="#leads">// leads</a>
            <a href="#pipeline">// pipeline</a>
            <a href="#inventario">// inventario</a>
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
              <p className="estate-kicker">Panel inmobiliario</p>
              <h1 className="estate-title">
                Gestión comercial y pipeline para ventas y temporarios.
              </h1>
              <p className="estate-subtitle">
                Un dashboard para equipos de ventas: leads entrantes,
                oportunidades activas, seguimiento y control de inventario.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="estate-chip">Leads en tiempo real</span>
                <span className="estate-chip">Pipeline visual</span>
                <span className="estate-chip">Inventario dinámico</span>
                <span className="estate-chip">Reportes accionables</span>
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

            <div className="estate-hero-card reveal" data-reveal>
              <div className="estate-hero-content">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                  <span>Semana activa</span>
                  <span className="estate-pill estate-pill--disponible">Pipeline</span>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="estate-metric">
                    <p className="estate-metric__label">Leads nuevos</p>
                    <p className="estate-metric__value">{leadsThisWeek}</p>
                  </div>
                  <div className="estate-metric">
                    <p className="estate-metric__label">Visitas</p>
                    <p className="estate-metric__value">{visitsScheduled}</p>
                  </div>
                  <div className="estate-metric">
                    <p className="estate-metric__label">Ofertas</p>
                    <p className="estate-metric__value">{offersActive}</p>
                  </div>
                  <div className="estate-metric">
                    <p className="estate-metric__label">Valor pipeline</p>
                    <p className="estate-metric__value">
                      {currencyFormatter.format(pipelineValue)}
                    </p>
                  </div>
                </div>
                <div className="estate-progress mt-6">
                  <span className="estate-progress__label">Ocupación temporarios</span>
                  <div className="estate-progress__bar">
                    <span style={{ width: "82%" }} />
                  </div>
                  <span className="estate-progress__value">82%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="leads" className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div className="estate-panel reveal" data-reveal>
                <p className="estate-kicker">Inbox comercial</p>
                <h2 className="estate-section-title">Leads activos</h2>
                <div className="estate-filter">
                  <input
                    className="estate-input"
                    placeholder="Buscar por cliente o propiedad"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                  <div className="estate-filter__row">
                    {stageFilters.map((filter) => (
                      <button
                        key={filter.id}
                        type="button"
                        className={`estate-filter__pill ${
                          stageFilter === filter.id ? "is-active" : ""
                        }`}
                        onClick={() => setStageFilter(filter.id)}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                  <div className="estate-filter__row">
                    {typeFilters.map((filter) => (
                      <button
                        key={filter.id}
                        type="button"
                        className={`estate-filter__pill ${
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
                    <div key={lead.id} className="estate-lead-card">
                      <div className="estate-lead-card__header">
                        <div>
                          <p className="estate-lead-card__title">
                            {lead.client}
                          </p>
                          <p className="estate-lead-card__meta">
                            {listing?.title} · {listing?.location}
                          </p>
                        </div>
                        <span className={`estate-stage estate-stage--${lead.stage}`}>
                          {stageLabels[lead.stage]}
                        </span>
                      </div>
                      <div className="estate-lead-card__body">
                        <span className="estate-pill estate-pill--disponible">
                          {listing?.status}
                        </span>
                        <span className="estate-pill estate-pill--disponible">
                          {lead.channel}
                        </span>
                        <span className="estate-pill estate-pill--disponible">
                          {currencyFormatter.format(lead.budget)}
                        </span>
                      </div>
                      <div className="estate-lead-card__actions">
                        <div className="estate-lead-card__select">
                          <label className="estate-label">Estado</label>
                          <select
                            className="estate-select"
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
                        <div className="estate-lead-card__select">
                          <label className="estate-label">Asignado</label>
                          <select
                            className="estate-select"
                            value={lead.assignedTo}
                            onChange={(event) =>
                              handleAssign(lead.id, event.target.value)
                            }
                          >
                            {agents.map((agent) => (
                              <option key={agent} value={agent}>
                                {agent}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button className="estate-link" type="button">
                          {lead.nextAction} →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div id="pipeline" className="estate-panel reveal" data-reveal>
                <p className="estate-kicker">Pipeline</p>
                <h2 className="estate-section-title">Estado comercial</h2>
                <div className="estate-pipeline">
                  {stageTotals.map((stage) => (
                    <div key={stage.stage} className="estate-pipeline__item">
                      <div className="estate-pipeline__label">
                        <span>{stageLabels[stage.stage]}</span>
                        <span>{stage.count}</span>
                      </div>
                      <div className="estate-pipeline__bar">
                        <span
                          style={{
                            width: `${Math.min(100, stage.count * 20)}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div id="inventario" className="estate-panel reveal" data-reveal>
                <p className="estate-kicker">Inventario</p>
                <h2 className="estate-section-title">Stock disponible</h2>
                <div className="estate-inventory">
                  {inventoryStats.map((item) => (
                    <div key={item.label} className="estate-inventory__item">
                      <span>{item.label}</span>
                      <strong>{item.count}</strong>
                    </div>
                  ))}
                </div>
                <div className="estate-inventory__summary">
                  <p className="estate-kicker">Prioridades</p>
                  <p className="text-sm text-[var(--muted)]">
                    En pozo y temporarios concentran la mayor demanda actual.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ScrollToTop />

      <footer className="estate-footer">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-6 text-sm text-[var(--muted)] md:flex-row md:items-center">
          <span>© 2026 Mauricio Morell. Corrientes, Argentina.</span>
          <div className="flex gap-6">
            <a href="#leads">Leads</a>
            <a href="#pipeline">Pipeline</a>
            <a href="#inventario">Inventario</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
