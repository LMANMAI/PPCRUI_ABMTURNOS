import { Table } from "@chakra-ui/react";

import React from "react";

// Types
interface Column<T> {
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
}

function CustomTable<T extends Record<string, any>>({
  data,
  columns,
  rowKey,
  onRowClick,
  size = "sm",
  variant = "simple",
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
        {data.map((row) => (
          <Table.Row
            key={String(row[rowKey])}
            cursor={onRowClick ? "pointer" : undefined}
            _hover={onRowClick ? { bg: "gray.50" } : undefined}
            onClick={() => onRowClick?.(row)}
          >
            {columns.map((col) => {
              const cell = row[col.accessor];
              return (
                <Table.Cell
                  key={String(col.accessor)}
                  textAlign={col.textAlign}
                  py={3}
                >
                  {cell}
                </Table.Cell>
              );
            })}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export { CustomTable as Table };
