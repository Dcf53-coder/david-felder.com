import { flexRender, type Table } from "@tanstack/react-table";
import type { ProgramData } from "./types";

interface DesktopTableProps {
  table: Table<ProgramData>;
}

export function DesktopTable({ table }: DesktopTableProps) {
  return (
    <div className="hidden lg:block bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-gray-200">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left bg-gray-50 border-b border-gray-200"
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <button
                        type="button"
                        className="cursor-pointer select-none flex items-center space-x-2 hover:text-accent transition-colors duration-normal group bg-transparent border-none p-0 text-left"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <span className="text-sm font-mono uppercase tracking-wider text-foreground font-bold">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </span>
                        <span className="text-gray-400 group-hover:text-accent transition-colors duration-fast">
                          {{
                            asc: "↑",
                            desc: "↓",
                          }[header.column.getIsSorted() as string] ?? "↕"}
                        </span>
                      </button>
                    ) : (
                      <span className="flex items-center text-sm font-mono uppercase tracking-wider text-foreground font-bold">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={`border-b border-gray-200 hover:bg-accent/3 transition-colors duration-normal ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-5 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
