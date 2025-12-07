"use client";

import { type FC, type ReactNode, useEffect, useRef, useState } from "react";
import { join } from "@/utils/join";

interface InfoBlockProps {
  label: string;
  value?: string;
  className?: string;
  note?: ReactNode;
}

export const InfoBlock: FC<InfoBlockProps> = ({
  label,
  value,
  className,
  note,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [needsClamp, setNeedsClamp] = useState<boolean | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const lineHeight = parseFloat(
          getComputedStyle(contentRef.current).lineHeight,
        );
        const maxHeight = lineHeight * 6;
        setNeedsClamp(contentRef.current.scrollHeight > maxHeight);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  const commonProps = {
    className: join(
      "bg-gray-50 rounded-lg p-5 flex-1",
      needsClamp === true &&
        "cursor-pointer hover:bg-gray-100 transition-colors",
    ),
  };

  return (
    <>
      {needsClamp === true ? (
        <button
          {...commonProps}
          type="button"
          onClick={() => setIsModalOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsModalOpen(true);
            }
          }}
        >
          <span className="block text-sm font-mono uppercase tracking-wider text-accent mb-2">
            {label}
          </span>
          <div ref={contentRef} className="line-clamp-6">
            {value && (
              <p
                className={join("text-lg font-light text-gray-800", className)}
              >
                {value}
              </p>
            )}
            {note && <div className="text-lg text-gray-700">{note}</div>}
          </div>
        </button>
      ) : (
        <div {...commonProps}>
          <span className="block text-sm font-mono uppercase tracking-wider text-accent mb-2">
            {label}
          </span>
          <div
            ref={contentRef}
            className={needsClamp !== false ? "line-clamp-6" : undefined}
          >
            {value && (
              <p
                className={join("text-lg font-light text-gray-800", className)}
              >
                {value}
              </p>
            )}
            {note && <div className="text-lg text-gray-700">{note}</div>}
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
          onClick={() => setIsModalOpen(false)}
          aria-hidden="true"
        >
          <div
            className="bg-white rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            aria-hidden="true"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-mono uppercase tracking-wider text-accent">
                {label}
              </span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                type="button"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {value && (
              <p
                className={join("text-lg font-light text-gray-800", className)}
              >
                {value}
              </p>
            )}
            {note && <div className="text-lg text-gray-700">{note}</div>}
          </div>
        </div>
      )}
    </>
  );
};
