const { solve } = require("./solve");

describe("Part 1", () => {
  describe("With early single overlap", () =>
    it("solves for 1", () =>
      expect(solve(["#1 @ 0,0: 1x2", "#2 @ 0,0: 2x1"], 1)).toBe(1)));
  describe("With late single overlap", () =>
    it("solves for 1", () =>
      expect(solve(["#1 @ 3,3: 1x2", "#2 @ 3,3: 2x1"], 1)).toBe(1)));
  describe("With 4 overlaps", () =>
    it("solves for 4", () =>
      expect(solve(["#1 @ 1,3: 4x4", "#2 @ 3,1: 4x4"], 1)).toBe(4)));
  describe("With multi layer overlap", () =>
    it("solves for 4", () =>
      expect(
        solve(["#1 @ 1,3: 4x4", "#2 @ 3,1: 4x4", "#3 @ 3,3: 2x2"], 1)
      ).toBe(4)));
  describe("With one lacking overlap", () =>
    it("solves for 4", () =>
      expect(
        solve(["#1 @ 1,3: 4x4", "#2 @ 3,1: 4x4", "#3 @ 5,5: 2x2"], 1)
      ).toBe(4)));
});
