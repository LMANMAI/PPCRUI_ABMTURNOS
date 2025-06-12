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
    <Table.Root size="sm" showColumnBorder>
      <Table.Header>
        <Table.Row borderRadius={5}>
          <Table.ColumnHeader>Product</Table.ColumnHeader>
          <Table.ColumnHeader>Category</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.category}</Table.Cell>
            <Table.Cell textAlign="end">{item.price}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export { CustomTable as Table };
