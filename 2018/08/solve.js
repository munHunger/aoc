function solve(input, part) {
  if (part === 1) return part1(input);
  else return part2(input);
}
function part1(input) {
  input = input[0].split(" ").map(val => parseInt(val));
  return sumTree(tree(0, input));
}

function sumTree(tree) {
  return tree.elements
    .concat(tree.children.map(c => sumTree(c)))
    .reduce((acc, val) => (acc += val), 0);
}

function tree(index, list) {
  let cList = [];
  let meta = list[index + 1];
  while (list[index] > 0) {
    let old = list;
    let reduce = tree(index + 2, list);
    cList.push(reduce);
    list = list
      .slice(0, reduce.range.start)
      .concat(list.slice(reduce.range.end, list.length));
    console.log("LISTS " + index + " . " + list[index]);
    console.log(old);
    console.log(list);
    list[index]--;
  }
  return {
    elements: list.slice(index + 2, index + meta + 2),
    range: {
      start: index,
      end: cList.reduce(
        (acc, val) => Math.max(acc, val.range.end + meta),
        index + meta + 2
      )
    },
    children: cList
  };
}

function part2(input) {}

module.exports = { solve };
