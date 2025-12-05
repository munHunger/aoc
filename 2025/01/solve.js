function solve(input, part) {
  if (part === 1) return part1(input);
  return part2(input);
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


function part2(input) {
    let pos = 50;
    let count = 0;
    for (let row of input) {
        let value = parseInt(row.substring(1));

        let distanceToZero = pos === 0 ? 100 : (row.startsWith("L") ? pos : 100 - pos)
        if(value >= distanceToZero) {
            let change = 1 + Math.floor((value - distanceToZero) / 100);
            count += change
        }

        if(row.startsWith("L")) {
            pos -= value;
        }
        else {
            pos += value;
        }
        pos = ((pos % 100) + 100) % 100;
        
    }

    return count
}

module.exports = { solve };
