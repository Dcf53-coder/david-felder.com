import { formatDate } from "./utils";

interface CellProps {
  value: string | undefined;
}

export function DateCell({ value }: CellProps) {
  return value ? (
    <time className="font-mono text-sm text-foreground uppercase tracking-wider">
      {formatDate(value)}
    </time>
  ) : (
    <span>—</span>
  );
}

export function ProgramTitleCell({ value }: CellProps) {
  return value ? (
    <div className="font-bold text-foreground">{value}</div>
  ) : (
    <span>—</span>
  );
}

export function WorkCell({ value }: CellProps) {
  return value ? (
    <div className="text-foreground font-medium">{value}</div>
  ) : (
    <span>—</span>
  );
}

export function ComposerCell({ value }: CellProps) {
  return value || "—";
}

export function EnsembleCell({ value }: CellProps) {
  return value || "—";
}

export function ContextCell({ value }: CellProps) {
  return value || "—";
}

export function InstrumentationCell({ value }: CellProps) {
  return value ? (
    <div className="max-w-xs text-gray-700" title={value}>
      {value}
    </div>
  ) : (
    <span>—</span>
  );
}
