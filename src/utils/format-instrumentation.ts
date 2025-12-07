import { pluralize } from "./pluralize";

type InstrumentationItem = {
  _key: string;
  quantity?: number | null;
  instrument: { name: string | null } | null;
};

type WorkWithInstrumentation = {
  useAbbreviatedInstrumentation?: boolean | null;
  abbreviatedInstrumentation?: string | null;
  instrumentation?: InstrumentationItem[] | null;
};

/**
 * Format instrumentation list into a readable string.
 * Prefers abbreviated instrumentation if the work has it set.
 *
 * @param work - Work object with instrumentation data
 * @returns Formatted instrumentation string or null if none
 */
export function formatInstrumentation(
  work: WorkWithInstrumentation,
): string | null {
  // Prefer abbreviated instrumentation if set
  if (work.useAbbreviatedInstrumentation && work.abbreviatedInstrumentation) {
    return work.abbreviatedInstrumentation;
  }

  if (!work.instrumentation || work.instrumentation.length === 0) {
    return null;
  }

  const instruments = work.instrumentation
    .map((item) => {
      const name = item.instrument?.name;
      if (!name) return null;

      const quantity = item.quantity || 1;
      if (quantity > 1) {
        return `${quantity} ${pluralize(name, quantity)}`;
      }
      return name;
    })
    .filter(Boolean);

  return instruments.join(", ");
}
