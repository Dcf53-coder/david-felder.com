interface TableHeaderProps {
  title?: string;
  description?: string;
}

export function TableHeader({
  title = "Programming",
  description = "Concerts programmed by Felder: 1986 through 2019 (not updated)",
}: TableHeaderProps) {
  return (
    <header className="mb-20 flex flex-col items-center md:items-end md:text-right md:ml-auto max-w-3xl">
      <h1 className="text-6xl md:text-8xl font-black tracking-tight uppercase">
        {title}
      </h1>

      {/* The bar now aligns to the right because of items-end */}
      <div className="mt-4 h-2 w-32 bg-foreground" />

      {/* Increased the size and changed font weight for the Felder quote */}
      <p className="mt-6 text-xl md:text-2xl text-gray-900 font-medium leading-relaxed italic">
        {description}
      </p>
    </header>
  );
}
