function solve(input, part) {
  if (part === 1) return part1(input);
  else return part2(input);
}

function part1(input) {
  let r = getPositions(input);
  let dup = r[0]
    .filter(pos => r[1].findIndex(o => o.x === pos.x && o.y === pos.y) >= 0)
    .filter(pos => !(pos.x === 0 && pos.y === 0))
    .map(pos => Math.abs(pos.x) + Math.abs(pos.y))
    .sort((a, b) => a - b);
  return dup[0];
}

function getPositions(input) {
  return input.map(row =>
    row
      .split(",")
      .map(command => {
        var op = command.substring(0, 1);
        const arg = parseInt(command.substring(1));
        switch (op) {
          case "R":
            op = [1, 0];
            break;
          case "D":
            op = [0, 1];
            break;
          case "L":
            op = [-1, 0];
            break;
          case "U":
            op = [0, -1];
            break;
        }
        let res = Array.from(
          new Set(
            Array.from(Array(arg).keys())
              .map(_ => op)
              .reduce(
                (acc, val) => {
                  acc.push({
                    x: acc[acc.length - 1].x + val[0],
                    y: acc[acc.length - 1].y + val[1]
                  });
                  return acc;
                },
                [{ x: 0, y: 0 }]
              )
              .slice(1)
          )
        );
        return res;
      })
      .reduce(
        (acc, val) =>
          acc.concat(
            val.map(pos => ({
              x: pos.x + (acc[acc.length - 1] || { x: 0 }).x,
              y: pos.y + (acc[acc.length - 1] || { y: 0 }).y
            }))
          ),
        []
      )
  );
}

function part2(input) {
  let r = getPositions(input);
  let dup = r[0]
    .filter(pos => r[1].findIndex(o => o.x === pos.x && o.y === pos.y) >= 0)
    .filter(pos => !(pos.x === 0 && pos.y === 0))
    .map(
      c =>
        r[0].findIndex(o => o.x === c.x && o.y === c.y) +
        r[1].findIndex(o => o.x === c.x && o.y === c.y)
    )
    .sort((a, b) => a - b);
  return dup[0] + 2; //+2 because of math or whatever?
}

module.exports = { solve };
