import type { FC } from "react";

interface DurationInstrumentationProps {
  duration: string | null;
  instrumentation: string | null;
  className?: string;
}

/**
 * Displays duration and instrumentation with a separator.
 * Renders nothing if both values are null.
 */
export const DurationInstrumentation: FC<DurationInstrumentationProps> = ({
  duration,
  instrumentation,
  className = "text-base md:text-lg text-gray-500 font-light",
}) => {
  if (!duration && !instrumentation) return null;

  return (
    <div className={className}>
      {duration && <span>{duration}&apos;</span>}
      {duration && instrumentation && (
        <span className="mx-2 text-gray-300">|</span>
      )}
      {instrumentation && <span>{instrumentation}</span>}
    </div>
  );
};
