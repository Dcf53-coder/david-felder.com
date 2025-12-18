interface TableHeaderProps {
  title?: string;
  description?: string;
}

export function TableHeader({
  title = "Concerts programmed by Felder: 1986 through 2019 (not updated)",
  description = "David Felder's programming and performance history, featuring works by various composers and ensembles.",
}: TableHeaderProps) {
  return (
    <header className="mb-20 flex flex-col items-center md:items-end md:text-right md:ml-auto max-w-4xl">
      <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
        {title}
      </h1>

      {/* Pushes the accent bar to the right to match the text */}
      <div className="mt-4 h-2 w-32 bg-foreground" />

      <p className="mt-6 text-xl text-gray-600 max-w-2xl leading-relaxed">
        {description}
      </p>
    </header>
  );
}
