const fs = require("fs");

const data = fs.readFileSync("input.txt").toString().split(",");
// const data = fs.readFileSync("test.txt").toString().split(",");
// console.log(data);

const parseData = (arr) => {
  const ranges = [];
  for (const line of arr) {
    const [start, end] = line.split("-").map(Number);
    ranges.push([start, end]);
  }
  return ranges;
};

const isValid = (num) => {
  const length = String(num).length;
  if (num < 10 || length % 2 !== 0) {
    return true;
  }
  const front = num.toString().slice(0, length / 2);
  const back = num.toString().slice(length / 2);
  if (front === back) {
    return false;
  }
  return true;
};

const isRepeated = (num) => {
  const length = String(num).length;
  if (num < 10) {
    return false;
  }
  // console.log(num);
  for (let i = 1; i < Math.floor(length / 2) + 1; i++) {
    let slice = String(num).slice(0, i);
    let isMatch = true;
    // console.log(`Slice:${slice}`);
    for (let j = 0; j < length; j += slice.length) {
      const current = String(num).slice(j, j + slice.length);
      // console.log(String(num).slice(j, j + slice.length));
      if (current !== slice) {
        isMatch = false;
        break;
      }
    }
    if (isMatch) {
      return true;
    }
  }
  return false;
};

const solve = (arr) => {
  const ranges = parseData(arr);
  let invalidIds = [];
  let repeatedIds = [];
  for (const range of ranges) {
    let [start, end] = range;
    while (start <= end) {
      if (!isValid(start)) {
        invalidIds.push(start);
      }
      if (isRepeated(start)) {
        repeatedIds.push(start);
      }
      start++;
    }
  }
  // console.log(repeatedIds);
  const IdTotal = invalidIds.reduce((a, b) => a + b, 0);
  const repeatedTotal = repeatedIds.reduce((a, b) => a + b, 0);
  console.log(`Part One: ${IdTotal} Part Two: ${repeatedTotal}`);
};

console.log(solve(data));
