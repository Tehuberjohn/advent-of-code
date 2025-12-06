const fs = require("fs");
const { get } = require("http");

const data = fs
  .readFileSync("input.txt")
  .toString()
  .split("\r\n")
  .map((line) => line.split(""));
// const data = fs
//   .readFileSync("test.txt")
//   .toString()
//   .split("\r\n")
//   .map((line) => line.split(""));
// console.log(data);

const getAdjacent = (row, col, arr) => {
  let adjacent = 0;
  const dirs = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];
  for (const dir of dirs) {
    if (row + dir[0] in arr && col + dir[1] in arr) {
      if (arr[row + dir[0]][col + dir[1]] === "@") {
        adjacent++;
      }
    }
  }
  return adjacent;
};

const solve = (arr) => {
  const accessed = [];
  let canRemove = true;
  while (canRemove) {
    const idx = [];
    let accessible = 0;
    for (let i = 0; i < arr.length; i++) {
      const line = arr[i];
      for (let j = 0; j < line.length; j++) {
        if (arr[i][j] !== "@") {
          continue;
        }
        const adjacent = getAdjacent(i, j, arr);
        if (adjacent < 4) {
          idx.push([i, j]);
          accessible++;
        }
      }
    }
    if (!accessible) {
      canRemove = false;
    }
    idx.forEach(([row, col]) => {
      arr[row][col] = ".";
    });
    accessed.push(accessible);
  }

  // console.table(idx);
  console.log(
    `Part One: ${accessed[0]} Part Two: ${accessed.reduce((a, b) => a + b, 0)}`
  );
};

solve(data);
