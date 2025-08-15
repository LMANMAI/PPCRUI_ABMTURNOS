import { Table, Spinner, Text, VStack, Skeleton } from "@chakra-ui/react";

// Types
export interface Column<T> {
  header: string;
  accessor?: string;
  textAlign?: "left" | "right" | "center";
}

interface CustomTableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKey: keyof T;
  onRowClick?: (row: T) => void;
  size?: "sm" | "md" | "lg";
  variant?: string;
  loading?: boolean;
  loadingText?: string;
}

function CustomTable<T extends Record<string, any>>({
  data,
  columns,
  rowKey,
  onRowClick,
  size = "sm",
  variant = "simple",
  loading = false,
  loadingText = "Cargando...",
}: CustomTableProps<T>) {
  return (
    <Table.Root size="sm">
      <Table.Header>
        {columns.map((col) => (
          <Table.ColumnHeader
            key={String(col.accessor)}
            textAlign={col.textAlign}
            fontWeight="bold"
            fontSize="sm"
            borderBottom="1px solid"
            borderColor="gray.200"
          >
            {col.header}
          </Table.ColumnHeader>
        ))}
      </Table.Header>
      <Table.Body>
        {loading ? (
          <>
            {/* Spinner + texto centrados ocupando toda la tabla */}
            <Table.Row>
              <Table.Cell colSpan={columns.length} py={8}>
                <VStack gap={3}>
                  <Spinner size="lg" color={"teal"} />
                  <Text fontSize="sm" color="gray.600">
                    {loadingText}
                  </Text>
                </VStack>
              </Table.Cell>
            </Table.Row>

            {/* Filas skeleton para mantener layout */}
          </>
        ) : (
          data.map((row) => (
            <Table.Row
              key={String(row[rowKey])}
              cursor={onRowClick ? "pointer" : undefined}
              _hover={onRowClick ? { bg: "gray.50" } : undefined}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col) => {
                const cell = col.accessor ? row[col.accessor] : undefined;
                return (
                  <Table.Cell
                    key={String(col.accessor ?? col.header)}
                    textAlign={col.textAlign}
                    py={3}
                  >
                    {cell}
                  </Table.Cell>
                );
              })}
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table.Root>
  );
}
export { CustomTable as Table };
