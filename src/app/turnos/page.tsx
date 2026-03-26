"use client";

import { useEffect, useMemo, useState } from "react";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ScrollToTop from "@/components/ui/ScrollToTop";

type BookingStatus = "confirmado" | "pendiente" | "cancelado";

type Service = {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
};

type Professional = {
  id: string;
  name: string;
  specialty: string;
  rating: string;
  availability: string;
};

type Booking = {
  time: string;
  name: string;
  serviceId: string;
  professionalId: string;
  status: BookingStatus;
  channel: string;
};

const services: Service[] = [
  {
    id: "consulta",
    name: "Consulta inicial",
    duration: "40 min",
    price: 18000,
    description: "Primera visita con plan de acción personalizado.",
  },
  {
    id: "control",
    name: "Control mensual",
    duration: "30 min",
    price: 14000,
    description: "Seguimiento para ajustar y optimizar resultados.",
  },
  {
    id: "videollamada",
    name: "Videollamada",
    duration: "25 min",
    price: 12000,
    description: "Atención remota con recordatorios automáticos.",
  },
  {
    id: "express",
    name: "Urgencia express",
    duration: "20 min",
    price: 22000,
    description: "Turno prioritario con respuesta inmediata.",
  },
];

const professionals: Professional[] = [
  {
    id: "soto",
    name: "Dra. Valentina Soto",
    specialty: "Clínica general",
    rating: "4.9",
    availability: "Disponible hoy",
  },
  {
    id: "diaz",
    name: "Dr. Bruno Díaz",
    specialty: "Traumatología",
    rating: "4.7",
    availability: "3 slots libres",
  },
  {
    id: "ramos",
    name: "Lic. Camila Ramos",
    specialty: "Nutrición",
    rating: "4.8",
    availability: "Videollamada",
  },
];

const automationOptions = [
  {
    id: "whatsapp",
    label: "Recordatorio WhatsApp",
    impact: "Reduce ausencias",
  },
  {
    id: "pago",
    label: "Pago anticipado",
    impact: "Asegura asistencia",
  },
  {
    id: "confirmacion",
    label: "Confirmación auto",
    impact: "Agenda limpia",
  },
];

const buildSlots = (startHour: number, endHour: number, interval: number) => {
  const slots: string[] = [];
  for (let hour = startHour; hour <= endHour; hour += 1) {
    for (let minute = 0; minute < 60; minute += interval) {
      if (hour === endHour && minute > 0) break;
      const label = `${String(hour).padStart(2, "0")}:${String(minute).padStart(
        2,
        "0"
      )}`;
      slots.push(label);
    }
  }
  return slots;
};

const timeSlots = buildSlots(9, 18, 30);

const buildDays = (total: number) => {
  const today = new Date();
  return Array.from({ length: total }).map((_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    return {
      id: index,
      date,
    };
  });
};

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

const blockedSlotsByDay: Record<number, string[]> = {
  0: ["12:30", "13:00", "13:30"],
  1: ["12:00", "12:30", "17:00"],
  2: ["11:30", "14:00", "14:30"],
  3: ["12:30", "15:30"],
  4: ["13:00", "16:30"],
  5: ["12:30", "13:00"],
};

const baseAgendaByDay: Record<number, Booking[]> = {
  0: [
    {
      time: "09:00",
      name: "Julia M.",
      serviceId: "control",
      professionalId: "soto",
      status: "confirmado",
      channel: "WhatsApp",
    },
    {
      time: "10:30",
      name: "Carlos R.",
      serviceId: "consulta",
      professionalId: "diaz",
      status: "pendiente",
      channel: "Web",
    },
    {
      time: "12:00",
      name: "Lucía B.",
      serviceId: "videollamada",
      professionalId: "ramos",
      status: "confirmado",
      channel: "Instagram",
    },
    {
      time: "15:30",
      name: "Mateo P.",
      serviceId: "express",
      professionalId: "soto",
      status: "confirmado",
      channel: "Web",
    },
  ],
  1: [
    {
      time: "09:30",
      name: "Agustina L.",
      serviceId: "consulta",
      professionalId: "soto",
      status: "confirmado",
      channel: "WhatsApp",
    },
    {
      time: "11:00",
      name: "Ramiro D.",
      serviceId: "control",
      professionalId: "diaz",
      status: "pendiente",
      channel: "Web",
    },
    {
      time: "14:30",
      name: "Sol C.",
      serviceId: "videollamada",
      professionalId: "ramos",
      status: "confirmado",
      channel: "Web",
    },
  ],
  2: [
    {
      time: "10:00",
      name: "Mica F.",
      serviceId: "control",
      professionalId: "diaz",
      status: "confirmado",
      channel: "WhatsApp",
    },
    {
      time: "16:00",
      name: "Pedro G.",
      serviceId: "express",
      professionalId: "soto",
      status: "cancelado",
      channel: "Web",
    },
  ],
  3: [
    {
      time: "09:00",
      name: "Antonella V.",
      serviceId: "consulta",
      professionalId: "ramos",
      status: "confirmado",
      channel: "Instagram",
    },
    {
      time: "11:30",
      name: "Martín S.",
      serviceId: "control",
      professionalId: "diaz",
      status: "pendiente",
      channel: "Web",
    },
  ],
  4: [
    {
      time: "10:30",
      name: "Lola N.",
      serviceId: "consulta",
      professionalId: "soto",
      status: "confirmado",
      channel: "WhatsApp",
    },
    {
      time: "15:00",
      name: "Bruno C.",
      serviceId: "videollamada",
      professionalId: "ramos",
      status: "confirmado",
      channel: "Web",
    },
  ],
};

const statusLabels: Record<BookingStatus, string> = {
  confirmado: "Confirmado",
  pendiente: "Pendiente",
  cancelado: "Cancelado",
};

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export default function TurnosPage() {
  const days = useMemo(() => buildDays(6), []);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id ?? "consulta");
  const [selectedProfessionalId, setSelectedProfessionalId] = useState(
    professionals[0]?.id ?? "soto"
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customAgenda, setCustomAgenda] = useState<Record<number, Booking[]>>({});
  const [automations, setAutomations] = useState({
    whatsapp: true,
    pago: true,
    confirmacion: true,
  });

  const selectedDay = days[selectedDayIndex] ?? days[0];
  const service = services.find((item) => item.id === selectedServiceId) ?? services[0];
  const professional =
    professionals.find((item) => item.id === selectedProfessionalId) ?? professionals[0];

  const agendaForDay = useMemo(() => {
    const base = baseAgendaByDay[selectedDayIndex] ?? [];
    const extra = customAgenda[selectedDayIndex] ?? [];
    return [...base, ...extra].sort((a, b) => a.time.localeCompare(b.time));
  }, [customAgenda, selectedDayIndex]);

  const blockedSlots = useMemo(
    () => new Set(blockedSlotsByDay[selectedDayIndex] ?? []),
    [selectedDayIndex]
  );

  const reservedSlots = useMemo(
    () => new Set(agendaForDay.map((booking) => booking.time)),
    [agendaForDay]
  );

  const availableSlots = timeSlots.filter(
    (slot) => !blockedSlots.has(slot) && !reservedSlots.has(slot)
  );

  const totalUsableSlots = timeSlots.length - blockedSlots.size;
  const occupancy = totalUsableSlots > 0
    ? Math.round(((totalUsableSlots - availableSlots.length) / totalUsableSlots) * 100)
    : 0;

  const nextAvailable = availableSlots[0] ?? "Sin disponibilidad";

  const noShowRate = Math.max(
    3,
    14 - (automations.whatsapp ? 4 : 0) - (automations.pago ? 5 : 0) - (automations.confirmacion ? 2 : 0)
  );

  const handleConfirm = () => {
    if (!selectedTime) return;
    if (blockedSlots.has(selectedTime) || reservedSlots.has(selectedTime)) return;

    const newBooking: Booking = {
      time: selectedTime,
      name: "Cliente demo",
      serviceId: service.id,
      professionalId: professional.id,
      status: "pendiente",
      channel: "Web",
    };

    setCustomAgenda((prev) => {
      const next = { ...prev };
      const list = next[selectedDayIndex] ? [...next[selectedDayIndex]] : [];
      list.push(newBooking);
      next[selectedDayIndex] = list;
      return next;
    });

    setSelectedTime(null);
  };

  const toggleAutomation = (key: keyof typeof automations) => {
    setAutomations((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    setSelectedTime(null);
  }, [selectedDayIndex]);

  return (
    <div className="relative overflow-hidden">
      <ScrollProgress variant="bar" position="top" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-50" />
        <div className="noise absolute inset-0 opacity-70" />
        <div className="float-slow absolute -top-40 right-[-8%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(255,107,61,0.45),transparent_70%)] blur-3xl" />
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
            <a href="#simulador">// simulador</a>
            <a href="#agenda">// agenda</a>
            <a href="#automatizaciones">// automatizaciones</a>
            <a href="/turnos/admin">// admin</a>
          </nav>
          <div className="flex items-center gap-3">
            <a className="btn-secondary" href="/">
              Volver al home
            </a>
            <a className="btn-secondary" href="/turnos/admin">
              Panel admin
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-24">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6">
              <p className="kicker">Simulador interactivo</p>
              <h1 className="hero-title">
                Sistema de turnos con foco en experiencia, automatización y
                ocupación inteligente.
              </h1>
              <p className="hero-subtitle">
                Esta demo muestra cómo orquesto reservas, recordatorios y pagos
                para negocios de servicios. Elegí un profesional, asigná un
                horario y mirá cómo se actualiza la agenda en tiempo real.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="chip">WhatsApp</span>
                <span className="chip">Google Calendar</span>
                <span className="chip">Pagos online</span>
                <span className="chip">Lista de espera</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <a className="btn-primary" href="#simulador">
                  Probar simulador
                </a>
                <a className="btn-secondary" href="/#contacto">
                  Quiero un sistema así
                </a>
                <a className="btn-secondary" href="/turnos/admin">
                  Ver panel admin
                </a>
              </div>
            </div>

            <div className="glass card-tilt rounded-[32px] p-8">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                <span>Panel en vivo</span>
                <span className="rounded-full bg-[rgba(0,194,168,0.18)] px-3 py-1 text-[0.65rem] font-semibold text-[var(--accent-4)]">
                  Agenda activa
                </span>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-[rgba(15,23,42,0.06)] p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                    Ocupación
                  </p>
                  <p className="mt-2 text-2xl font-semibold">{occupancy}%</p>
                </div>
                <div className="rounded-2xl bg-[rgba(15,23,42,0.06)] p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                    Próximo slot
                  </p>
                  <p className="mt-2 text-2xl font-semibold">{nextAvailable}</p>
                </div>
                <div className="rounded-2xl bg-[rgba(15,23,42,0.06)] p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                    No show
                  </p>
                  <p className="mt-2 text-2xl font-semibold">{noShowRate}%</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {agendaForDay.slice(0, 3).map((booking) => (
                  <div
                    key={`${booking.time}-${booking.name}`}
                    className="flex items-center justify-between rounded-2xl border border-[var(--ring)] bg-[color:var(--surface-strong)] px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold">
                        {booking.time} · {booking.name}
                      </p>
                      <p className="text-xs text-[var(--muted)]">
                        {services.find((item) => item.id === booking.serviceId)?.name ??
                          "Servicio"}
                      </p>
                    </div>
                    <span
                      className={`status-pill status-pill--${booking.status}`}
                    >
                      {statusLabels[booking.status]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="simulador"
          className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10"
        >
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div className="glass rounded-[32px] p-8">
                <p className="kicker">Paso 1 · Servicio</p>
                <h2 className="mt-3 text-2xl font-semibold">
                  ¿Qué tipo de turno querés simular?
                </h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {services.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`rounded-3xl border border-[var(--ring)] p-4 text-left transition hover:-translate-y-[2px] ${
                        item.id === selectedServiceId
                          ? "bg-[rgba(255,107,61,0.15)]"
                          : "bg-[color:var(--surface-strong)]"
                      }`}
                      onClick={() => setSelectedServiceId(item.id)}
                      aria-pressed={item.id === selectedServiceId}
                    >
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                        <span>{item.duration}</span>
                        <span>{currencyFormatter.format(item.price)}</span>
                      </div>
                      <p className="mt-3 text-lg font-semibold">{item.name}</p>
                      <p className="mt-2 text-sm text-[var(--muted)]">
                        {item.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass rounded-[32px] p-8">
                <p className="kicker">Paso 2 · Profesional</p>
                <h2 className="mt-3 text-2xl font-semibold">
                  Elegí el especialista ideal
                </h2>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {professionals.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`rounded-3xl border border-[var(--ring)] p-4 text-left transition hover:-translate-y-[2px] ${
                        item.id === selectedProfessionalId
                          ? "bg-[rgba(42,166,255,0.15)]"
                          : "bg-[color:var(--surface-strong)]"
                      }`}
                      onClick={() => setSelectedProfessionalId(item.id)}
                      aria-pressed={item.id === selectedProfessionalId}
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                        {item.specialty}
                      </p>
                      <p className="mt-3 text-base font-semibold">{item.name}</p>
                      <div className="mt-3 flex items-center justify-between text-xs font-semibold text-[var(--muted)]">
                        <span>★ {item.rating}</span>
                        <span>{item.availability}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass rounded-[32px] p-8">
                <p className="kicker">Paso 3 · Fecha y horario</p>
                <h2 className="mt-3 text-2xl font-semibold">
                  Seleccioná el día y el slot
                </h2>
                <div className="mt-5 flex flex-wrap gap-3">
                  {days.map((day, index) => (
                    <button
                      key={day.id}
                      type="button"
                      className={`chip ${index === selectedDayIndex ? "chip-active" : ""}`}
                      onClick={() => setSelectedDayIndex(index)}
                      aria-pressed={index === selectedDayIndex}
                    >
                      {capitalize(dayFormatter.format(day.date))}
                    </button>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
                  {timeSlots.map((slot) => {
                    const isBlocked = blockedSlots.has(slot);
                    const isReserved = reservedSlots.has(slot);
                    const isSelected = selectedTime === slot;
                    const stateClass = isSelected
                      ? "is-selected"
                      : isReserved
                      ? "is-reserved"
                      : isBlocked
                      ? "is-blocked"
                      : "";

                    return (
                      <button
                        key={slot}
                        type="button"
                        className={`turno-slot ${stateClass}`}
                        onClick={() => {
                          if (isBlocked || isReserved) return;
                          setSelectedTime(slot);
                        }}
                        disabled={isBlocked || isReserved}
                        aria-pressed={isSelected}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-5 flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--accent-2)]" />
                    Disponible
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[rgba(15,23,42,0.2)]" />
                    Bloqueado
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[rgba(255,107,61,0.7)]" />
                    Reservado
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass rounded-[32px] p-8">
                <p className="kicker">Resumen</p>
                <h2 className="mt-3 text-2xl font-semibold">
                  Turno simulado
                </h2>
                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border border-[var(--ring)] bg-[color:var(--surface-strong)] p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                      Servicio
                    </p>
                    <p className="mt-2 text-lg font-semibold">{service.name}</p>
                    <p className="text-sm text-[var(--muted)]">
                      {service.duration} · {currencyFormatter.format(service.price)}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[var(--ring)] bg-[color:var(--surface-strong)] p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                      Profesional
                    </p>
                    <p className="mt-2 text-lg font-semibold">{professional.name}</p>
                    <p className="text-sm text-[var(--muted)]">
                      {professional.specialty}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[var(--ring)] bg-[color:var(--surface-strong)] p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                      Fecha
                    </p>
                    <p className="mt-2 text-lg font-semibold">
                      {selectedDay ? capitalize(longFormatter.format(selectedDay.date)) : ""}
                    </p>
                    <p className="text-sm text-[var(--muted)]">
                      {selectedTime ? `Horario: ${selectedTime}` : "Seleccioná un horario"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-primary mt-6 w-full"
                  onClick={handleConfirm}
                  disabled={!selectedTime}
                >
                  Confirmar simulación
                </button>
                <p className="mt-3 text-xs text-[var(--muted)]">
                  Turno demo: se agrega a la agenda del día.
                </p>
              </div>

              <div id="agenda" className="glass rounded-[32px] p-8">
                <p className="kicker">Agenda del día</p>
                <h2 className="mt-3 text-2xl font-semibold">
                  {selectedDay ? capitalize(longFormatter.format(selectedDay.date)) : ""}
                </h2>
                <div className="mt-6 space-y-4">
                  {agendaForDay.length === 0 ? (
                    <p className="text-sm text-[var(--muted)]">
                      Sin turnos cargados. Probá agregar uno desde el simulador.
                    </p>
                  ) : (
                    agendaForDay.map((booking) => {
                      const serviceName =
                        services.find((item) => item.id === booking.serviceId)?.name ??
                        "Servicio";
                      const professionalName =
                        professionals.find((item) => item.id === booking.professionalId)?.name ??
                        "Profesional";

                      return (
                        <div
                          key={`${booking.time}-${booking.name}-${booking.channel}`}
                          className="flex items-center justify-between rounded-2xl border border-[var(--ring)] bg-[color:var(--surface-strong)] px-4 py-3"
                        >
                          <div>
                            <p className="text-sm font-semibold">
                              {booking.time} · {booking.name}
                            </p>
                            <p className="text-xs text-[var(--muted)]">
                              {serviceName} · {professionalName}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span
                              className={`status-pill status-pill--${booking.status}`}
                            >
                              {statusLabels[booking.status]}
                            </span>
                            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                              {booking.channel}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div id="automatizaciones" className="glass rounded-[32px] p-8">
                <p className="kicker">Automatizaciones</p>
                <h2 className="mt-3 text-2xl font-semibold">
                  Activá las reglas inteligentes
                </h2>
                <div className="mt-6 flex flex-wrap gap-3">
                  {automationOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className={`chip ${automations[option.id as keyof typeof automations] ? "chip-active" : ""}`}
                      onClick={() => toggleAutomation(option.id as keyof typeof automations)}
                      aria-pressed={automations[option.id as keyof typeof automations]}
                      title={option.impact}
                      aria-label={`${option.label}. ${option.impact}.`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-[var(--ring)] bg-[color:var(--surface-strong)] p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                      Ausencias
                    </p>
                    <p className="mt-2 text-xl font-semibold">{noShowRate}%</p>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      Estimación con reglas activas.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[var(--ring)] bg-[color:var(--surface-strong)] p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                      Slots libres
                    </p>
                    <p className="mt-2 text-xl font-semibold">{availableSlots.length}</p>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      Disponibles para reasignar.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[var(--ring)] bg-[color:var(--surface-strong)] p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                      Ocupación
                    </p>
                    <p className="mt-2 text-xl font-semibold">{occupancy}%</p>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      Sobre {totalUsableSlots} turnos.
                    </p>
                  </div>
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
            <a href="/#contacto">Contacto</a>
            <a href="#simulador">Simulador</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
