import { describe, expect, it } from "vitest";
import { sortWorks } from "./sort-works";
import type { Work } from "./types";

// Factory for creating minimal work objects for testing
function createWork(overrides: Partial<Work> & { _id: string }): Work {
  return {
    _id: overrides._id,
    title: overrides.title ?? "Test Work",
    slug: overrides.slug ?? null,
    completionDate: overrides.completionDate ?? null,
    isCompleted: overrides.isCompleted ?? true,
    duration: overrides.duration ?? null,
    instrumentation: overrides.instrumentation ?? null,
    useAbbreviatedInstrumentation:
      overrides.useAbbreviatedInstrumentation ?? null,
    abbreviatedInstrumentation: overrides.abbreviatedInstrumentation ?? null,
    inlineNotes: overrides.inlineNotes ?? null,
    commissionInfo: overrides.commissionInfo ?? null,
    children: overrides.children ?? [],
  } as Work;
}

describe("sortWorks", () => {
  it("returns empty array for empty input", () => {
    expect(sortWorks([])).toEqual([]);
  });

  it("places in-progress works before completed works", () => {
    const works = [
      createWork({ _id: "1", title: "Completed", isCompleted: true }),
      createWork({ _id: "2", title: "In Progress", isCompleted: false }),
    ];

    const sorted = sortWorks(works);

    expect(sorted[0].title).toBe("In Progress");
    expect(sorted[1].title).toBe("Completed");
  });

  it("sorts completed works by year (most recent first)", () => {
    const works = [
      createWork({ _id: "1", title: "Old", completionDate: "2010" }),
      createWork({ _id: "2", title: "New", completionDate: "2023" }),
      createWork({ _id: "3", title: "Middle", completionDate: "2015" }),
    ];

    const sorted = sortWorks(works);

    expect(sorted.map((w) => w.title)).toEqual(["New", "Middle", "Old"]);
  });

  it("sorts in-progress works by year (most recent first)", () => {
    const works = [
      createWork({
        _id: "1",
        title: "Old WIP",
        completionDate: "2020",
        isCompleted: false,
      }),
      createWork({
        _id: "2",
        title: "New WIP",
        completionDate: "2024",
        isCompleted: false,
      }),
    ];

    const sorted = sortWorks(works);

    expect(sorted.map((w) => w.title)).toEqual(["New WIP", "Old WIP"]);
  });

  it("handles date ranges correctly (uses end year)", () => {
    const works = [
      createWork({ _id: "1", title: "Range", completionDate: "2015 – 2018" }),
      createWork({ _id: "2", title: "Single", completionDate: "2020" }),
    ];

    const sorted = sortWorks(works);

    expect(sorted[0].title).toBe("Single"); // 2020 > 2018
    expect(sorted[1].title).toBe("Range");
  });

  it("places works without dates after works with dates (within same group)", () => {
    const works = [
      createWork({ _id: "1", title: "No Date", completionDate: null }),
      createWork({ _id: "2", title: "Has Date", completionDate: "2020" }),
    ];

    const sorted = sortWorks(works);

    expect(sorted[0].title).toBe("Has Date");
    expect(sorted[1].title).toBe("No Date");
  });

  it("does not mutate the original array", () => {
    const works = [
      createWork({ _id: "1", completionDate: "2010" }),
      createWork({ _id: "2", completionDate: "2020" }),
    ];
    const originalFirst = works[0];

    sortWorks(works);

    expect(works[0]).toBe(originalFirst);
  });
});
