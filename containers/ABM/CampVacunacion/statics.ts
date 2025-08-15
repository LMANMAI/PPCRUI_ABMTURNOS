export interface Column<T> {
  header: string;
  accessor: keyof T;
  textAlign?: "left" | "center" | "right";
}

export interface Campaign {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: "BORRADOR" | "ACTIVA" | "PAUSADA" | "FINALIZADA";
  menu?: React.ReactNode;
}

// Columnas para campañas
export const campaignColumns: Column<Campaign>[] = [
  { header: "Nombre de la campaña", accessor: "name", textAlign: "left" },
  { header: "Fecha de inicio", accessor: "startDate", textAlign: "left" },
  { header: "Fecha de fin", accessor: "endDate", textAlign: "left" },
  { header: "Estado", accessor: "status", textAlign: "left" },
  { header: "", accessor: "menu", textAlign: "center" },
];
