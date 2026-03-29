export type PropertyType = "tradicional" | "temporario" | "pozo" | "listo";

export type PropertyStatus = "disponible" | "reservado" | "vendido";

export type Property = {
  id: string;
  title: string;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  neighborhood: string;
  area: number;
  rooms: number;
  tag: string;
  highlight: string;
};

export const propertyTypeLabels: Record<PropertyType, string> = {
  tradicional: "Tradicional",
  temporario: "Temporario",
  pozo: "En pozo",
  listo: "Listo",
};

export const statusLabels: Record<PropertyStatus, string> = {
  disponible: "Disponible",
  reservado: "Reservado",
  vendido: "Vendido",
};

export const properties: Property[] = [
  {
    id: "ba-01",
    title: "Torre Rivera",
    type: "pozo",
    status: "disponible",
    price: 98000000,
    neighborhood: "Puerto Madero",
    area: 78,
    rooms: 3,
    tag: "Torre premium",
    highlight: "Lanzamiento Q3",
  },
  {
    id: "ba-02",
    title: "Tempo Palermo",
    type: "temporario",
    status: "reservado",
    price: 72000,
    neighborhood: "Palermo",
    area: 55,
    rooms: 2,
    tag: "Check-in smart",
    highlight: "Full amenities",
  },
  {
    id: "ba-03",
    title: "Lumiere Recoleta",
    type: "listo",
    status: "disponible",
    price: 158000000,
    neighborhood: "Recoleta",
    area: 102,
    rooms: 4,
    tag: "Entrega inmediata",
    highlight: "Vista abierta",
  },
  {
    id: "ba-04",
    title: "Loft Norte",
    type: "tradicional",
    status: "vendido",
    price: 119000000,
    neighborhood: "Belgrano",
    area: 84,
    rooms: 3,
    tag: "Listo",
    highlight: "Balcón full",
  },
  {
    id: "ba-05",
    title: "Distrito Sur",
    type: "pozo",
    status: "disponible",
    price: 89000000,
    neighborhood: "Caballito",
    area: 71,
    rooms: 3,
    tag: "Últimas unidades",
    highlight: "Financiación",
  },
  {
    id: "ba-06",
    title: "Tempo Microcentro",
    type: "temporario",
    status: "disponible",
    price: 59000,
    neighborhood: "Microcentro",
    area: 49,
    rooms: 2,
    tag: "Self check-in",
    highlight: "Alta demanda",
  },
  {
    id: "ba-07",
    title: "Lago Urbano",
    type: "tradicional",
    status: "disponible",
    price: 132000000,
    neighborhood: "Nuñez",
    area: 95,
    rooms: 4,
    tag: "Family",
    highlight: "Amenities",
  },
  {
    id: "ba-08",
    title: "Skyline Norte",
    type: "listo",
    status: "disponible",
    price: 145000000,
    neighborhood: "Saavedra",
    area: 88,
    rooms: 3,
    tag: "Entrega inmediata",
    highlight: "Cowork",
  },
];

export const amenities = [
  "Cochera",
  "Laundry",
  "Amenities",
  "Apto mascota",
  "Balcón",
  "Seguridad 24h",
];

export const neighborhoods = [
  "Palermo",
  "Recoleta",
  "Belgrano",
  "Nuñez",
  "Caballito",
  "Microcentro",
  "Puerto Madero",
  "Saavedra",
];
