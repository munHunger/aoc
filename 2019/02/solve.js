function solve(input, part) {
  if (part === 1) return part1(input);
  else return part2(input);
}

function part1(input) {
    input = input[0].split(",").map(n => parseInt(n))
    input[1] = 12;
    input[2] = 2;
    return computer(input)
}

function part2(input) {
    input = input[0].split(",").map(n => parseInt(n))
    for(let n = 0; n < input.length; n++) {
        for(let v = 0; v < input.length; v++) {
            input[1] = n;
            input[2] = v;
            let c = computer(input.slice(0))
            if(c === 19690720)
                return 100 * n + v;
        }
    }
    return -1
}

function computer(input) {
    let index = 0;
    while(input[index] != 99) {
        const [op, a, b, result] = input.slice(index, index + 4);
        let r;
        switch(op) {
            case 1:
                r = input[a] + input[b];
                break;
            case 2:
                r = input[a] * input[b];
                break;
        }
        input[result] = r;
        index += 4
    }
    return input[0]
}

module.exports = { solve };
