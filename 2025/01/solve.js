function solve(input, part) {
  if (part === 1) return part1(input);
}

function part1(input) {
    let start = 50;
    let count = 0;
    for (let row of input) {
        let value = parseInt(row.substring(1));
        if(row.startsWith("L")) {
            start -= value;
        }
        else {
            start += value;
        }
        if(start < 0) {
            start += 100;
        }
        start = start % 100;
        if(start == 0) {
            count++;
        }
    }

    return count
}

module.exports = { solve };
