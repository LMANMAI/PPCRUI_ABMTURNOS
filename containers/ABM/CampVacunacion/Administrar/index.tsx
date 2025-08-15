import { Stack } from "@chakra-ui/react";
import { Table, TopbarCoponent } from "../../../../components";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { campaignColumns } from "../statics";
import useFetch from "../../../../hooks/useFetch";
import { ABM_LOCAL } from "../../../../config/constanst";
import { renderRowMenu } from "../../../../helpers/renderRowMenu";

const AdministrarCampañasVacunacionScreen = () => {
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

  const formatDate = (iso: string | Date) => {
    const d = typeof iso === "string" ? new Date(iso) : iso;
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const {
    data: campaignsData,
    isLoading,
    error: errorMessage,
  } = useFetch<any>(ABM_LOCAL.GET_CURRENT_CAMPAING, {
    useInitialFetch: true,
  });

  useEffect(() => {
    if (campaignsData && campaignsData.data) {
      setDataToTable(
        campaignsData.data.map((c) => ({
          id: c.id,
          name: c.name,
          startDate: formatDate(c.startDate),
          endDate: formatDate(c.endDate),
          status: c.status,
          menu: renderRowMenu(c.id, [
            { label: "Ver", action: () => {} },
            { type: "separator" },
            { label: "Editar", action: () => {} },
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
    <Stack px={6} gap={6}>
      <TopbarCoponent
        title={{ name: "Gestión de campañas de vacunacíon" }}
        breadcrumb={[
          { text: "Inicio", onClick: () => navigate("/") },
          { text: "ABM Centros", onClick: () => navigate("/abm-salud") },
          {
            text: "Administrar campañas",
            onClick: () => {
              navigate("/abm-salud/campañas");
            },
          },
        ]}
        buttonList={[
          {
            text: "Crear campaña de vacunación",
            onClick: () => navigate("/abm-salud/campañas/crear-campaña"),
            variant: "solid",
            colorScheme: "teal",
          },
        ]}
      />

      <Stack>
        <Stack alignItems={"end"}></Stack>
        <Table
          data={dataToTable}
          columns={campaignColumns}
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

export default AdministrarCampañasVacunacionScreen;
