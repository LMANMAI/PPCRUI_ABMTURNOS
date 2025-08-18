import {
  Grid,
  GridItem,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TopbarCoponent } from "../../components";
import { useNavigate } from "react-router";

const patientsPerWeek = [
  { week: "Semana 1", patients: 120 },
  { week: "Semana 2", patients: 150 },
  { week: "Semana 3", patients: 90 },
  { week: "Semana 4", patients: 130 },
];

const avgWaitTimePerDay = [
  { day: "Lun", time: 15 },
  { day: "Mar", time: 18 },
  { day: "Mié", time: 12 },
  { day: "Jue", time: 20 },
  { day: "Vie", time: 17 },
];

const appointmentsByProfessional = [
  { name: "Dr. García", count: 45 },
  { name: "Dra. Pérez", count: 60 },
  { name: "Dr. López", count: 35 },
  { name: "Dra. Ruiz", count: 50 },
];

const specialtyDistribution = [
  { name: "General", value: 40 },
  { name: "Pediatría", value: 25 },
  { name: "Cardiología", value: 20 },
  { name: "Odontología", value: 15 },
];
const COLORS = ["#3182CE", "#38A169", "#DD6B20", "#718096"];

export default function HomePage() {
  let navigate = useNavigate();
  return (
    <Box p={6}>
      <TopbarCoponent
        title={{ name: "Metricas del ultimo mes" }}
        breadcrumb={[{ text: "Inicio", onClick: () => navigate("/") }]}
      />
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <Card.Root>
            <CardHeader>
              <Heading size="sm">Pacientes por semana (último mes)</Heading>
            </CardHeader>
            <CardBody>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={patientsPerWeek}>
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="patients" fill="#3182CE" />
                </BarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card.Root>
        </GridItem>

        <GridItem>
          <Card.Root>
            <CardHeader>
              <Heading size="sm">Esperas promedio por día</Heading>
            </CardHeader>
            <CardBody>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={avgWaitTimePerDay}>
                  <XAxis dataKey="day" />
                  <YAxis unit="min" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="time"
                    stroke="#38A169"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardBody>
          </Card.Root>
        </GridItem>

        <GridItem>
          <Card.Root>
            <CardHeader>
              <Heading size="sm">Citas por profesional</Heading>
            </CardHeader>
            <CardBody>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={appointmentsByProfessional}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#DD6B20" />
                </BarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card.Root>
        </GridItem>

        <GridItem>
          <Card.Root>
            <CardHeader>
              <Heading size="sm">Distribución por especialidad</Heading>
            </CardHeader>
            <CardBody>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={specialtyDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label
                  >
                    {specialtyDistribution.map((entry, idx) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[idx % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardBody>
          </Card.Root>
        </GridItem>
      </Grid>
    </Box>
  );
}
