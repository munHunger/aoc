const { solve } = require("./solve");

describe("Part 1", () => {
  it("solves for 17", () =>
    expect(solve(["1, 1", "1, 6", "8, 3", "3, 4", "5, 5", "8, 9"], 1)).toBe(
      17
    ));
});
