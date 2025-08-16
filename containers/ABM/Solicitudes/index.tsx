import { Stack } from "@chakra-ui/react";
import { TopbarCoponent, Table } from "../../../components";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { requestsColumns } from "./statics";
import useFetch from "../../../hooks/useFetch";
import { ABM_LOCAL } from "../../../config/constanst";
import { renderRowMenu } from "../../../helpers/renderRowMenu";

const SolicitudesScreen = () => {
  let navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [dataToTable, setDataToTable] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>({
    totalPages: "",
    pageNumber: "",
    pageSize: "",
    totalResults: "",
  });

  const {
    data: campaignsData,
    isLoading,
    error: errorMessage,
  } = useFetch<any>(ABM_LOCAL.GET_PENDING_REQUEST, {
    useInitialFetch: true,
  });

  useEffect(() => {
    if (campaignsData && campaignsData.data) {
      console.log(campaignsData.data);
      setDataToTable(
        campaignsData.data.map((c) => ({
          id: c.id,
          ...c,
          menu: renderRowMenu(c.id, [
            {
              label: "Ver solicitud",
              action: (id) => navigate(`/abm-salud/solicitudes/${id}`),
              // icon: <FiEye />,
            },
            { type: "separator" },
            {
              label: "Aprobar",
              action: (id) => console.log("aprobar", id),
              // icon: <FiCheck />,
            },
            {
              label: "Rechazar",
              action: (id) => console.log("rechazar", id),
              // icon: <FiX />,
              danger: true,
              confirmMessage: "¿Rechazar la solicitud?",
            },
          ]),
        }))
      );
      setPagination({
        totalPages: campaignsData.totalPages,
        pageNumber: campaignsData.pageNumber,
        pageSize: campaignsData.pageSize,
        totalResults: campaignsData.totalResults,
      });
    }
  }, [campaignsData]);

  return (
    <Stack gap={6} px={6}>
      <TopbarCoponent
        title={{ name: "Administrar solicitudes pendientes" }}
        breadcrumb={[
          { text: "Inicio", onClick: () => navigate("/") },
          { text: "ABM Centros", onClick: () => navigate("/abm-salud") },
          {
            text: "Administrar solicitudes pendientes",
            onClick: () => navigate("/abm-salud"),
          },
        ]}
      />
      <Stack>
        <Table
          data={dataToTable}
          columns={requestsColumns}
          rowKey="id"
          onRowClick={() => {}}
          loading={loading}
          loadingText="Obteniendo el listado de las sucursales"
          variant="outline"
          clientPaginate={false}
          pagination={{
            page,
            pageSize: pagination.pageSize || 10,
            total: pagination.totalResults || 0,
            onPageChange: (p) => {
              setPage(p);
            },
          }}
        />
      </Stack>
    </Stack>
  );
};

export default SolicitudesScreen;
