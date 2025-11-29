import { Table } from "@tanstack/react-table";
import { ProgramData } from "./types";

interface PaginationControlsProps {
  table: Table<ProgramData>;
}

export function PaginationControls({ table }: PaginationControlsProps) {
  if (table.getPageCount() <= 1) {
    return null;
  }

  return (
    <div className="mt-12 flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
      <div className="flex items-center justify-center sm:justify-start gap-2">
        <button
          className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg bg-white hover:bg-accent/5 hover:border-accent/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-normal"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          title="First page"
        >
          {"<<"}
        </button>
        <button
          className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg bg-white hover:bg-accent/5 hover:border-accent/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-normal"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          title="Previous page"
        >
          {"<"}
        </button>
        <button
          className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg bg-white hover:bg-accent/5 hover:border-accent/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-normal"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          title="Next page"
        >
          {">"}
        </button>
        <button
          className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg bg-white hover:bg-accent/5 hover:border-accent/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-normal"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          title="Last page"
        >
          {">>"}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <span className="text-sm font-mono uppercase tracking-wider text-accent">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount().toLocaleString()}
        </span>

        <select
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-normal"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 25, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
