import { Button, CloseButton, Dialog, Portal, Stack } from "@chakra-ui/react";
import { TopbarCoponent, Table } from "../../../components";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { requestsColumns } from "./statics";
import useFetch from "../../../hooks/useFetch";
import { ABM_LOCAL } from "../../../config/constanst";
import { renderRowMenu } from "../../../helpers/renderRowMenu";
import { Toaster, toaster } from "../../../components/ui/toaster";

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
  const [action, setAction] = useState<"approve" | "reject" | null>(null);
  const [isRejectOpen, setIsRejectOpen] = useState(false);

  const [currentId, setcurrentId] = useState<number | null>(null);

  const {
    data: campaignsData,
    isLoading,
    error: errorMessage,
    makeRequest: getPendingRequest,
  } = useFetch<any>(`${ABM_LOCAL.GET_PENDING_REQUEST}?status=PENDING`, {
    useInitialFetch: false,
    method: "get",
  });

  useEffect(() => {
    getPendingRequest();
  }, []);

  //aprobar
  const { data: centerApprove, makeRequest: approveCenter } = useFetch<any>(
    `${ABM_LOCAL.GET_PENDING_REQUEST}/${currentId}/approve`,
    {
      useInitialFetch: false,
      method: "post",
    }
  );

  useEffect(() => {
    if (!centerApprove) return;
    if (centerApprove.id && centerApprove.status === "APPROVED") {
      getPendingRequest();
      toaster.create({
        description: "Se aprobo el alta del centro.",
        type: "info",
        closable: true,
      });
    }
  }, [centerApprove]);

  //rechazar
  const {
    data: rejectResponse,
    makeRequest: rejectCenter,
    isLoading: isRejecting,
  } = useFetch<any>(`${ABM_LOCAL.GET_PENDING_REQUEST}/${currentId}/reject`, {
    useInitialFetch: false,
    method: "post",
  });

  useEffect(() => {
    if (!rejectResponse) return;
    if (rejectResponse.id && rejectResponse.status === "REJECTED") {
      getPendingRequest();
      toaster.create({
        description: "Se rechazo el alta del centro.",
        type: "info",
        closable: true,
      });
    }
  }, [rejectResponse]);

  useEffect(() => {
    if (!currentId || !action) return;
    if (action === "approve") approveCenter();
    if (action === "reject") rejectCenter();
  }, [currentId, action]);

  const fmtDate = (iso?: string) =>
    iso ? new Date(iso).toLocaleDateString("es-AR") : "—";

  const toRow = (r: any) => ({
    id: r.id,
    name: r.payload?.name ?? "—",
    address: r.payload?.address ?? "—",
    zone: r.payload?.zone ?? "—",
    specialties: r.payload?.specialties?.length
      ? r.payload.specialties.join(", ")
      : "—",
    createdBy: r.createdBy ?? "—",
    createdAt: fmtDate(r.createdAt),
    status: r.status === "PENDING" && "Pendiente",
    menu: renderRowMenu(r.id, [
      {
        label: "Ver solicitud",
        action: (id) => navigate(`/administrar/solicitudes/${id}`),
      },
      { type: "separator" },
      {
        label: "Aprobar",
        action: (id) => {
          setcurrentId(id);
          setAction("approve");
        },
      },
      {
        label: "Rechazar",
        action: (id) => {
          console.log(id, "desde aca");
          setcurrentId(id);
          setAction("reject");
          setIsRejectOpen(true);
        },
        danger: true,
      },
    ]),
  });

  useEffect(() => {
    if (!campaignsData) return;
    const list = Array.isArray(campaignsData)
      ? campaignsData
      : campaignsData.data ?? [];

    setDataToTable(list.map(toRow));

    const meta = Array.isArray(campaignsData) ? null : campaignsData;
    setPagination({
      pageNumber: meta?.pageNumber ?? 1,
      pageSize: meta?.pageSize ?? list.length,
      totalResults: meta?.totalResults ?? list.length,
      totalPages: meta?.totalPages ?? 1,
    });
  }, [campaignsData]);

  return (
    <Stack gap={6} px={6}>
      <Toaster />
      <TopbarCoponent
        title={{ name: "Administrar solicitudes pendientes" }}
        breadcrumb={[
          { text: "Inicio", onClick: () => navigate("/") },
          { text: "ABM Centros", onClick: () => navigate("/administrar") },
          {
            text: "Administrar solicitudes pendientes",
            onClick: () => navigate("/administrar"),
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
          dataSize={5}
        />
      </Stack>

      <Dialog.Root
        open={isRejectOpen}
        onOpenChange={(e) => setIsRejectOpen(e.open)}
        placement={"center"}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>Rechazar solicitud</Dialog.Header>
              <Dialog.Body>
                Esta acción marcará la solicitud como RECHAZADA. ¿Querés
                continuar?
              </Dialog.Body>
              <Dialog.Footer>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsRejectOpen(false);
                    setAction(null);
                  }}
                  disabled={isRejecting}
                >
                  Cancelar
                </Button>
                <Button
                  colorPalette="red"
                  onClick={() => {
                    setIsRejectOpen(false);
                    rejectCenter();
                    setAction(null);
                  }}
                  loading={isRejecting}
                >
                  Rechazar
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger />
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Stack>
  );
};

export default SolicitudesScreen;
