const fs = require("fs");

const input = fs.readFileSync("input.txt", { encoding: "utf-8" });

console
  .log(input)
  .split("\n")
  .map((ele) => parseInt(ele));

function calorieCount(arr) {
  let caloriesArr = [];
  let calories = 0;
  for (let i = 0; i < arr.length; i++) {
    if (Number.isNaN(arr[i])) {
      caloriesArr.push(calories);
      calories = 0;
    } else {
      calories += arr[i];
    }
  }
  return caloriesArr.sort((a, b) => b - a)[0];
}

function calorieCountPart2(arr) {
  let caloriesArr = [];
  let calories = 0;
  for (let i = 0; i < arr.length; i++) {
    if (Number.isNaN(arr[i])) {
      caloriesArr.push(calories);
      calories = 0;
    } else {
      calories += arr[i];
    }
  }
  return caloriesArr
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, c) => acc + c, 0);
}

console.log(calorieCount(input));
console.log(calorieCountPart2(input));
// console.log(input);
