function solve(input, part) {
  if (part === 1) return part1(input);
  else return part2(input);
}

function part1(input) {
  // input = ["3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0"];
  input = input[0].split(",").map(n => parseInt(n));
  let max = -1;
  for (let aPhase = 0; aPhase < 5; aPhase++) {
    for (let bPhase = 0; bPhase < 5; bPhase++) {
      for (let cPhase = 0; cPhase < 5; cPhase++) {
        for (let dPhase = 0; dPhase < 5; dPhase++) {
          for (let ePhase = 0; ePhase < 5; ePhase++) {
            if (new Set([aPhase, bPhase, cPhase, dPhase, ePhase]).size !== 5)
              continue;
            let a = computer(input, [aPhase, 0]);
            let b = computer(input, [bPhase, a[0]]);
            let c = computer(input, [cPhase, b[0]]);
            let d = computer(input, [dPhase, c[0]]);
            let e = computer(input, [ePhase, d[0]]);
            max = Math.max(max, e[0]);
          }
        }
      }
    }
  }
  return max;
}

function part2(input) {
  input = input[0].split(",").map(n => parseInt(n));
  let permutations = [];
  for (let aPhase = 5; aPhase <= 9; aPhase++) {
    for (let bPhase = 5; bPhase <= 9; bPhase++) {
      for (let cPhase = 5; cPhase <= 9; cPhase++) {
        for (let dPhase = 5; dPhase <= 9; dPhase++) {
          for (let ePhase = 5; ePhase <= 9; ePhase++) {
            if (new Set([aPhase, bPhase, cPhase, dPhase, ePhase]).size !== 5)
              continue;
            permutations.push([aPhase, bPhase, cPhase, dPhase, ePhase]);
          }
        }
      }
    }
  }

  return permutations.map(phases => {
    let amps = phases.map(phase => ({
      halted: false,
      memory: input.slice(),
      inputPointer: 0,
      pc: 0,
      output: [],
      input: [phase]
    }));
    amps[0].input.push(0);
    while (amps.filter(amp => !amp.halted).length > 0) {
      amps.forEach((amp, index) => {
        ampComputer(amp);
        amps[(index + 1) % amps.length].input.push(amp.output.slice(-1)[0]);
      });
    }
    return amps[4].output.slice(-1)[0];
  }).sort((a, b) => b - a)[0];
}

function ampComputer(amp) {
  while (amp.memory[amp.pc] != 99) {
    let [op, a, b, c] = amp.memory.slice(amp.pc, amp.pc + 4);
    a = {
      ref: Math.floor((op % 1000) / 100) === 0 ? amp.memory[a] : a,
      raw: a
    };
    b = {
      ref: Math.floor((op % 10000) / 1000) === 0 ? amp.memory[b] : b,
      raw: b
    };
    c = {
      ref: Math.floor((op % 100000) / 10000) === 0 ? amp.memory[c] : c,
      raw: c
    };
    let frame = { op, a, b, c, index: amp.pc };
    let r;
    switch (op % 10) {
      case 1: //Addition
        r = { val: a.ref + b.ref, consumed: 4, out: c.raw };
        break;
      case 2: //Multiplication
        r = { val: a.ref * b.ref, consumed: 4, out: c.raw };
        break;
      case 3: //Input
        if (amp.inputPointer >= amp.input.length) {
          return amp;
        }
        r = { val: amp.input[amp.inputPointer], consumed: 2, out: a.raw };
        amp.inputPointer++;
        break;
      case 4: //Output
        amp.output.push(a.ref);
        r = { consumed: 2 };
        break;
      case 5:
        if (a.ref !== 0) {
          amp.pc = b.ref;
          r = { consumed: 0 };
        } else r = { consumed: 3 };
        break;
      case 6:
        if (a.ref === 0) {
          amp.pc = b.ref;
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
      amp.memory[r.out] = r.val;
      frame.val = r.val;
      frame.out = r.out;
    }
    amp.pc += r.consumed;
  }
  amp.halted = true;
  return amp;
}

function computer(com, input) {
  com = com.slice();
  let output = [];
  let index = 0;
  let stack = [];
  let inputPointer = 0;
  while (com[index] != 99) {
    let [op, a, b, c] = com.slice(index, index + 4);
    a = { ref: Math.floor((op % 1000) / 100) === 0 ? com[a] : a, raw: a };
    b = { ref: Math.floor((op % 10000) / 1000) === 0 ? com[b] : b, raw: b };
    c = { ref: Math.floor((op % 100000) / 10000) === 0 ? com[c] : c, raw: c };
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
        r = { val: input[inputPointer], consumed: 2, out: a.raw };
        inputPointer++;
        break;
      case 4: //Output
        output.push(a.ref);
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
      com[r.out] = r.val;
      frame.val = r.val;
      frame.out = r.out;
    }
    index += r.consumed;
  }
  return output;
}

module.exports = { solve };
