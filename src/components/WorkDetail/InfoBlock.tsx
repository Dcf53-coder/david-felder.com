"use client";

import { useState, useRef, useEffect, ReactNode, FC } from "react";
import { join } from "@/utils/join";

interface InfoBlockProps {
  label: string;
  value?: string;
  className?: string;
  note?: ReactNode;
}

export const InfoBlock: FC<InfoBlockProps> = ({ label, value, className, note }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [needsClamp, setNeedsClamp] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const lineHeight = parseFloat(
          getComputedStyle(contentRef.current).lineHeight
        );
        const maxHeight = lineHeight * 6;
        setNeedsClamp(contentRef.current.scrollHeight > maxHeight);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [value, note]);

  return (
    <>
      <div
        className={join(
          "bg-gray-50 rounded-lg p-5 flex-1",
          needsClamp && "cursor-pointer hover:bg-gray-100 transition-colors"
        )}
        onClick={needsClamp ? () => setIsModalOpen(true) : undefined}
      >
        <span className="block text-sm font-mono uppercase tracking-wider text-accent mb-2">
          {label}
        </span>
        <div ref={contentRef} className={needsClamp ? "line-clamp-6" : undefined}>
          {value && (
            <p className={join("text-lg font-light text-gray-800", className)}>{value}</p>
          )}
          {note && (
            <div className="text-lg text-gray-700">{note}</div>
          )}
        </div>
        {needsClamp && (
          <span className="text-sm font-mono uppercase tracking-wider text-gray-800 mt-2 block text-right">
            Read more
          </span>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-mono uppercase tracking-wider text-accent">
                {label}
              </span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {value && (
              <p className={join("text-lg font-light text-gray-800", className)}>{value}</p>
            )}
            {note && (
              <div className="text-lg text-gray-700">{note}</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
