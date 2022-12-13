const fs = require("fs");
const data = fs.readFileSync("input.txt").toString().split("\r\n");

function createMap(input, part) {
  let map = [];
  for (let i = 0; i < input.length; i += 3) {
    let left = eval(input[i]);
    let right = eval(input[i + 1]);
    if (part === "one") {
      map.push({ left: left, right: right });
    } else if (part === "two") {
      map.push(left);
      map.push(right);
    }
  }
  return map;
}

function checkOrder(left, right, result) {
  const leftIsNumber = typeof left === "number";
  const rightIsNumber = typeof right === "number";
  if (leftIsNumber && rightIsNumber) {
    if (left < right) {
      result.rightOrder = true;
      return;
    }
    if (left > right) {
      result.rightOrder = false;
      return;
    }
  } else if (!leftIsNumber && !rightIsNumber) {
    let index = 0;
    while (true) {
      if (index > left.length - 1 && index <= right.length - 1) {
        // left ran out of items
        result.rightOrder = true;
        return;
      } else if (index <= left.length - 1 && index > right.length - 1) {
        // right ran out of items
        result.rightOrder = false;
        return;
      } else if (index > left.length - 1 && index > right.length - 1) {
        // no decision, both lists ran out of items
        return;
      }

      // compare the two elements
      checkOrder(left[index], right[index], result);
      // if we have set the variable rightOrder, stop
      if (typeof result.rightOrder !== "undefined") {
        return;
      }

      index++;
    }
  } else {
    if (leftIsNumber) {
      checkOrder([left], right, result);
    } else {
      checkOrder(left, [right], result);
    }
  }
}

const solve1 = (arr) => {
  const mapped = createMap(arr, "one");
  let idx = 1;
  let count = 0;
  for (let line of mapped) {
    const { left, right } = line;
    let result = {};
    checkOrder(left, right, result);
    if (result.rightOrder) {
      count += idx;
    }
    idx++;
  }
  return `Part one: ${count}`;
};
const solve2 = (arr) => {
  const lines = createMap(arr, "two").concat([[2]], [[6]]);
  const sorted = lines
    .sort((a, b) => {
      let result = {};
      checkOrder(a, b, result);
      return result.rightOrder ? -1 : 1;
    })
    .map((line) => JSON.stringify(line));
  const divStart = sorted.indexOf("[2]") + 1;
  const divEnd = sorted.indexOf("[6]") + 1;
  console.log(`Part two: ${divStart * divEnd}`);
};
console.log(solve1(data));
console.log(solve2(data));
