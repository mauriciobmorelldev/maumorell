"use client";

import { useMemo, useState } from "react";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ScrollToTop from "@/components/ui/ScrollToTop";

type AdminStatus =
  | "nuevo"
  | "pendiente"
  | "confirmado"
  | "reprogramado"
  | "cancelado";

type Service = {
  id: string;
  name: string;
  duration: string;
  price: number;
};

type Professional = {
  id: string;
  name: string;
  specialty: string;
  status: string;
};

type Booking = {
  id: string;
  dayIndex: number;
  time: string;
  client: string;
  serviceId: string;
  professionalId: string;
  status: AdminStatus;
  channel: string;
  createdAt: string;
  notes?: string;
};

type StatusFilter = AdminStatus | "all";

type DayFilter = number | "all";

type ChannelFilter = "all" | "Web" | "WhatsApp" | "Instagram";

const services: Service[] = [
  { id: "consulta", name: "Consulta inicial", duration: "40 min", price: 18000 },
  { id: "control", name: "Control mensual", duration: "30 min", price: 14000 },
  { id: "videollamada", name: "Videollamada", duration: "25 min", price: 12000 },
  { id: "express", name: "Urgencia express", duration: "20 min", price: 22000 },
];

const professionals: Professional[] = [
  {
    id: "soto",
    name: "Dra. Valentina Soto",
    specialty: "Clínica general",
    status: "Disponible",
  },
  {
    id: "diaz",
    name: "Dr. Bruno Díaz",
    specialty: "Traumatología",
    status: "En consultorio",
  },
  {
    id: "ramos",
    name: "Lic. Camila Ramos",
    specialty: "Nutrición",
    status: "Videollamada",
  },
];

const statusLabels: Record<AdminStatus, string> = {
  nuevo: "Nuevo",
  pendiente: "Pendiente",
  confirmado: "Confirmado",
  reprogramado: "Reprogramado",
  cancelado: "Cancelado",
};

const statusOrder: Record<AdminStatus, number> = {
  nuevo: 0,
  pendiente: 1,
  reprogramado: 2,
  confirmado: 3,
  cancelado: 4,
};

const statusFilters: Array<{ id: StatusFilter; label: string }> = [
  { id: "all", label: "Todos" },
  { id: "nuevo", label: "Nuevos" },
  { id: "pendiente", label: "Pendientes" },
  { id: "confirmado", label: "Confirmados" },
  { id: "reprogramado", label: "Reprogramados" },
  { id: "cancelado", label: "Cancelados" },
];

const seedBookings: Booking[] = [
  {
    id: "bk-001",
    dayIndex: 0,
    time: "09:00",
    client: "Abril S.",
    serviceId: "consulta",
    professionalId: "soto",
    status: "nuevo",
    channel: "Web",
    createdAt: "Hace 3 min",
    notes: "Primera visita",
  },
  {
    id: "bk-002",
    dayIndex: 0,
    time: "10:30",
    client: "Gustavo M.",
    serviceId: "control",
    professionalId: "diaz",
    status: "pendiente",
    channel: "WhatsApp",
    createdAt: "Hace 25 min",
  },
  {
    id: "bk-003",
    dayIndex: 0,
    time: "12:00",
    client: "Lucía B.",
    serviceId: "videollamada",
    professionalId: "ramos",
    status: "confirmado",
    channel: "Instagram",
    createdAt: "Hace 2 h",
  },
  {
    id: "bk-004",
    dayIndex: 0,
    time: "15:30",
    client: "Mateo P.",
    serviceId: "express",
    professionalId: "soto",
    status: "confirmado",
    channel: "Web",
    createdAt: "Ayer",
  },
  {
    id: "bk-005",
    dayIndex: 1,
    time: "09:30",
    client: "Sofía N.",
    serviceId: "consulta",
    professionalId: "ramos",
    status: "reprogramado",
    channel: "Web",
    createdAt: "Hace 1 h",
    notes: "Pide horario tarde",
  },
  {
    id: "bk-006",
    dayIndex: 1,
    time: "11:30",
    client: "Marcos V.",
    serviceId: "control",
    professionalId: "diaz",
    status: "nuevo",
    channel: "WhatsApp",
    createdAt: "Hace 20 min",
  },
  {
    id: "bk-007",
    dayIndex: 2,
    time: "10:00",
    client: "Mica F.",
    serviceId: "consulta",
    professionalId: "soto",
    status: "pendiente",
    channel: "Web",
    createdAt: "Hace 5 h",
  },
  {
    id: "bk-008",
    dayIndex: 2,
    time: "16:30",
    client: "Pablo R.",
    serviceId: "express",
    professionalId: "soto",
    status: "cancelado",
    channel: "Web",
    createdAt: "Hace 1 día",
  },
  {
    id: "bk-009",
    dayIndex: 3,
    time: "13:00",
    client: "Nora C.",
    serviceId: "videollamada",
    professionalId: "ramos",
    status: "nuevo",
    channel: "Instagram",
    createdAt: "Hace 40 min",
  },
  {
    id: "bk-010",
    dayIndex: 4,
    time: "18:00",
    client: "Iris G.",
    serviceId: "control",
    professionalId: "diaz",
    status: "confirmado",
    channel: "Web",
    createdAt: "Hace 3 h",
  },
];

const dayFormatter = new Intl.DateTimeFormat("es-AR", {
  weekday: "short",
  day: "2-digit",
  month: "short",
});

const longFormatter = new Intl.DateTimeFormat("es-AR", {
  weekday: "long",
  day: "2-digit",
  month: "long",
});

const currencyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const buildDays = (total: number) => {
  const today = new Date();
  return Array.from({ length: total }).map((_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    return { id: index, date };
  });
};

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export default function TurnosAdminPage() {
  const days = useMemo(() => buildDays(6), []);
  const serviceMap = useMemo(
    () => new Map(services.map((service) => [service.id, service])),
    []
  );
  const professionalMap = useMemo(
    () => new Map(professionals.map((pro) => [pro.id, pro])),
    []
  );

  const [bookings, setBookings] = useState<Booking[]>(seedBookings);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [dayFilter, setDayFilter] = useState<DayFilter>("all");
  const [channelFilter, setChannelFilter] = useState<ChannelFilter>("all");
  const [query, setQuery] = useState("");

  const filteredBookings = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return bookings
      .filter((booking) => {
        const matchesStatus =
          statusFilter === "all" || booking.status === statusFilter;
        const matchesDay = dayFilter === "all" || booking.dayIndex === dayFilter;
        const matchesChannel =
          channelFilter === "all" || booking.channel === channelFilter;
        const service = serviceMap.get(booking.serviceId);
        const professional = professionalMap.get(booking.professionalId);
        const haystack = `${booking.client} ${booking.channel} ${service?.name ?? ""} ${professional?.name ?? ""}`.toLowerCase();
        const matchesQuery = normalized.length === 0 || haystack.includes(normalized);
        return matchesStatus && matchesDay && matchesChannel && matchesQuery;
      })
      .sort((a, b) => {
        const orderDiff = statusOrder[a.status] - statusOrder[b.status];
        if (orderDiff !== 0) return orderDiff;
        if (a.dayIndex !== b.dayIndex) return a.dayIndex - b.dayIndex;
        return a.time.localeCompare(b.time);
      });
  }, [
    bookings,
    channelFilter,
    dayFilter,
    query,
    serviceMap,
    statusFilter,
    professionalMap,
  ]);

  const todayBookings = useMemo(
    () => bookings.filter((booking) => booking.dayIndex === 0),
    [bookings]
  );

  const pendingStatuses = new Set<AdminStatus>([
    "nuevo",
    "pendiente",
    "reprogramado",
  ]);

  const pendingToday = todayBookings.filter((booking) =>
    pendingStatuses.has(booking.status)
  );

  const confirmedToday = todayBookings.filter(
    (booking) => booking.status === "confirmado"
  );

  const revenueToday = todayBookings.reduce((sum, booking) => {
    if (booking.status === "cancelado") return sum;
    const service = serviceMap.get(booking.serviceId);
    return sum + (service?.price ?? 0);
  }, 0);

  const capacityPerDay = 18;
  const occupancy = Math.min(
    100,
    Math.round((todayBookings.length / capacityPerDay) * 100)
  );

  const alerts = [
    {
      id: "pending",
      title: `${pendingToday.length} turnos sin confirmar`,
      detail: "Reforzar recordatorios automáticos.",
    },
    {
      id: "canceled",
      title: `${bookings.filter((item) => item.status === "cancelado").length} cancelaciones`,
      detail: "Activar lista de espera para cubrir huecos.",
    },
  ];

  const loadsByProfessional = professionals.map((professional) => {
    const count = todayBookings.filter(
      (booking) =>
        booking.professionalId === professional.id &&
        booking.status !== "cancelado"
    ).length;
    return { ...professional, count };
  });

  const handleStatusChange = (id: string, status: AdminStatus) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status } : booking
      )
    );
  };

  const handleAssign = (id: string, professionalId: string) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, professionalId } : booking
      )
    );
  };

  return (
    <div className="relative overflow-hidden">
      <ScrollProgress variant="bar" position="top" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-50" />
        <div className="noise absolute inset-0 opacity-70" />
        <div className="float-slow absolute -top-32 right-[-10%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(255,107,61,0.45),transparent_70%)] blur-3xl" />
        <div className="float-fast absolute top-[35%] left-[-12%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(42,166,255,0.4),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[-12%] right-[8%] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(124,77,255,0.25),transparent_70%)] blur-3xl" />
      </div>

      <header className="header-glass sticky top-0 z-40 border-b border-[var(--ring)] backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-[var(--accent)]" />
            <span className="text-lg font-semibold tracking-tight">maumorell</span>
          </a>
          <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)] md:flex">
            <a href="#inbox">// inbox</a>
            <a href="#panel">// panel</a>
            <a href="#equipo">// equipo</a>
          </nav>
          <div className="flex items-center gap-3">
            <a className="btn-secondary" href="/turnos">
              Ver simulador
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
            <div className="space-y-6">
              <p className="kicker">Panel administrador</p>
              <h1 className="hero-title">
                Gestión en vivo de turnos, agenda y automatizaciones.
              </h1>
              <p className="hero-subtitle">
                Este panel concentra la operación diaria: turnos entrantes,
                confirmaciones, asignaciones y alertas. Ideal para equipos que
                necesitan velocidad y control en tiempo real.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="chip">Inbox centralizado</span>
                <span className="chip">Asignación rápida</span>
                <span className="chip">Reportes diarios</span>
                <span className="chip">Alertas proactivas</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <a className="btn-primary" href="#inbox">
                  Ver turnos entrantes
                </a>
                <a className="btn-secondary" href="/turnos">
                  Ir a vista cliente
                </a>
              </div>
            </div>

            <div className="glass card-tilt rounded-[32px] p-8">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                <span>Resumen del día</span>
                <span className="rounded-full bg-[rgba(0,194,168,0.18)] px-3 py-1 text-[0.65rem] font-semibold text-[var(--accent-4)]">
                  {days[0] ? capitalize(dayFormatter.format(days[0].date)) : "Hoy"}
                </span>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-[rgba(15,23,42,0.06)] p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                    Pendientes
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {pendingToday.length}
                  </p>
                </div>
                <div className="rounded-2xl bg-[rgba(15,23,42,0.06)] p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                    Confirmados
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {confirmedToday.length}
                  </p>
                </div>
                <div className="rounded-2xl bg-[rgba(15,23,42,0.06)] p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                    Ingresos estimados
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {currencyFormatter.format(revenueToday)}
                  </p>
                </div>
                <div className="rounded-2xl bg-[rgba(15,23,42,0.06)] p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                    Ocupación
                  </p>
                  <p className="mt-2 text-2xl font-semibold">{occupancy}%</p>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-[var(--ring)] bg-[color:var(--surface-strong)] p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                  Próximo libre
                </p>
                <p className="mt-2 text-lg font-semibold">11:30 · Dra. Soto</p>
                <p className="text-sm text-[var(--muted)]">
                  Si se activa lista de espera, se ocupa en 6 min.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="inbox" className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div className="glass rounded-[32px] p-8">
                <p className="kicker">Inbox operativo</p>
                <h2 className="mt-3 text-2xl font-semibold">
                  Turnos entrantes
                </h2>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Filtrá por estado, día o buscá un cliente específico. Cada
                  ajuste se refleja en la agenda de forma inmediata.
                </p>
                <div className="admin-filter mt-6">
                  <input
                    className="input-field"
                    placeholder="Buscar por cliente, servicio o profesional"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                  <div className="admin-filter__row">
                    {statusFilters.map((filter) => (
                      <button
                        key={filter.id}
                        type="button"
                        className={`chip ${statusFilter === filter.id ? "chip-active" : ""}`}
                        onClick={() => setStatusFilter(filter.id)}
                        aria-pressed={statusFilter === filter.id}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                  <div className="admin-filter__row">
                    <select
                      className="input-field admin-select"
                      value={dayFilter}
                      onChange={(event) => {
                        const value = event.target.value;
                        setDayFilter(value === "all" ? "all" : Number(value));
                      }}
                    >
                      <option value="all">Todos los días</option>
                      {days.map((day) => (
                        <option key={day.id} value={day.id}>
                          {capitalize(dayFormatter.format(day.date))}
                        </option>
                      ))}
                    </select>
                    <select
                      className="input-field admin-select"
                      value={channelFilter}
                      onChange={(event) =>
                        setChannelFilter(event.target.value as ChannelFilter)
                      }
                    >
                      <option value="all">Todos los canales</option>
                      <option value="Web">Web</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Instagram">Instagram</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {filteredBookings.length === 0 ? (
                  <div className="glass rounded-[32px] p-8">
                    <p className="text-sm text-[var(--muted)]">
                      No hay turnos con los filtros actuales.
                    </p>
                  </div>
                ) : (
                  filteredBookings.map((booking) => {
                    const service = serviceMap.get(booking.serviceId);
                    const professional = professionalMap.get(
                      booking.professionalId
                    );

                    return (
                      <div key={booking.id} className="admin-card">
                        <div className="admin-card__header">
                          <div>
                            <p className="admin-card__time">
                              {booking.time} · {booking.client}
                            </p>
                            <p className="admin-card__meta-text">
                              {capitalize(
                                longFormatter.format(
                                  days[booking.dayIndex]?.date ?? new Date()
                                )
                              )}
                            </p>
                          </div>
                          <span
                            className={`status-pill status-pill--${booking.status}`}
                          >
                            {statusLabels[booking.status]}
                          </span>
                        </div>
                        <div className="admin-card__meta">
                          <span className="admin-pill">
                            {service?.name ?? "Servicio"}
                          </span>
                          <span className="admin-pill">
                            {service?.duration ?? ""}
                          </span>
                          <span className="admin-pill">
                            {professional?.name ?? "Profesional"}
                          </span>
                          <span className="admin-pill">{booking.channel}</span>
                        </div>
                        <div className="admin-card__details">
                          <span className="text-xs text-[var(--muted)]">
                            Ingreso: {booking.createdAt}
                          </span>
                          {booking.notes ? (
                            <span className="text-xs text-[var(--muted)]">
                              Nota: {booking.notes}
                            </span>
                          ) : null}
                        </div>
                        <div className="admin-card__actions">
                          <div className="admin-card__assign">
                            <label className="text-xs font-semibold text-[var(--muted)]">
                              Asignar
                            </label>
                            <select
                              className="input-field admin-select"
                              value={booking.professionalId}
                              onChange={(event) =>
                                handleAssign(booking.id, event.target.value)
                              }
                            >
                              {professionals.map((professionalOption) => (
                                <option
                                  key={professionalOption.id}
                                  value={professionalOption.id}
                                >
                                  {professionalOption.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="admin-card__buttons">
                            <button
                              className="btn-secondary btn-admin"
                              type="button"
                              onClick={() =>
                                handleStatusChange(booking.id, "confirmado")
                              }
                              disabled={booking.status === "confirmado"}
                            >
                              Confirmar
                            </button>
                            <button
                              className="btn-secondary btn-admin"
                              type="button"
                              onClick={() =>
                                handleStatusChange(booking.id, "reprogramado")
                              }
                              disabled={booking.status === "reprogramado"}
                            >
                              Reprogramar
                            </button>
                            <button
                              className="btn-secondary btn-admin"
                              type="button"
                              onClick={() =>
                                handleStatusChange(booking.id, "cancelado")
                              }
                              disabled={booking.status === "cancelado"}
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div id="panel" className="glass rounded-[32px] p-8">
                <p className="kicker">Panel operativo</p>
                <h2 className="mt-3 text-2xl font-semibold">
                  Alertas y control
                </h2>
                <div className="mt-6 space-y-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="rounded-2xl border border-[var(--ring)] bg-[color:var(--surface-strong)] p-4"
                    >
                      <p className="text-sm font-semibold">{alert.title}</p>
                      <p className="text-xs text-[var(--muted)]">
                        {alert.detail}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-[var(--ring)] bg-[color:var(--surface-strong)] p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                    Próxima acción sugerida
                  </p>
                  <p className="mt-2 text-sm font-semibold">
                    Enviar recordatorio a {pendingToday.length} pendientes.
                  </p>
                </div>
              </div>

              <div id="equipo" className="glass rounded-[32px] p-8">
                <p className="kicker">Equipo en línea</p>
                <h2 className="mt-3 text-2xl font-semibold">
                  Disponibilidad del staff
                </h2>
                <div className="mt-6 space-y-4">
                  {loadsByProfessional.map((professional) => (
                    <div
                      key={professional.id}
                      className="flex items-center justify-between rounded-2xl border border-[var(--ring)] bg-[color:var(--surface-strong)] px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-semibold">
                          {professional.name}
                        </p>
                        <p className="text-xs text-[var(--muted)]">
                          {professional.specialty} · {professional.status}
                        </p>
                      </div>
                      <span className="admin-pill">
                        {professional.count} turnos
                      </span>
                    </div>
                  ))}
                </div>
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
            <a href="/">Home</a>
            <a href="/turnos">Simulador</a>
            <a href="#inbox">Inbox</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
