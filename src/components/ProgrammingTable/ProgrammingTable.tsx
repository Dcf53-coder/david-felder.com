"use client";

import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { DesktopTable } from "./DesktopTable";
import { MobileCardView } from "./MobileCardView";
import { PaginationControls } from "./PaginationControls";
import { TableHeader } from "./TableHeader";
import { createTableColumns } from "./tableColumns";
import type { ProgrammingListing } from "./types";

interface ProgrammingTableProps {
  programs: ProgrammingListing;
}

export function ProgrammingTable({ programs }: ProgrammingTableProps) {
  const columns = useMemo(() => createTableColumns(), []);

  const table = useReactTable({
    data: programs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      sorting: [
        {
          id: "programDate",
          desc: true,
        },
      ],
      pagination: {
        pageSize: 25,
      },
    },
  });

  const _hasRows = table.getRowModel().rows.length > 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-16 md:py-24 max-w-7xl">
        <TableHeader />

        <DesktopTable table={table} />
        <MobileCardView table={table} />
        <PaginationControls table={table} />
      </div>
    </div>
  );
}
