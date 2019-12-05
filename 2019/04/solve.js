function solve(input, part) {
  if (part === 1) return part1(input);
  else return part2(input);
}

function part1(input) {
  const [lower, upper] = input[0].split("-").map(n => parseInt(n));
  let current = ("" + lower).split("").map(n => parseInt(n));

  let count = 0;
  while (parseInt(current.join("")) < upper) {
    current = increase(current);
    if (
      current.reduce(
        (acc, val, index) =>
          acc ||
          (index < current.length - 1 && current[index] === current[index + 1]),
        false
      )
    ) {
      count++;
    }
  }
  return count - 1;
}

function increase(number) {
  let changed = false;
  for (let i = 1; i < number.length; i++) {
    let t = number[i];
    number[i] = number[i - 1] > number[i] ? number[i - 1] : number[i];
    changed = changed || number[i] !== t;
  }
  if (!changed) {
    for (let i = number.length - 1; i >= 0; i--) {
      if (number[i] < 9) {
        number[i]++;
        for (let x = i; x < number.length; x++) number[x] = number[i];
        break;
      }
    }
  }
  return number;
}

function part2(input) {
  const [lower, upper] = input[0].split("-").map(n => parseInt(n));
  let current = ("" + lower).split("").map(n => parseInt(n));

  let count = 0;
  while (parseInt(current.join("")) < upper) {
    current = increase(current);
    let occ = current.map(v => current.filter(o => o == v).length)
    if (occ.filter(val => val === 2).length > 0 && parseInt(current.join("")) < upper) {
      count++;
    }
  }
  return count;
}

module.exports = { solve };
