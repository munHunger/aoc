function solve(input, part) {
  if (part === 1) return part1(input);
  else return part2(input);
}

function part1(input) {
  let result = 0;
  input.forEach(row => {
    if (row.startsWith("+")) result += parseInt(row.substring(1));
    else result -= parseInt(row.substring(1));
  });
  return result;
}

function part2(input) {
  let set = [];
  let twice = undefined;
  let result = 0;
  let index = 0;
  while (twice == undefined) {
    let row = input[index];
    if (row.startsWith("+")) result += parseInt(row.substring(1));
    else result -= parseInt(row.substring(1));
    if (set.indexOf(result) > 0) twice = result;
    set.push(result);
    index = (index + 1) % input.length;
  }
  return twice;
}

module.exports = { solve };
