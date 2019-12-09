function solve(input, part) {
  if (part === 1) return part1(input);
  else return part2(input);
}

function part1(input) {
  input = input[0].split(",").map(n => parseInt(n));
  return computer(input);
}

function part2(input) {}

function computer(input) {
  let index = 0;
  let stack = [];
  while (input[index] != 99) {
    let [op, a, b, c] = input.slice(index, index + 4);
    a = { ref: Math.floor(op / 100) === 0 ? input[a] : a, raw: a };
    b = { ref: Math.floor(op / 1000) === 0 ? input[b] : b, raw: b };
    c = { ref: Math.floor(op / 10000) === 0 ? input[c] : c, raw: c };
    let frame = { op, a, b, c, index };
    stack.push(frame);
    let r;
    switch (op % 10) {
      case 1: //Addition
        r = { val: a.ref + b.ref, consumed: 4, out: c.raw };
        break;
      case 2: //Multiplication
        r = { val: a.ref * b.ref, consumed: 4, out: c.raw };
        break;
      case 3: //Input
        r = { val: 1, consumed: 2, out: a.raw };
        break;
      case 4: //Output
        if (a.ref !== 0) console.log("shit");
        console.log(a.ref);
        r = { consumed: 2 };
        break;
    }
    if (op % 10 != 4) {
      input[r.out] = r.val;
      frame.val = r.val;
      frame.out = r.out;
    }
    index += r.consumed;
  }
  return input[0];
}

module.exports = { solve };
