import { Table } from "@tanstack/react-table";
import { ProgramData } from "./types";
import { formatDate } from "./utils";

interface MobileCardViewProps {
  table: Table<ProgramData>;
}

export function MobileCardView({ table }: MobileCardViewProps) {
  return (
    <div className="lg:hidden space-y-6">
      {table.getRowModel().rows.map((row) => (
        <article key={row.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:border-accent/20 hover:bg-accent/3 transition-all duration-normal">
          <div className="space-y-4">
            {row.original.programDate && (
              <time className="block text-sm font-mono uppercase tracking-wider text-accent">
                {formatDate(row.original.programDate)}
              </time>
            )}

            {row.original.programTitle && (
              <h3 className="text-xl font-black tracking-tight text-foreground leading-tight">
                {row.original.programTitle}
              </h3>
            )}

            {row.original.programWork && (
              <div>
                <span className="block text-sm font-mono uppercase tracking-wider text-accent mb-1">
                  Work
                </span>
                <p className="text-lg font-medium text-foreground">
                  {row.original.programWork}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-3">
              {row.original.composer && (
                <div>
                  <span className="block text-sm font-mono uppercase tracking-wider text-accent mb-1">
                    Composer
                  </span>
                  <p className="text-base text-gray-700">{row.original.composer}</p>
                </div>
              )}

              {row.original.ensemble && (
                <div>
                  <span className="block text-sm font-mono uppercase tracking-wider text-accent mb-1">
                    Ensemble
                  </span>
                  <p className="text-base text-gray-700">{row.original.ensemble}</p>
                </div>
              )}

              {row.original.context && (
                <div>
                  <span className="block text-sm font-mono uppercase tracking-wider text-accent mb-1">
                    Context
                  </span>
                  <p className="text-base text-gray-700">{row.original.context}</p>
                </div>
              )}

              {row.original.instrumentation && (
                <div>
                  <span className="block text-sm font-mono uppercase tracking-wider text-accent mb-1">
                    Instrumentation
                  </span>
                  <p className="text-base text-gray-700 leading-relaxed">
                    {row.original.instrumentation}
                  </p>
                </div>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
