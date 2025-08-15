// export const rawData = [
//   {
//     id: 1,
//     name: "Centro de Salud N°1",
//     address: "Av. Rivadavia 1200",
//     zone: "Centro",
//     specialties: "General, Pediatría",
//     status: "ACTIVO",
//   },
//   {
//     id: 2,
//     name: "Hospital Sur",
//     address: "Av. Mitre 2335",
//     zone: "Sur",
//     specialties: "General, Cardiología",
//     status: "INACTIVO",
//   },
//   {
//     id: 3,
//     name: "Clínica Norte",
//     address: "Calle Belgrano 4035",
//     zone: "Norte",
//     specialties: "General, Odontología",
//     status: "ACTIVO",
//   },
//   {
//     id: 4,
//     name: "Hospital Municipal",
//     address: "Ruta 12 km 3",
//     zone: "Este",
//     specialties: "General",
//     status: "ACTIVO",
//   },
// ];

export interface Centro {
  id: number;
  name: string;
  address: string;
  zone: string;
  specialties: string;
  status: "ACTIVO" | "INACTIVO";
  menu: any;
}
export interface Column<T> {
  header: string;
  accessor: keyof T;
  textAlign?: "left" | "center" | "right";
}
export const columns: Column<Centro>[] = [
  { header: "Nombre del centro", accessor: "name", textAlign: "left" },
  { header: "Dirección", accessor: "address", textAlign: "left" },
  { header: "Zona", accessor: "zone", textAlign: "left" },
  { header: "Especialidades", accessor: "specialties", textAlign: "left" },
  { header: "Estado", accessor: "status", textAlign: "left" },
  { header: "", accessor: "menu", textAlign: "center" },
];
export const zonas = ["Centro", "Norte", "Sur", "Este", "Oeste"];
export const especialidades = [
  "General",
  "Pediatría",
  "Cardiología",
  "Odontología",
];
export const estados = ["ACTIVO", "INACTIVO"];
