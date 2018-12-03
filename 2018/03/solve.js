function solve(input, part) {
  if (part === 1) return part1(input);
  else return part2(input);
}

function part1(input) {
  let fabric = [];
  input
    .map(row => parseRow(row))
    .forEach(row => {
      for (let dX = row.x; dX < row.x + row.width; dX++) {
        if (!fabric[dX]) fabric[dX] = [];
        for (let dY = row.y; dY < row.y + row.height; dY++) {
          if (!fabric[dX][dY]) fabric[dX][dY] = 0;
          fabric[dX][dY]++;
        }
      }
    });
  return fabric
    .map(row => row.filter(cell => cell > 1))
    .filter(row => row.length > 0)
    .map(row => row.length)
    .reduce((acc, val) => (acc += val));
}

function printFabric(fabric) {
  fabric.forEach(row => {
    console.log(row.reduce((acc, val) => (acc += " " + val)));
  });
}

function parseRow(row) {
  let parts = row.split(" ");
  return {
    id: parseInt(parts[0].substring(1)),
    x: parseInt(parts[2].split(",")[0]),
    y: parseInt(
      parts[2].split(",")[1].substring(0, parts[2].split(",")[1].length - 1)
    ),
    width: parseInt(parts[3].split("x")[0]),
    height: parseInt(parts[3].split("x")[1])
  };
}

function part2(input) {
  let fabric = [];
  input
    .map(row => parseRow(row))
    .forEach(row => {
      for (let dX = row.x; dX < row.x + row.width; dX++) {
        if (!fabric[dX]) fabric[dX] = [];
        for (let dY = row.y; dY < row.y + row.height; dY++) {
          if (!fabric[dX][dY]) fabric[dX][dY] = [];
          fabric[dX][dY].push(row.id);
        }
      }
    });
  return input
    .map(row => parseRow(row))
    .filter(
      inputRow =>
        fabric
          .map(
            row =>
              row.filter(cell => cell.length == 1 && cell[0] == inputRow.id)
                .length
          )
          .filter(c => c > 0)
          .reduce((acc, val) => (acc += val), 0) ==
        inputRow.width * inputRow.height
    )[0].id;
}

module.exports = { solve };
