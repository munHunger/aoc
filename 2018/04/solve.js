function solve(input, part) {
  if (part === 1) return part1(input);
  else return part2(input);
}

function part1(input) {
  let shifts = [];
  let active;
  input = input.sort((a, b) =>
    a.substring(0, 18) < b.substring(0, 18) ? -1 : 1
  );
  input.forEach(row => {
    let id = getID(row);
    if (id) active = id;
    else {
      if (!shifts[active]) shifts[active] = { id: active, shifts: [] };
      shifts[active].shifts.push(row);
    }
  });
  shifts.forEach(
    guard =>
      (guard.shifts = guard.shifts
        .reduce((acc, val, index) => {
          if (index % 2 == 0) acc.push([]);
          acc[acc.length - 1].push(val);
          return acc;
        }, [])
        .map(cycle => {
          let minutes = [];
          for (let i = getMinute(cycle[0]); i < getMinute(cycle[1]); i++)
            minutes[i] = 1;
          return minutes;
        })
        .reduce((acc, val) => {
          for (let i = 0; i < 60; i++) {
            let newVal = 0;
            if (val[i]) newVal += val[i];
            if (acc[i]) newVal += acc[i];
            acc[i] = newVal;
          }
          return acc;
        }, []))
  );
  let id = shifts
    .map(guard => {
      return {
        id: guard.id,
        sum: guard.shifts.reduce((acc, val) => acc + val, 0)
      };
    })
    .sort((a, b) => b.sum - a.sum)[0].id;
  let guard = shifts.filter(guard => guard.id == id)[0];
  let max = 0;
  for (let i = 0; i < 60; i++) if (guard.shifts[i] > guard.shifts[max]) max = i;
  return max * id;
}

function getHour(row) {
  return row.substring(12, 14);
}

function getMinute(row) {
  return parseInt(row.substring(15, 17));
}

function getID(row) {
  let regex = /(?<=\s#)\d+(?=\s)/gm.exec(row);
  if (regex) return parseInt(regex[0]);
}

function part2(input) {}

module.exports = { solve };
