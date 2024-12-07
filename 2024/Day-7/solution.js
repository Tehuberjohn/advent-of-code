const fs = require("fs");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
// console.log(data)

const parseData = (arr) => {
  const sumArr = [];
  const numsArr = [];
  for (const line of arr) {
    let [sum, nums] = line.split(":");
    sumArr.push(+sum);
    numsArr.push(nums.trim().split(" ").map(Number));
  }
  return [sumArr, numsArr];
};

const calculate = (nums, operators) => {
  const operations = {
    "*": (a, b) => {
      return a * b;
    },
    "+": (a, b) => {
      return a + b;
    },
    "|": (a, b) => {
      return Number(String(a) + String(b));
    },
  };
  operators.reverse();
  nums.reverse();
  let total = nums.pop();
  while (nums.length) {
    total = operations[operators.pop()](total, nums.pop());
  }
  return total;
};

const hasValidSolution = (sum, numArr, part) => {
  const operators = {
    0: "+",
    1: "*",
    2: "|",
  };
  //find all different possible states
  for (let i = 0; i < (part === "one" ? 2 : 3) ** (numArr.length - 1); i++) {
    const binary = i
      .toString(part === "one" ? 2 : 3)
      .padStart(numArr.length - 1, "0");
    const operations = binary.split("").map((num) => operators[num]);
    const total = calculate(numArr.slice(0), operations);
    if (total === sum) {
      return true;
    }
  }
  return false;
};

const solve = (arr, part) => {
  const [sums, nums] = parseData(arr);
  let total = 0;
  for (let i = 0; i < sums.length; i++) {
    if (hasValidSolution(sums[i], nums[i], part)) {
      total += sums[i];
    }
  }
  console.log(`Part ${part}: ${total}`);
};

solve(data, "one");
solve(data, "two");
