const fs = require("fs");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
// console.log(data);

const isNumber = (char) => !Number.isNaN(+char);
const stringNums = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const findStringNums = (string) => {
  const nums = [];
  for (let i = 0; i <= string.length; i++) {
    for (let j = i; j < string.length; j++) {
      if (i === j && isNumber(string[i])) {
        nums.push(string[i]);
      } else {
        const slice = string.slice(i, j);
        if (slice.length > 5) {
          break;
        }
        if (stringNums[slice]) {
          nums.push(stringNums[slice]);
        }
      }
    }
  }
  return nums;
};

const findCalibrationValue = (string, part) => {
  let nums, first, last;
  if (part === "one") {
    nums = [...string].filter(isNumber);
  } else {
    nums = findStringNums(string);
  }
  first = nums[0];
  last = nums.pop();
  return Number(first + last);
};

const solve = (part) => {
  let calibrationSum = 0;
  for (const line of data) {
    calibrationSum += findCalibrationValue(line, part);
  }
  return calibrationSum;
};
console.log(`Part One :${solve("one")} Part Two: ${solve("two")}`);
