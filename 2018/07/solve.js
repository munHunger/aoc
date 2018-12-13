function solve(input, part) {
  if (part === 1) return part1(input);
  else return part2(input);
}
function part1(input) {
  let dependencies = input
    .map(row => {
      return {
        parent: row.substring(5, 6),
        child: row.substring(36, 37)
      };
    })
    .sort((a, b) => a.child.localeCompare(b.child))
    .reduce((acc, val) => {
      if (acc.length == 0 || acc[acc.length - 1].name !== val.child)
        acc.push({ name: val.child, depend: [val.parent] });
      else acc[acc.length - 1].depend.push(val.parent);
      return acc;
    }, []);
  end = dependencies.filter(
    dep =>
      dependencies.filter(other => other.depend.indexOf(dep.name) > -1)
        .length == 0
  )[0];
  console.log(treeToString(end, dependencies));
}

function treeToString(start, tree) {
  return (
    start.name +
    start.depend.sort().map(dep => {
      let other = tree.filter(other => other.name === dep);
      if (other.length > 0) return treeToString(other[0], tree);
      else return dep;
    })
  );
}

function part2(input) {}

module.exports = { solve };
