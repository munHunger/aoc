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
  let result = "";
  while (dependencies.length > 0) {
    start = dependencies
      .filter(
        dep =>
          dependencies.filter(other => other.depend.indexOf(dep.name) > -1)
            .length == 0
      )
      .sort((a, b) => a.name.localeCompare(b.name))[0];
    result += start.name;
    if (dependencies.length == 1)
      result += start.depend.filter(
        state => result.split("").filter(char => char === state).length == 0
      )[0];
    dependencies.splice(dependencies.indexOf(start), 1);
  }
  return result;
}

function part2(input) {}

module.exports = { solve };
