import { toFraction, tbspToFraction } from "./helperFunctions";
import { describe, it, expect } from "vitest";

describe("toFraction", () => {
  // Whole numbers
  it("returns whole number when remainder is negligible", () => {
    expect(toFraction(2.02)).toBe("2");
  });
  it("returns '0' for zero", () => {
    expect(toFraction(0)).toBe("0");
  });

  // The carry-over bug
  it("carries over to whole when remainder rounds to 1", () => {
    expect(toFraction(2.97)).toBe("3"); // was returning "2 1"
  });
  it("returns whole number string when decimal is exactly 3", () => {
    expect(toFraction(3)).toBe("3");
  });

  // Standard fractions
  it("handles 0.5", () => expect(toFraction(0.5)).toBe("½"));
  it("handles 0.25", () => expect(toFraction(0.25)).toBe("¼"));
  it("handles 0.75", () => expect(toFraction(0.75)).toBe("¾"));
  it("handles 2.75", () => expect(toFraction(2.75)).toBe("2 ¾"));
  it("handles 1.333 — no ⅓ cup, shows compound", () => {
    expect(toFraction(1.333)).toBe("1 ¼ + ⅛");
  });
  // Second fraction (compound) cases
  it("handles compound fraction like 1.375 - no 3/8 cup exists so shows compound", () => {
    expect(toFraction(1.375)).toBe("1 ¼ + ⅛");
  });
});

describe("tbspToFraction", () => {
  it("returns whole tbsp when remainder is small", () => {
    expect(tbspToFraction(2.1)).toBe("2");
  });
  it("returns half tbsp", () => {
    expect(tbspToFraction(1.5)).toBe("1 ½");
  });
  it("rounds up when remainder >= 0.65", () => {
    expect(tbspToFraction(1.8)).toBe("2");
  });
  it("handles 0 tbsp", () => {
    expect(tbspToFraction(0)).toBe("0");
  });
});
