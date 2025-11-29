interface EmptyStateProps {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

export function EmptyState({ globalFilter, setGlobalFilter }: EmptyStateProps) {
  return (
    <div className="text-center py-20 bg-white border border-gray-200 rounded-lg">
      <div className="max-w-md mx-auto">
        <svg className="mx-auto h-16 w-16 text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <h3 className="text-2xl font-black tracking-tight text-foreground mb-2">
          No programs found
        </h3>
        {globalFilter ? (
          <div className="space-y-4">
            <p className="text-gray-600">
              No programs match your search for "{globalFilter}"
            </p>
            <button
              onClick={() => setGlobalFilter("")}
              className="inline-flex items-center px-4 py-2 text-sm font-medium bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors duration-normal"
            >
              Clear search
            </button>
          </div>
        ) : (
          <p className="text-gray-600">
            No programming data is currently available.
          </p>
        )}
      </div>
    </div>
  );
}
