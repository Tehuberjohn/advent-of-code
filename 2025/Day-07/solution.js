const fs = require("fs");
const { get } = require("http");
const { start } = require("repl");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
// const data = fs.readFileSync("test.txt").toString().split("\r\n");
// console.log(data);

const solve = (arr) => {
  const startRow = arr[0].indexOf("S");
  arr[1][startRow] = 1;
  let beamSplits = 1;
  for (let i = 2; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      const hasBeamAbove = typeof arr[i - 1][j] === "number";
      const current = arr[i][j];
      if (hasBeamAbove) {
        const beamValue = arr[i - 1][j];
        if (current === "^") {
          if (typeof arr[i][j - 1] === "number") {
            arr[i][j - 1] += beamValue;
          } else {
            arr[i][j - 1] = beamValue;
          }
          arr[i][j + 1] = beamValue;
          beamSplits++;
        }
        if (current === ".") {
          arr[i][j] = beamValue;
          arr[i][j] = beamValue;
        }
        if (typeof current === "number") {
          arr[i][j] += beamValue;
        }
      }
    }
  }
  console.log(arr.map((row) => row.join(" ")).join("\n"));
  const timelines = arr
    .pop()
    .filter(Number)
    .reduce((a, b) => a + b, 0);
  console.log(`Part One: ${beamSplits} Part Two: ${timelines}`);
};

solve(data.map((row) => row.split("")));
