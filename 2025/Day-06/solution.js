const fs = require("fs");
const { get } = require("http");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
// const data = fs.readFileSync("test.txt").toString().split("\r\n");
// console.log(data);

const formatData = (arr) => {
  const numbers = [];
  for (const line of arr) {
    numbers.push(line.split(" ").filter((str) => str !== ""));
  }
  const operators = numbers.pop();
  return [operators, numbers];
};

const getCephNumbers = (arr) => {
  const cephNumbers = [];
  let numbers = [];
  for (let i = 0; i < arr[0].length; i++) {
    let number = "";
    for (let j = 0; j < arr.length; j++) {
      const current = arr[j][i];
      if (current === " ") {
        continue;
      }
      number += current;
    }
    if (Number(number) !== 0) {
      numbers.push(Number(number));
    } else {
      cephNumbers.push(numbers.reverse());
      numbers = [];
    }
    // console.log(Number(number));
  }
  cephNumbers.push(numbers.reverse());
  return cephNumbers;
};

const solve = (arr) => {
  const [operators, numbers] = formatData(arr.slice(0));
  const cephNumbers = getCephNumbers(arr.slice(0, -1));
  const operations = {
    "+": (a, b) => a + b,
    "*": (a, b) => a * b,
  };
  console.log(cephNumbers);
  console.log(operators);
  let total = 0;
  for (let i = 0; i < operators.length; i++) {
    let sum = null;
    for (let j = 0; j < numbers.length; j++) {
      // console.log([operators[i], sum, numbers[j][i]]);
      if (sum === null) {
        sum = Number(numbers[j][i]);
      } else {
        sum = operations[operators[i]](sum, Number(numbers[j][i]));
      }
    }
    total += sum;
  }
  let cepthTotal = 0;
  for (let i = 0; i < cephNumbers.length; i++) {
    let sum = null;
    for (const number of cephNumbers[i]) {
      if (sum === null) {
        sum = Number(number);
      } else {
        sum = operations[operators[i]](sum, number);
      }
    }
    cepthTotal += sum;
  }
  console.log(`Part One: ${total} Part Two: ${cepthTotal}`);
};

solve(data);
