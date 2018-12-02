function solve(input, part) {
  if (part === 1) return part1(input);
  else return part2(input);
}

function part1(input) {
  let alpha = "abcdefghijklmnopqrstuvwxyz".split("");
  return input
    .map(row => {
      let set = new Set(
        alpha
          .map(
            char => row.length - row.replace(new RegExp(char, "g"), "").length
          )
          .filter(rep => rep == 2 || rep == 3)
      );
      return [set.has(2) ? 1 : 0, set.has(3) ? 1 : 0];
    })
    .reduce((acc, val) => [acc[0] + val[0], acc[1] + val[1]])
    .reduce((acc, val) => (acc *= val));
}

function part2(input) {
  let set = new Set();
  return input
    .map(row => {
      let mutations = new Set();
      for (let i = 0; i < row.length; i++)
        mutations.add(row.slice(0, i) + row.slice(i + 1, row.length));
      return Array.from(mutations).filter(
        replaced => set.size === set.add(replaced).size
      );
    })
    .filter(list => list.length > 0)[0][0];
}

module.exports = { solve };
