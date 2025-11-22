import { FC, ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
}

export const Section: FC<SectionProps> = ({ title, children }) => (
  <section>
    <h2 className="text-3xl font-black tracking-tight mb-6">{title}</h2>
    {children}
  </section>
);
