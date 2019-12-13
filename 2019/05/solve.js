function solve(input, part) {
  if (part === 1) return part1(input);
  else return part2(input);
}

function part1(input) {
  input = input[0].split(",").map(n => parseInt(n));
  return computer(input, 1).slice(-1)[0];
}

function part2(input) {
  input = input[0].split(",").map(n => parseInt(n));
  return computer(input, 5)[0];
}

function computer(input, start) {
  let output = []
  let index = 0;
  let stack = [];
  while (input[index] != 99) {
    let [op, a, b, c] = input.slice(index, index + 4);
    a = { ref: Math.floor((op % 1000) / 100) === 0 ? input[a] : a, raw: a };
    b = { ref: Math.floor((op % 10000) / 1000) === 0 ? input[b] : b, raw: b };
    c = { ref: Math.floor((op % 100000) / 10000) === 0 ? input[c] : c, raw: c };
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
        r = { val: start, consumed: 2, out: a.raw };
        break;
      case 4: //Output
      output.push(a.ref)
        r = { consumed: 2 };
        break;
      case 5:
        if (a.ref !== 0) {
          index = b.ref;
          r = { consumed: 0 };
        } else r = { consumed: 3 };
        break;
      case 6:
        if (a.ref === 0) {
          index = b.ref;
          r = { consumed: 0 };
        } else r = { consumed: 3 };
        break;
      case 7:
        r = { consumed: 4, out: c.raw, val: a.ref < b.ref ? 1 : 0 };
        break;
      case 8:
        r = { consumed: 4, out: c.raw, val: a.ref === b.ref ? 1 : 0 };
        break;
    }
    if (op % 10 != 4) {
      input[r.out] = r.val;
      frame.val = r.val;
      frame.out = r.out;
    }
    index += r.consumed;
  }
  return output;
}

module.exports = { solve };
