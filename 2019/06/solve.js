function solve(input, part) {
  if (part === 1) return part1(input);
  else return part2(input);
}

function part1(input) {
  input = input.sort((a, b) => (a.indexOf("COM") === 0 ? -1 : 1));
  let map = buildMap(input.map(a => a.split(")")));
  let direct = input.length;
  let indirect = indirectConnections(map, 0);
  return indirect;
}

function part2(input) {
  input = input.sort((a, b) => (a.indexOf("COM") === 0 ? -1 : 1));
  let map = buildMap(input.map(a => a.split(")")));
  const reduce = (map, search, acc) => {
    if (map.o === search) return acc.concat(search);
    if (map.orbits.length === 0) return undefined;
    let s = map.orbits
      .map(a => reduce(a, search, acc.concat(map.o)))
      .filter(a => a);
    return s.length > 0 ? s : undefined;
  };
  let you = flatDeep(reduce(map, "YOU", [])).reverse();
  let san = flatDeep(reduce(map, "SAN", [])).reverse();
  let common = you.slice().sort((a, b) => {
    a = san.indexOf(a);
    b = san.indexOf(b);
    if (a == -1) a = Infinity;
    if (b == -1) b = Infinity;
    return a - b;
  })[0];
  return you.indexOf(common) + san.indexOf(common) - 2
}

function flatDeep(arr, d = Infinity) {
  return d > 0
    ? arr.reduce(
        (acc, val) =>
          acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
        []
      )
    : arr.slice();
}

function buildMap(input, acc) {
  let remaining = input.filter(val => {
    if (!acc) {
      acc = { o: val[0], orbits: [{ o: val[1], orbits: [] }] };
      return false;
    }

    const findNode = (root, parent) => {
      if (root.o === parent) return root;
      return root.orbits
        .map(orbit => findNode(orbit, parent))
        .filter(a => a)[0];
    };
    let node = findNode(acc, val[0]);
    if (node) {
      node.orbits.push({ o: val[1], orbits: [] });
      return false;
    }
    return true;
  });
  if (remaining.length > 0) return buildMap(remaining, acc);
  return acc;
}

function indirectConnections(map, depth) {
  return (
    map.orbits.length +
    map.orbits.reduce(
      (acc, val) => acc + indirectConnections(val, depth + 1),
      0
    ) +
    Math.max(0, depth - 1)
  );
}

function directConnections(map) {
  return (
    map.orbits.length +
    map.orbits.reduce((acc, val) => acc + directConnections(val), 0)
  );
}
module.exports = { solve };
