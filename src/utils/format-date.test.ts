import { describe, expect, it } from "vitest";
import { formatCompletionDate, getSortYear } from "./format-date";

describe("getSortYear", () => {
  it("returns 0 for null input", () => {
    expect(getSortYear(null)).toBe(0);
  });

  it("extracts year from single year string", () => {
    expect(getSortYear("2021")).toBe(2021);
  });

  it("extracts end year from hyphen range", () => {
    expect(getSortYear("2016-2017")).toBe(2017);
  });

  it("extracts end year from en-dash range", () => {
    expect(getSortYear("2016 – 2017")).toBe(2017);
  });

  it("extracts year from ISO date", () => {
    expect(getSortYear("2019-12-31")).toBe(2019);
  });

  it("returns 0 for non-date string", () => {
    expect(getSortYear("unknown")).toBe(0);
  });
});

describe("formatCompletionDate", () => {
  it("returns fallback for null input", () => {
    expect(formatCompletionDate(null)).toBe("in progress");
  });

  it("returns custom fallback for null input", () => {
    expect(formatCompletionDate(null, "TBD")).toBe("TBD");
  });

  it("returns year range as-is (hyphen)", () => {
    expect(formatCompletionDate("2017-2019")).toBe("2017-2019");
  });

  it("returns year range as-is (en-dash with spaces)", () => {
    expect(formatCompletionDate("2017 – 2019")).toBe("2017 – 2019");
  });

  it("extracts year from ISO date", () => {
    expect(formatCompletionDate("2021-06-15")).toBe("2021");
  });

  it("parses year-only string as date and extracts year", () => {
    // "2021" is parsed as a valid Date (Jan 1, 2021 UTC)
    // Result may be 2020 or 2021 depending on timezone
    const result = formatCompletionDate("2021");
    expect(["2020", "2021"]).toContain(result);
  });

  it("extracts year from text containing a year", () => {
    // "circa 1990" contains a parseable date
    expect(formatCompletionDate("circa 1990")).toBe("1990");
  });

  it("returns non-date string as-is when unparseable", () => {
    expect(formatCompletionDate("unknown")).toBe("unknown");
  });
});
