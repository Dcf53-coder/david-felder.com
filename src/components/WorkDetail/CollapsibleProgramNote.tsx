"use client";

import { useState, useRef, useEffect, FC } from "react";
import { RichText } from "@/components/RichText";
import { join } from "@/utils/join";
import { WorkDetailData } from "./types";

interface CollapsibleProgramNoteProps {
  programNote: WorkDetailData["programNote"];
}

export const CollapsibleProgramNote: FC<CollapsibleProgramNoteProps> = ({
  programNote,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsClamp, setNeedsClamp] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const lineHeight = parseFloat(
          getComputedStyle(contentRef.current).lineHeight
        );
        const maxHeight = lineHeight * 5;
        setNeedsClamp(contentRef.current.scrollHeight > maxHeight);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [programNote]);

  if (!programNote) {
    return null;
  }

  return (
    <div>
      <RichText
        value={programNote}
        ref={contentRef}
        className={join(
          "prose-lg prose-gray max-w-none",
          !isExpanded && needsClamp ? "line-clamp-5" : undefined
        )}
      />
      {needsClamp && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-sm font-mono uppercase tracking-wider text-accent hover:text-accent/80 transition-colors"
        >
          {isExpanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
};
