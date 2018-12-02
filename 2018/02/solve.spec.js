const { solve } = require("./solve");

describe("Part 1", () => {
  describe("With one input", () => {
    describe("That is not repeating characters", () => {
      it("solves for 0", () => expect(solve(["poqwe"], 1)).toBe(0));
    });
    describe("That is repeating twice", () => {
      it("solves for 1 when 1 character is repeated", () =>
        expect(solve(["adedw"], 1)).toBe(1));
      it("solves for 1 when 2 characters are repeated", () =>
        expect(solve(["adedwa"], 1)).toBe(1));
    });
    describe("That is repeated three times", () => {
      it("solves for 1 when 1 character is repeated", () =>
        expect(solve(["adeddw"], 1)).toBe(1));
      it("solves for 1 when 2 characters are repeated", () =>
        expect(solve(["adeddwaa"], 1)).toBe(1));
    });
    describe("That is repeated 2 and 3 times", () => {
      it("solves for 2 when 3 is first", () =>
        expect(solve(["adeddwa"], 1)).toBe(2));
      it("solves for 2 when 2 is first", () =>
        expect(solve(["adedwaa"], 1)).toBe(2));
    });
  });

  describe("With two inputs", () => {
    describe("Containing no repetition", () => {
      it("solves for 0", () => expect(solve(["abc", "cde"], 1)).toBe(0));
    });
    describe("with repetition", () => {
      it("is summed", () => expect(solve(["aaebbqb", "rqwq"], 1)).toBe(3));
    });
  });
});
