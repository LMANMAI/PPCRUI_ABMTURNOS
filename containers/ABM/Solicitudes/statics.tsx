// containers/ABM/solicitudes/static.ts
import { Badge } from "@chakra-ui/react";
import { Column } from "../../../components/Table";
import { renderRowMenu } from "../../../helpers/renderRowMenu";
import { FiEye, FiCheck, FiX } from "react-icons/fi";

export type RequestStatus = "PENDIENTE" | "APROBADA" | "RECHAZADA";

export interface SolicitudCentroRow {
  id: number;
  centerName: string;
  address: string;
  zone: string;
  specialties: string;
  requestedBy: string;
  requestedAt: string;
  status: RequestStatus | any;
  menu?: React.ReactNode;
}

export const requestsColumns: Column<any>[] = [
  { header: "Centro solicitado", accessor: "name", textAlign: "left" },
  { header: "Dirección", accessor: "address", textAlign: "left" },
  { header: "Zona", accessor: "zone", textAlign: "left" },
  { header: "Especialidades", accessor: "specialties", textAlign: "left" },
  { header: "Solicitado por", accessor: "createdBy", textAlign: "left" },
  { header: "Fecha de solicitud", accessor: "createdAt", textAlign: "left" },
  { header: "Estado", accessor: "status", textAlign: "center" },
  { header: "", accessor: "menu", textAlign: "center" }, // menú
];
