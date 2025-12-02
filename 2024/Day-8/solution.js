const fs = require("fs");

const data = fs.readFileSync("test.txt").toString().split("\r\n");
// console.log(data)
const cleanData = (data) => {
  const newData = [];
  for (const line of data) {
    const newLine = [];
    for (const loc of line) {
      newLine.push(loc === "#" ? "." : loc);
    }
    newData.push(newLine);
  }
  return newData;
};

const cleanInput = cleanData(data);

const solve = (input) => {
  const map = {};
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; i++) {
      const current = input[i][j];
      if (current !== ".") {
        map[current] ? map[current].push([i, j]) : (map[current] = [[i, j]]);
      }
    }
  }
};

solve(cleanInput);
