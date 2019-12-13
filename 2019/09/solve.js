function solve(input, part) {
  if (part === 1) return part1(input);
  else return part2(input);
}

function part1(input) {
  input = input[0].split(",").map(n => parseInt(n));
  return intComputer({
      halted: false,
      memory: input,
      inputPointer: 0,
      input: [1],
      pc: 0,
      output: [],
      relativeBase: 0
    }).output[0];
}

function part2(input) {
  input = input[0].split(",").map(n => parseInt(n));
  return intComputer({
      halted: false,
      memory: input,
      inputPointer: 0,
      input: [2],
      pc: 0,
      output: [],
      relativeBase: 0
    }).output[0];
}

/**
 *
 * @param {Object} state The state of the computer
 * @param {boolean} state.halted true iff the program encountered opcode 99 and is terminated
 * @param {number[]} state.memory the memory of the program. this is also the program code
 * @param {number} state.inputPointer the point of where to look for new input when op 3 in found
 * @param {number[]} state.input a list of input numbers to read from when op 3 is found
 * @param {number} state.pc the current program counter
 * @param {number[]} state.output a list that is written to during output op 4
 * @param {number} state.relativeBase a number used as a base to determine the relative position of an argument
 */
function intComputer(state) {
  while (state.memory[state.pc] != 99) {
    let [op, a, b, c] = state.memory.slice(state.pc, state.pc + 4);
    // i starts at 0
    const genParam = (param, i) => {
      let res = {
        mode: Math.floor((op % Math.pow(10, i + 3)) / Math.pow(10, i + 2)),
        ref: state.memory[param],
        rel: state.relativeBase + param,
        raw: param
      };
      res.read = () => {
        switch (res.mode) {
          case 0:
            return res.ref || 0;
          case 1:
            return res.raw;
          case 2:
            return state.memory[res.rel] || 0;
        }
      };
      res.write = val => {
        switch (res.mode) {
          case 0: //position
          case 1: //immediate
            state.memory[res.raw] = val;
            break;
          case 2: //relative
            state.memory[res.rel] = val;
            break;
        }
      };
      return res;
    };
    a = genParam(a, 0);
    b = genParam(b, 1);
    c = genParam(c, 2);

    const incrementPC = steps => (state.pc += steps);
    const setPC = val => (state.pc = val);

    switch (op % 10) {
      case 1: //Addition
        c.write(a.read() + b.read());
        incrementPC(4);
        break;
      case 2: //Multiplication
        c.write(a.read() * b.read());
        incrementPC(4);
        break;
      case 3: //Input
        if (state.inputPointer >= state.input.length) {
          return state;
        }
        a.write(state.input[state.inputPointer]);
        incrementPC(2);
        state.inputPointer++;
        break;
      case 4: //Output
        state.output.push(a.read());
        incrementPC(2);
        break;
      case 5: //Jump if true
        if (a.read() !== 0) {
          setPC(b.read());
        } else incrementPC(3);
        break;
      case 6: //Jump if false
        if (a.read() === 0) {
          setPC(b.read());
        } else incrementPC(3);
        break;
      case 7: // less than
        c.write(a.read() < b.read() ? 1 : 0);
        incrementPC(4);
        break;
      case 8: // eq
        c.write(a.read() === b.read() ? 1 : 0);
        incrementPC(4);
        break;
      case 9: //adjust relative base
        state.relativeBase += a.read();
        incrementPC(2);
        break;
    }
  }
  state.halted = true;
  return state;
}

module.exports = { solve };
