interface TableHeaderProps {
  title?: string;
  description?: string;
}

export function TableHeader({
  title = "Concerts Programmed by Felder: 1986-2019 (Archived)",
  description = "This section documents concerts programmed from 1986 through 2019 and is no longer being actively updated. For recent programming, please contact directly.",
}: TableHeaderProps) {
  return (
    <header className="mb-20 flex flex-col items-center md:items-start">
      <h1 className="text-6xl md:text-8xl font-black tracking-tight">
        {title}
      </h1>
      <div className="mt-4 h-2 w-32 bg-foreground" />
      <p className="mt-6 text-xl text-gray-600 max-w-2xl leading-relaxed">
        {description}
      </p>
    </header>
  );
}
