import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Stack, Flex, Heading, Text, Button, Input } from "@chakra-ui/react";
import { TopbarCoponent, Table } from "../../../../components";
import { Column } from "../../../../components/Table";

interface Schedule {
  day: string;
  from: string | React.ReactNode;
  to: string | React.ReactNode;
}

const initialSchedules = [
  { day: "Lunes", from: "09:00", to: "17:00" },
  { day: "Martes", from: "09:00", to: "17:00" },
  { day: "Miércoles", from: "09:00", to: "17:00" },
  { day: "Jueves", from: "09:00", to: "17:00" },
  { day: "Viernes", from: "09:00", to: "17:00" },
  { day: "Sábado", from: "10:00", to: "14:00" },
  { day: "Domingo", from: "–", to: "–" },
];

export default function HorariosPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const centroId = Number(id);

  const [editing, setEditing] = useState(false);
  const [schedules, setSchedules] = useState(
    initialSchedules.map((s) => ({ ...s }))
  );
  const [backup, setBackup] = useState(schedules);

  const startEdit = () => {
    setBackup(schedules.map((s) => ({ ...s })));
    setEditing(true);
  };
  const cancelEdit = () => {
    setSchedules(backup);
    setEditing(false);
  };
  const saveEdit = () => {
    //enviar datos al back
    setEditing(false);
  };

  const handleChange = (idx: number, field: "from" | "to", value: string) => {
    setSchedules((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  };

  const columns: Column<Schedule>[] = [
    { header: "Día", accessor: "day", textAlign: "left" },
    { header: "Desde", accessor: "from", textAlign: "center" },
    { header: "Hasta", accessor: "to", textAlign: "center" },
  ];

  const data: Schedule[] = schedules.map((row, idx) => ({
    day: row.day,
    from: editing ? (
      <Input
        type="time"
        size="sm"
        value={row.from as string}
        onChange={(e) => handleChange(idx, "from", e.target.value)}
      />
    ) : (
      row.from
    ),
    to: editing ? (
      <Input
        type="time"
        size="sm"
        value={row.to as string}
        onChange={(e) => handleChange(idx, "to", e.target.value)}
      />
    ) : (
      row.to
    ),
  }));

  return (
    <Stack gap={6} px={6}>
      <TopbarCoponent
        title={{ name: "Horarios de atención" }}
        breadcrumb={[
          { text: "Inicio", onClick: () => navigate("/") },
          { text: "ABM Centros", onClick: () => navigate("/administrar") },
          {
            text: `Centro ${centroId}`,
            onClick: () => navigate(`/administrar/detail/${centroId}`),
          },
          { text: "Horarios", onClick: () => {} },
        ]}
      />

      <Text color="gray.600">
        Revisa y ajusta los días y rangos de atención del centro.
      </Text>

      <Flex justify="space-between" align="center">
        <Heading size="md">Horario Semanal</Heading>
        {editing ? (
          <Stack direction="row" gap={2}>
            <Button size="sm" colorScheme="teal" onClick={saveEdit}>
              Guardar
            </Button>
            <Button size="sm" variant="outline" onClick={cancelEdit}>
              Cancelar
            </Button>
          </Stack>
        ) : (
          <Button size="sm" colorScheme="teal" onClick={startEdit}>
            Editar
          </Button>
        )}
      </Flex>

      <Table
        columns={columns}
        data={data}
        rowKey="day"
        size="md"
        variant="simple"
      />
    </Stack>
  );
}
