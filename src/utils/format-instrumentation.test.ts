import { describe, expect, it } from "vitest";
import { formatInstrumentation } from "./format-instrumentation";

describe("formatInstrumentation", () => {
  it("returns null for empty instrumentation", () => {
    expect(formatInstrumentation({ instrumentation: [] })).toBeNull();
  });

  it("returns null for undefined instrumentation", () => {
    expect(formatInstrumentation({})).toBeNull();
  });

  it("returns abbreviated instrumentation when flag is set", () => {
    const work = {
      useAbbreviatedInstrumentation: true,
      abbreviatedInstrumentation: "2.2.2.2 - 4.3.3.1 - timp - str",
      instrumentation: [{ _key: "1", instrument: { name: "flute" } }],
    };
    expect(formatInstrumentation(work)).toBe("2.2.2.2 - 4.3.3.1 - timp - str");
  });

  it("ignores abbreviated flag if no abbreviated string provided", () => {
    const work = {
      useAbbreviatedInstrumentation: true,
      abbreviatedInstrumentation: null,
      instrumentation: [{ _key: "1", instrument: { name: "flute" } }],
    };
    expect(formatInstrumentation(work)).toBe("flute");
  });

  it("formats single instrument", () => {
    const work = {
      instrumentation: [{ _key: "1", instrument: { name: "piano" } }],
    };
    expect(formatInstrumentation(work)).toBe("piano");
  });

  it("formats multiple instruments", () => {
    const work = {
      instrumentation: [
        { _key: "1", instrument: { name: "violin" } },
        { _key: "2", instrument: { name: "cello" } },
      ],
    };
    expect(formatInstrumentation(work)).toBe("violin, cello");
  });

  it("formats instrument with quantity > 1", () => {
    const work = {
      instrumentation: [
        { _key: "1", quantity: 2, instrument: { name: "violin" } },
      ],
    };
    expect(formatInstrumentation(work)).toBe("2 violins");
  });

  it("handles null instrument name", () => {
    const work = {
      instrumentation: [
        { _key: "1", instrument: { name: null } },
        { _key: "2", instrument: { name: "piano" } },
      ],
    };
    expect(formatInstrumentation(work)).toBe("piano");
  });

  it("handles null instrument reference", () => {
    const work = {
      instrumentation: [
        { _key: "1", instrument: null },
        { _key: "2", instrument: { name: "piano" } },
      ],
    };
    expect(formatInstrumentation(work)).toBe("piano");
  });
});
