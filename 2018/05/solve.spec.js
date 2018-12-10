const { solve } = require("./solve");

describe("Part 1", () => {
  it("solves for 10", () => expect(solve(["dabAcCaCBAcCcaDA"], 1)).toBe(10));
});
describe("Part 2", () => {
  it("solves for 4", () => expect(solve(["dabAcCaCBAcCcaDA"], 2)).toBe(4));
});
