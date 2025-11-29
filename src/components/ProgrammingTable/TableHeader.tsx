interface TableHeaderProps {
  title?: string;
  description?: string;
}

export function TableHeader({
  title = "Programming",
  description = "David Felder's programming and performance history, featuring works by various composers and ensembles."
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
