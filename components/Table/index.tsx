import {
  Table,
  Spinner,
  Text,
  VStack,
  ButtonGroup,
  IconButton,
  Pagination as ChakraPagination,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import React from "react";

// Types
export interface Column<T> {
  header: string;
  accessor?: string;
  textAlign?: "left" | "right" | "center";
}

type CustomPaginationConfig = {
  enabled: boolean; // Activa el modo custom
  page: number; // 1-based
  pageSize: number; // ítems por página
  totalItems: number; // total de ítems
  totalPages?: number; // opcional (si no lo pasás, se calcula)
  onPageChange: (page: number) => void;
};

interface CustomTableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKey: keyof T;
  onRowClick?: (row: T) => void;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "line";
  loading?: boolean;
  loadingText?: string;
  emptyStateText?: string;
  // NUEVO: paginación automática (default true) + tamaño de página
  pagination?: boolean; // default: true
  dataSize?: number; // usado solo en automático; default: 10

  // NUEVO: paginación custom (server-side / control externo)
  customPagination?: CustomPaginationConfig;
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
  emptyStateText,
  // automático (por defecto)
  pagination = true,
  dataSize = 10,

  // custom
  customPagination,
}: CustomTableProps<T>) {
  const isCustom = Boolean(customPagination?.enabled);

  // --------- AUTOMÁTICO (client-side) -----------
  const [autoPage, setAutoPage] = React.useState(1); // 1-based

  // Si cambia el data o dataSize, reseteo página si quedó fuera de rango
  React.useEffect(() => {
    if (!isCustom && pagination) {
      const maxPage =
        dataSize > 0 ? Math.max(1, Math.ceil(data.length / dataSize)) : 1;
      if (autoPage > maxPage) setAutoPage(maxPage);
    }
  }, [data.length, dataSize, pagination, isCustom, autoPage]);

  // Data a renderizar según modo
  let renderData: T[] = data;
  let page = 1;
  let pageSize = data.length || 10;
  let totalItems = data.length;
  let pageCount = 1;

  if (isCustom && customPagination) {
    // --------- CUSTOM -----------
    page = customPagination.page ?? 1;
    pageSize = (customPagination.pageSize ?? data.length) || 10;
    totalItems = customPagination.totalItems ?? data.length;
    pageCount =
      customPagination.totalPages ??
      (pageSize > 0 ? Math.max(1, Math.ceil(totalItems / pageSize)) : 1);

    // En custom NO se corta el array: asumimos que `data` ya viene con la página aplicada
    renderData = data;
  } else if (pagination) {
    // --------- AUTOMÁTICO -----------
    page = autoPage;
    pageSize = dataSize > 0 ? dataSize : data.length || 10;
    totalItems = data.length;
    pageCount =
      pageSize > 0 ? Math.max(1, Math.ceil(totalItems / pageSize)) : 1;

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    renderData = data.slice(start, end);
  } else {
    // sin paginación
    renderData = data;
    page = 1;
    pageSize = data.length || 10;
    totalItems = data.length;
    pageCount = 1;
  }

  const showPager = (isCustom && customPagination) || pagination;
  const canShowControls =
    showPager && pageSize > 0 && totalItems > pageSize && pageCount > 1;

  const handlePrev = () => {
    if (isCustom && customPagination) {
      customPagination.onPageChange(Math.max(1, page - 1));
    } else {
      setAutoPage((p) => Math.max(1, p - 1));
    }
  };

  const handleNext = () => {
    if (isCustom && customPagination) {
      customPagination.onPageChange(Math.min(pageCount, page + 1));
    } else {
      setAutoPage((p) => Math.min(pageCount, p + 1));
    }
  };

  const handleGoTo = (p: number) => {
    if (isCustom && customPagination) {
      customPagination.onPageChange(p);
    } else {
      setAutoPage(p);
    }
  };

  return (
    <VStack align="stretch" gap={4} width="full">
      <Table.Root size={size} variant={variant}>
        <Table.Header>
          {columns.map((col) => (
            <Table.ColumnHeader
              key={String(col.accessor ?? col.header)}
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
          ) : renderData.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={columns.length} py={6}>
                <Text fontSize="sm" color="gray.500" textAlign="center">
                  {emptyStateText ? emptyStateText : "Sin resultados"}
                </Text>
              </Table.Cell>
            </Table.Row>
          ) : (
            renderData.map((row) => (
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

      {canShowControls && (
        <ChakraPagination.Root
          count={totalItems}
          pageSize={pageSize}
          page={page}
        >
          <ButtonGroup
            variant="ghost"
            size="sm"
            wrap="wrap"
            justifyContent="center"
          >
            <ChakraPagination.PrevTrigger asChild>
              <IconButton
                aria-label="Anterior"
                onClick={handlePrev}
                disabled={page <= 1}
              >
                <LuChevronLeft />
              </IconButton>
            </ChakraPagination.PrevTrigger>

            <ChakraPagination.Items
              render={(p) => (
                <IconButton
                  key={p.value}
                  aria-label={`Página ${p.value}`}
                  onClick={() => handleGoTo(p.value)}
                  variant={{ base: "ghost", _selected: "outline" }}
                  data-selected={p.value === page ? "" : undefined}
                >
                  {p.value}
                </IconButton>
              )}
            />

            <ChakraPagination.NextTrigger asChild>
              <IconButton
                aria-label="Siguiente"
                onClick={handleNext}
                disabled={page >= pageCount}
              >
                <LuChevronRight />
              </IconButton>
            </ChakraPagination.NextTrigger>
          </ButtonGroup>
        </ChakraPagination.Root>
      )}
    </VStack>
  );
}

export { CustomTable as Table };
