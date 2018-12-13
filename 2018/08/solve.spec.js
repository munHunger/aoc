const { solve } = require("./solve");

describe("Part 1", () => {
  it("solves for 138", () =>
    expect(solve(["2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2"], 1)).toBe(138));
});
