import { PortableText } from "@portabletext/react";
import type { FC } from "react";
import type { BlockContent } from "@/sanity/sanity-types";

interface ElectronicsSectionProps {
  description: BlockContent | null;
}

export const ElectronicsSection: FC<ElectronicsSectionProps> = ({
  description,
}) => {
  return (
    <section className="bg-gray-900 text-white rounded-xl p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-black tracking-tight">
          Electronics Required
        </h2>
      </div>
      {description ? (
        <div className="prose prose-invert prose-lg max-w-none">
          <PortableText value={description} />
        </div>
      ) : (
        <p className="text-gray-400">
          This work includes electronic components. Contact for more
          information.
        </p>
      )}
    </section>
  );
};
