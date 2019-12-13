const chalk = require("chalk");

function solve(input, part) {
  if (part === 1) return part1(input);
  else return part2(input);
}

function part1(input) {
  let layers = generateLayers(input)
    .map(layer => ({
      layer,
      zero: countInLayer(layer, 0),
      one: countInLayer(layer, 1),
      two: countInLayer(layer, 2)
    }))
    .sort((a, b) => a.zero - b.zero);

  return layers[0].one * layers[0].two;
}

function countInLayer(layer, digit) {
  return layer.reduce(
    (acc, val) =>
      acc + val.reduce((acc, val) => acc + (val == digit ? 1 : 0), 0),
    0
  );
}

function part2(input) {
  let layers = generateLayers(input);
  for (let x = 0; x < 25; x++) {
    for (let y = 0; y < 6; y++) {
      let value = layers.reduce((acc, val) => (acc != 2 ? acc : val[y][x]), 2);
      if (value == 0) process.stdout.write(chalk.black("█"));
      if (value == 1) process.stdout.write(chalk.white("█"));
    }
    console.log();
  }
  return "JAFRA"
}

function generateLayers(input) {
  input = input[0].split("");
  let rows = Array.from(Array(Math.floor(input.length / 25)).keys()).map(n =>
    input.slice(n * 25, (n + 1) * 25)
  );
  return Array.from(Array(Math.floor(rows.length / 6)).keys()).map(n =>
    rows.slice(n * 6, (n + 1) * 6)
  );
}

module.exports = { solve };
