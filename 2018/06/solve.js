function solve(input, part) {
  if (part === 1) return part1(input);
  else return part2(input);
}
function part1(input) {
  input = input.map(row => parseRow(row));
  let limits = input.reduce(
    (acc, val) => {
      return {
        min: {
          x: Math.min(acc.min.x, val.x),
          y: Math.min(acc.min.y, val.y)
        },
        max: {
          x: Math.max(acc.max.x, val.x),
          y: Math.max(acc.max.y, val.y)
        }
      };
    },
    {
      min: { x: Number.MAX_VALUE, y: Number.MAX_VALUE },
      max: { x: Number.MIN_VALUE, y: Number.MIN_VALUE }
    }
  );
  let board = [];
  for (let x = limits.min.x - 1; x < limits.max.x + 1; x++) {
    board[x] = [];
    for (let y = limits.min.y - 1; y < limits.max.y + 1; y++) {
      let dists = input
        .map((row, index) => {
          return {
            index: index,
            dist: Math.abs(x - row.x) + Math.abs(y - row.y)
          };
        })
        .sort((a, b) => a.dist - b.dist);
      if (dists[0].dist != dists[1].dist) board[x][y] = dists[0].index;
      else board[x][y] = -1;
    }
  }
  let blackList = new Set();
  for (let x = limits.min.x - 1; x < limits.max.x + 1; x++) {
    for (let y = limits.min.y - 1; y < limits.max.y + 1; y++) {
      if (
        x == limits.min.x - 1 ||
        x == limits.max.x ||
        y == limits.min.y - 1 ||
        y == limits.max.y
      )
        blackList.add(board[x][y]);
    }
  }
  blackList.add(-1);
  return board
    .map(row =>
      row
        .map(col => {
          return { id: col, count: 1 };
        })
        .filter(cell => !blackList.has(cell.id))
    )
    .reduce((acc, val) => {
      val.forEach(cell => acc.push(cell));
      return acc;
    }, [])
    .sort((a, b) => a.id - b.id)
    .reduce((acc, val) => {
      if (acc.length == 0 || acc[acc.length - 1].id !== val.id) acc.push(val);
      else acc[acc.length - 1].count += val.count;
      return acc;
    }, [])
    .sort((a, b) => b.count - a.count)[0].count;
}

function part2(input) {}

function parseRow(row) {
  return { x: parseInt(row.split(",")[0]), y: parseInt(row.split(",")[1]) };
}
module.exports = { solve };
