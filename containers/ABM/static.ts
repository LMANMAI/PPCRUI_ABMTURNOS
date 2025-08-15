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
