function solve(input, part) {
  if (part === 1) return part1(input);
  else return part2(input);
}

function part1(input) {
  const [lower, upper] = input[0].split("-").map(n => parseInt(n));
  let current = ("" + lower).split("").map(n => parseInt(n));
  console.log(
    lower +
      ":" +
      increase(current.slice(0)) +
      ":" +
      increase(increase(current.slice(0)))
  );
}

function increase(number) {
  let changed = false;
  for (let i = 1; i < number.length; i++) {
    let t = number[i];
    number[i] = number[i - 1] > number[i] ? number[i - 1] : number[i];
    changed = changed || number[i] !== t;
  }
  console.log(number);
  if (!changed) {
    for (let i = number.length - 1; i >= 0; i--) {
      if (number[i] < 9) {
        number[i]++;
      }
    }
    console.log(number);
    //return increase(number);
  }
  return number;
}

function part2(input) {}

module.exports = { solve };
