const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:3000/api/v1";

export const ABM_LOCAL = {
  GET_HEALTH_CENTERS: `${API_BASE}/centros-salud`,
  GET_CURRENT_CAMPAING: `${API_BASE}/campaigns`,
  CREATE_CENTER: `${API_BASE}/centros-salud`,
  GET_PENDING_REQUEST: `${API_BASE}/centros-salud/solicitudes`,
  CREATE_PERSONAL: `${API_BASE}/auth/register`,
};
