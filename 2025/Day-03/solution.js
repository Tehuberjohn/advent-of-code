const fs = require("fs");
const { get } = require("http");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
// const data = fs.readFileSync("test.txt").toString().split("\r\n");
// console.log(data);

const getHighestTwelve = (arr) => {
  let highestTwelve = [];
  while (highestTwelve.length !== 12) {
    let highest = null;
    for (let i = 0; i < arr.length - (11 - highestTwelve.length); i++) {
      if (highest === null || arr[i] > highest[0]) {
        highest = [arr[i], i + 1];
      }
    }
    highestTwelve.push(highest[0]);
    arr = arr.slice(highest[1]);
  }
  return Number(highestTwelve.join(""));
};

const solve = (banks) => {
  const bankJoltage1 = [];
  const bankJoltage2 = [];
  for (const line of banks) {
    const bank = line.split("");
    let highestTwo = 0;
    console.log(bank.join(" "));
    const highestTwelve = getHighestTwelve(bank.slice(0));
    for (let i = 0; i < bank.length; i++) {
      for (let j = i + 1; j < bank.length; j++) {
        const current = Number(bank[i] + bank[j]);
        if (current > highestTwo) {
          highestTwo = current;
        }
      }
    }
    console.log(["result", highestTwo, highestTwelve]);
    bankJoltage1.push(highestTwo);
    bankJoltage2.push(highestTwelve);
  }

  const highest2Sum = bankJoltage1.reduce((a, b) => a + b, 0);
  const highes12Sum = bankJoltage2.reduce((a, b) => a + b, 0);
  console.log(`Part One: ${highest2Sum} Part Two: ${highes12Sum}`);
};
solve(data);
