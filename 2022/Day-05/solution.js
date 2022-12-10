const fs = require("fs");
const data = fs.readFileSync("input.txt").toString().split("\r\n");

let crates = [
  ["W", "M", "L", "F"],
  ["B", "Z", "V", "M", "F"],
  ["H", "V", "V", "R", "S", "L", "Q"],
  ["F", "S", "V", "Q", "P", "M", "T", "J"],
  ["L", "S", "W"],
  ["F", "V", "P", "M", "R", "J", "W"],
  ["J", "Q", "C", "P", "N", "R", "F"],
  ["V", "H", "P", "S", "Z", "W", "R", "B"],
  ["B", "M", "J", "C", "G", "H", "Z", "W"],
];

function stackCrates(arr) {
  let topCrates = "";

  const moveCrates = (from, to, count) =>
    crates[to].push(...crates[from].splice(-count).reverse());

  for (let i = 0; i < arr.length; i++) {
    const split = arr[i].split(" ");
    const from = split[3] - 1;
    const to = split[5] - 1;
    let count = split[1];
    moveCrates(from, to, count);
  }
  for (let i = 0; i < crates.length; i++) {
    let current = crates[i].pop();
    topCrates += current;
  }
  return topCrates;
}

let crates2 = [
  ["W", "M", "L", "F"],
  ["B", "Z", "V", "M", "F"],
  ["H", "V", "V", "R", "S", "L", "Q"],
  ["F", "S", "V", "Q", "P", "M", "T", "J"],
  ["L", "S", "W"],
  ["F", "V", "P", "M", "R", "J", "W"],
  ["J", "Q", "C", "P", "N", "R", "F"],
  ["V", "H", "P", "S", "Z", "W", "R", "B"],
  ["B", "M", "J", "C", "G", "H", "Z", "W"],
];

function stackCrates2(arr) {
  let topCrates = "";
  const moveCrates = (from, to, count) =>
    crates2[to].push(...crates2[from].splice(-count));

  for (let i = 0; i < arr.length; i++) {
    const split = arr[i].split(" ");
    const from = split[3] - 1;
    const to = split[5] - 1;
    let count = split[1];
    moveCrates(from, to, count);
  }
  for (let i = 0; i < crates2.length; i++) {
    let current = crates2[i].pop();
    topCrates += current;
  }
  return topCrates;
}

console.log(stackCrates(data));
console.log(stackCrates2(data));
