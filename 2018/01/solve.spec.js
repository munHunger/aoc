const { solve } = require("./solve");

describe("Part 1", () => {
  describe("With empty input", () => {
    it("returns 0", () => expect(solve([], 1)).toBe(0));
  });

  describe("With one input", () => {
    describe("That is positive", () => {
      it("is returned as is", () => expect(solve(["+3"], 1)).toBe(3));
    });
    describe("That is negative", () => {
      it("is returned as is", () => expect(solve(["-78"], 1)).toBe(-78));
    });
  });

  describe("With two inputs", () => {
    describe("That are both positive", () => {
      it("is summed", () => expect(solve(["+1", "+4"], 1)).toBe(5));
    });
    describe("That are both negative", () => {
      it("is subtracted", () => expect(solve(["-1", "-11"], 1)).toBe(-12));
    });
    describe("That are mixed positive and negative", () => {
      it("doesn't matter what order", () =>
        expect(solve(["-1", "+3"], 1)).toBe(solve(["+3", "-1"], 1)));
    });
  });
});

describe("Part 2", () => {
  describe("Instant repetition", () => {
    it("returns the rep", () => expect(solve(["+1", "-1"], 2)).toBe(0));
  });
  describe("With multiple iterations", () => {
    it("solves +3 +3 +4 -2 -4", () =>
      expect(solve(["+3", "+3", "+4", "-2", "-4"], 2)).toBe(10));
    it("solves -6 +3 +8 +5 -6", () =>
      expect(solve(["-6", "+3", "+8", "+5", "-6"], 2)).toBe(5));
    it("solves +7 +7 -2 -7 -4", () =>
      expect(solve(["+7", "+7", "-2", "-7", "-4"], 2)).toBe(14));
  });
});
