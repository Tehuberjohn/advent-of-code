const fs = require("fs");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
// console.log(data);

const parseData = (arr) => {
  const left = [];
  const right = [];
  for (const pair of data) {
    const [first, last] = pair
      .split(" ")
      .filter((el) => el !== "")
      .map(Number);
    left.push(+first);
    right.push(+last);
  }
  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);
  return [left, right];
};

const solve = (arr) => {
  const [left, right] = parseData(data);
  let diffSum = 0;
  let simScore = 0;
  const map = {};
  for (let i = 0; i < left.length; i++) {
    map[right[i]] ? map[right[i]]++ : (map[right[i]] = 1);
  }
  for (let i = 0; i < left.length; i++) {
    const dif = Math.abs(left[i] - right[i]);
    diffSum += dif;
    simScore += left[i] * map[left[i]] || 0;
  }
  console.log(`Part One: ${diffSum} Part Two: ${simScore}`);
};
solve();
