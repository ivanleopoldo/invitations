import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  type ColumnFiltersState,
  type SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import { Search, ArrowLeft, ArrowRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { useState } from "react";
import { motion } from "motion/react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useIsMobile } from "@/hooks/useIsMobile";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const isMobile = useIsMobile();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative">
          <InputGroup className="max-w-xs">
            <InputGroupInput
              placeholder="Search..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(e) =>
                table.getColumn("name")?.setFilterValue(e.target.value)
              }
              className="placeholder:text-foreground/40"
            />
            <InputGroupAddon>
              <Search className="text-foreground/40" />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-background/30 shadow-sm backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden"
      >
        <Table>
          <TableHeader className="bg-primary border-border/30 border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="px-4 py-3 last:pr-4 first:pl-4 font-semibold text-foreground text-sm"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  data-state={row.getIsSelected() && "selected"}
                  className="group hover:bg-muted/20 border-border/20 border-b last:border-b-0 transition-all duration-200"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="group-hover:bg-muted/20 px-4 py-3 last:pr-4 first:pl-4 text-foreground"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </motion.tr>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-white text-center"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex justify-center items-center bg-muted/50 rounded-full w-12 h-12">
                      <Search className="w-5 h-5 text-white" />
                    </div>
                    <p>No invitations found</p>
                    <p className="text-xs">Try adjusting your search terms</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.div>
      <div className="flex sm:flex-row flex-col justify-between items-center gap-4 pt-2">
        <div className="text-white text-sm">
          Showing{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}{" "}
          to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length,
          )}{" "}
          of {table.getFilteredRowModel().rows.length} results
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="disabled:opacity-50 border-border/50 text-foreground hover:text-primary disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            {!isMobile && "Previous"}
          </Button>
          {isMobile ? (
            <div>{table.getState().pagination.pageIndex + 1}</div>
          ) : (
            <div className="flex items-center space-x-1">
              {Array.from(
                { length: Math.min(5, table.getPageCount()) },
                (_, i) => {
                  // Calculate the page range centered around current page
                  const currentPage = table.getState().pagination.pageIndex;
                  const totalPages = table.getPageCount();
                  let startPage = Math.max(0, currentPage - 2);
                  let endPage = Math.min(totalPages, startPage + 5);

                  // Adjust if we're at the end
                  if (endPage - startPage < 5 && startPage > 0) {
                    startPage = Math.max(0, endPage - 5);
                  }

                  const pageIndex = startPage + i;
                  if (pageIndex >= totalPages) return null;

                  return (
                    <Button
                      key={`page-${pageIndex}`}
                      variant={
                        table.getState().pagination.pageIndex === pageIndex
                          ? "default"
                          : "ghost"
                      }
                      size="sm"
                      onClick={() => table.setPageIndex(pageIndex)}
                      className="p-0 border-border/50 w-8 h-8 text-foreground hover:text-primary"
                    >
                      {pageIndex + 1}
                    </Button>
                  );
                },
              )}
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="disabled:opacity-50 border-border/50 text-foreground hover:text-primary disabled:cursor-not-allowed"
          >
            {!isMobile && "Next"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
