import type { ColumnDef } from "@tanstack/react-table";
import {
  ComposerCell,
  ContextCell,
  DateCell,
  EnsembleCell,
  InstrumentationCell,
  ProgramTitleCell,
  WorkCell,
} from "./TableCells";
import type { ProgramData } from "./types";
import { dateSortingFn } from "./utils";

export const createTableColumns = (): ColumnDef<ProgramData>[] => [
  {
    accessorKey: "programDate",
    header: "Date",
    cell: ({ getValue }) => <DateCell value={getValue<string>()} />,
    sortingFn: dateSortingFn,
  },
  {
    accessorKey: "programTitle",
    header: "Program Title",
    cell: ({ getValue }) => <ProgramTitleCell value={getValue<string>()} />,
  },
  {
    accessorKey: "programWork",
    header: "Work",
    cell: ({ getValue }) => <WorkCell value={getValue<string>()} />,
  },
  {
    accessorKey: "composer",
    header: "Composer",
    cell: ({ getValue }) => <ComposerCell value={getValue<string>()} />,
  },
  {
    accessorKey: "ensemble",
    header: "Ensemble",
    cell: ({ getValue }) => <EnsembleCell value={getValue<string>()} />,
  },
  {
    accessorKey: "context",
    header: "Context",
    cell: ({ getValue }) => <ContextCell value={getValue<string>()} />,
  },
  {
    accessorKey: "instrumentation",
    header: "Instrumentation",
    cell: ({ getValue }) => <InstrumentationCell value={getValue<string>()} />,
  },
];
