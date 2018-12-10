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

function shorten(input, regex) {
  let next = input;
  do {
    input = next;
    next = input.replace(regex, "");
  } while (next.length < input.length);
  return input;
}

function part1(input) {
  input = input[0];
  let regex = generateRegex();
  return shorten(input, regex).length;
}

function part2(input) {
  input = input[0];
  let regex = generateRegex();
  return "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(c => c + "|" + c.toUpperCase())
    .map(s => new RegExp(s))
    .map(regex => shorten(input, regex))
    .map(red => shorten(red, regex))
    .sort((a, b) => a.length - b.length)[0].length;
}

module.exports = { solve };
