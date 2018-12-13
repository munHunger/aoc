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
    .sort((a, b) => a.parent.localeCompare(b.parent))
    .reduce((acc, val) => {
      if (acc.length == 0 || acc[acc.length - 1].name !== val.parent)
        acc.push({ name: val.parent, depend: [val.child] });
      else acc[acc.length - 1].depend.push(val.child);
      return acc;
    }, []);
  start = dependencies.filter(
    dep =>
      dependencies.filter(other => other.depend.indexOf(dep.name) > -1)
        .length == 0
  )[0];
  console.log("dep:");
  console.log(dependencies);
  console.log("---------starting tree print--------");
  return treeToString(start, dependencies, new Set());
}

function treeToString(start, tree, visited) {
  console.log(start);
  console.log(tree.filter(dep => dep.depend.indexOf(start.name) > -1));
  if (
    tree
      .filter(dep => dep.depend.indexOf(start.name) > -1)
      .filter(dep => !visited.has(dep.name)).length > 0 ||
    visited.has(start.name)
  ) {
    console.log("skipped");
    return "";
  }
  visited.add(start.name);
  return (
    start.name +
    start.depend
      .sort()
      .map(dep => {
        let other = tree.filter(other => other.name === dep);
        if (other.length > 0) return treeToString(other[0], tree, visited);
        else return treeToString({ name: dep, depend: [] }, tree, visited);
      })
      .reduce((acc, val) => (acc += val), "")
  );
}

function part2(input) {}

module.exports = { solve };
