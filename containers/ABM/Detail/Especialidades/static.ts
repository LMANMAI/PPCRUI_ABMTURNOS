export interface Centro {
  id: number;
  name: string;
  address: string;
  zone: string;
  specialties: string;
  status: "ACTIVO" | "INACTIVO";
}

export const rawData: Centro[] = [
  {
    id: 1,
    name: "Centro de Salud N°1",
    address: "Av. Rivadavia 1200",
    zone: "Centro",
    specialties: "General, Pediatría",
    status: "ACTIVO",
  },
  {
    id: 2,
    name: "Hospital Sur",
    address: "Av. Mitre 2335",
    zone: "Sur",
    specialties: "General, Cardiología",
    status: "INACTIVO",
  },
  {
    id: 3,
    name: "Clínica Norte",
    address: "Calle Belgrano 4035",
    zone: "Norte",
    specialties: "General, Odontología",
    status: "ACTIVO",
  },
  {
    id: 4,
    name: "Hospital Municipal",
    address: "Ruta 12 km 3",
    zone: "Este",
    specialties: "General",
    status: "ACTIVO",
  },
];
