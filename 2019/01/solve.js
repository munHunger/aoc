function solve(input, part) {
  if (part === 1) return part1(input);
  else return part2(input);
}

function part1(input) {
  return input
    .map(row => Math.floor(parseInt(row) / 3) - 2)
    .reduce((acc, val) => (acc += val), 0);
}

function part2(input) {
  return input
    .map(row => fuelOfMass(parseInt(row)))
    .reduce((acc, val) => (acc += val), 0);
  }

function fuelOfMass(mass) {
  console.log(mass)
  if(mass <= 0)
    return 0;
  let fuel = Math.floor(mass / 3) - 2;
  if(fuel <= 0)
    return 0;
  return fuel + fuelOfMass(fuel)
}
module.exports = { solve };
