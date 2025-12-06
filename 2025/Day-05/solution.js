const fs = require("fs");
const { get } = require("http");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
// const data = fs.readFileSync("test.txt").toString().split("\r\n");
// console.log(data);

const parseData = (arr) => {
  let isRanges = true;
  const ranges = [];
  const ids = [];
  for (const line of arr) {
    if (!line) {
      isRanges = false;
      continue;
    }
    if (isRanges) {
      const [start, end] = line.split("-").map(Number);
      ranges.push([start, end]);
    } else {
      ids.push(Number(line));
    }
  }
  return [ranges.sort((a, b) => a[0] - b[0]), ids];
};

const getTotalFreshIDs = (ranges) => {
  const condensedRanges = [];
  let currentRange = ranges[0];
  // console.log(ranges);
  for (const range of ranges) {
    let [low, high] = currentRange;
    const isInRange = range[0] >= low && range[0] <= high;
    if (isInRange) {
      if (range[1] > high) {
        currentRange[1] = range[1];
      }
    } else {
      condensedRanges.push(currentRange);
      currentRange = range;
    }
  }
  condensedRanges.push(currentRange);
  // console.log(condensedRanges);
  return condensedRanges.map((range) => range[1] - range[0] + 1);
};

const solve = (arr) => {
  const [ranges, ids] = parseData(arr);
  // console.log(ranges);
  let fresh = [];
  for (const id of ids) {
    for (const range of ranges) {
      if (id >= range[0] && id <= range[1]) {
        fresh.push(id);
        break;
      }
    }
  }
  let idTotal = 0;
  const freshRanges = getTotalFreshIDs(ranges);
  freshRanges.forEach((range) => {
    idTotal += range;
  });
  console.log(`Part One: ${fresh.length} Part Two: ${idTotal}`);
};
console.log(solve(data));
