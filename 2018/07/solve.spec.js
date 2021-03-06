const { solve } = require("./solve");

describe("Part 1", () => {
  it("solves for CABDFE", () =>
    expect(
      solve(
        [
          "Step C must be finished before step A can begin.",
          "Step C must be finished before step F can begin.",
          "Step A must be finished before step B can begin.",
          "Step A must be finished before step D can begin.",
          "Step B must be finished before step E can begin.",
          "Step D must be finished before step E can begin.",
          "Step F must be finished before step E can begin."
        ],
        1
      )
    ).toBe("CABDFE"));
  it("solves for CABDFE with aditional dependencies", () =>
    expect(
      solve(
        [
          "Step C must be finished before step A can begin.",
          "Step C must be finished before step F can begin.",
          "Step A must be finished before step B can begin.",
          "Step A must be finished before step D can begin.",
          "Step B must be finished before step E can begin.",
          "Step D must be finished before step E can begin.",
          "Step D must be finished before step F can begin.",
          "Step F must be finished before step E can begin."
        ],
        1
      )
    ).toBe("CABDFE"));
  it("solves for CABDFE with multiple roots dependencies", () =>
    expect(
      solve(
        [
          "Step C must be finished before step A can begin.",
          "Step C must be finished before step F can begin.",
          "Step X must be finished before step A can begin.",
          "Step A must be finished before step B can begin.",
          "Step A must be finished before step D can begin.",
          "Step B must be finished before step E can begin.",
          "Step D must be finished before step E can begin.",
          "Step D must be finished before step F can begin.",
          "Step F must be finished before step E can begin."
        ],
        1
      )
    ).toBe("CXABDFE"));
});
