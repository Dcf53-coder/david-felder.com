import { FC } from "react";
import { RichText } from "@/components/RichText";
import { WorkDetailData } from "./types";

interface CollapsibleProgramNoteProps {
  programNote: WorkDetailData["programNote"];
}

export const CollapsibleProgramNote: FC<CollapsibleProgramNoteProps> = ({
  programNote,
}) => {
  if (!programNote) {
    return null;
  }

  return (
    <details className="group">
      <summary className="list-none cursor-pointer [&::-webkit-details-marker]:hidden">
        <RichText
          value={programNote}
          className="prose-lg prose-gray max-w-none line-clamp-5 group-open:line-clamp-none"
        />
        <span className="mt-4 block text-sm font-mono uppercase tracking-wider text-accent hover:text-accent/80 transition-colors group-open:hidden">
          Read more
        </span>
        <span className="mt-4 hidden text-sm font-mono uppercase tracking-wider text-accent hover:text-accent/80 transition-colors group-open:block">
          Show less
        </span>
      </summary>
    </details>
  );
};
