export interface ProgramData {
  _id: string;
  programTitle?: string | null;
  composer?: string | null;
  context?: string | null;
  ensemble?: string | null;
  instrumentation?: string | null;
  personnel?: string | null;
  programWork?: string | null;
  programDate?: string | null;
}

export type ProgrammingListing = ProgramData[];

// Column identifiers for TanStack Table
export type ColumnId = 'programTitle' | 'composer' | 'context' | 'ensemble' | 'programWork' | 'programDate' | 'instrumentation' | 'personnel';

// Table configuration
export interface TableConfig {
  pageSize: number;
  showPagination: boolean;
  enableSorting: boolean;
}
