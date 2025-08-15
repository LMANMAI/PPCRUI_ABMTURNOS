import {
  Table,
  Spinner,
  Text,
  VStack,
  Skeleton,
  Pagination,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

// Types
export interface Column<T> {
  header: string;
  accessor?: string;
  textAlign?: "left" | "right" | "center";
}

interface PaginationProps {
  page: number; // 1-based
  pageSize: number;
  total?: number; // total de ítems (requerido para server-side)
  onPageChange: (page: number) => void;
}

interface CustomTableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKey: keyof T;
  onRowClick?: (row: T) => void;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "line";
  loading?: boolean;
  loadingText?: string;
  clientPaginate?: boolean;
  pagination?: PaginationProps;
}

function CustomTable<T extends Record<string, any>>({
  data,
  columns,
  rowKey,
  onRowClick,
  size = "sm",
  variant = "outline",
  loading = false,
  loadingText = "Cargando...",
  clientPaginate = true,
  pagination,
}: CustomTableProps<T>) {
  const page = pagination?.page ?? 1;
  const pageSize = pagination?.pageSize ?? (data.length || 10);

  const totalItems = pagination?.total ?? data.length;

  const pageCount =
    pageSize > 0 ? Math.max(1, Math.ceil(totalItems / pageSize)) : 1;

  return (
    <VStack align="stretch" gap={4} width="full">
      <Table.Root size={size} variant={variant}>
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
      {pagination && pageSize > 0 && totalItems > pageSize && (
        <Pagination.Root count={totalItems} pageSize={pageSize} page={page}>
          <ButtonGroup
            variant="ghost"
            size="sm"
            wrap="wrap"
            justifyContent="center"
          >
            <Pagination.PrevTrigger asChild>
              <IconButton
                aria-label="Anterior"
                onClick={() => pagination.onPageChange(Math.max(1, page - 1))}
                disabled={page <= 1}
              >
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={(p) => (
                <IconButton
                  key={p.value}
                  aria-label={`Página ${p.value}`}
                  onClick={() => pagination.onPageChange(p.value)}
                  variant={{ base: "ghost", _selected: "outline" }}
                  data-selected={p.value === page ? "" : undefined}
                >
                  {p.value}
                </IconButton>
              )}
            />

            <Pagination.NextTrigger asChild>
              <IconButton
                aria-label="Siguiente"
                onClick={() =>
                  pagination.onPageChange(Math.min(pageCount, page + 1))
                }
                disabled={page >= pageCount}
              >
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      )}
    </VStack>
  );
}
export { CustomTable as Table };
