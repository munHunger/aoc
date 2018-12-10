function solve(input, part) {
  if (part === 1) return part1(input);
  else return part2(input);
}

function generateRegex() {
  return new RegExp(
    "abcdefghijklmnopqrstuvwxyz"
      .split("")
      .map(c => c + c.toUpperCase() + "|" + c.toUpperCase() + c)
      .join("|")
  );
}

function part1(input) {
  input = input[0];
  let regex = generateRegex();
  let next = input;
  do {
    input = next;
    next = input.replace(regex, "");
  } while (next.length < input.length);
  return input.length;
}

function part2(input) {}

module.exports = { solve };
