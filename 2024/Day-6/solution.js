const fs = require("fs");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
// console.log(data);

const findStartingPos = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const line = arr[i];
    for (let j = 0; j < line.length; j++) {
      if (line[j] === "^") {
        return [i, j];
      }
    }
  }
};

const isInBounds = (row, col) => {
  const bounds = [data.length - 1, data[0].length - 1];
  const isInRow = row >= 0 && row <= bounds[0];
  const isInCol = col >= 0 && col <= bounds[1];
  return isInRow && isInCol;
};

const walkGaurd = (row, col, num, map) => {
  const moves = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  const move = moves[num % 4];
  let next = map[row][col];
  while (true) {
    map[row][col] = "X";
    if (isInBounds(row + move[0], col + move[1])) {
      const isObstacleNext = map[row + move[0]][col + move[1]] === "#";
      if (isObstacleNext) {
        break;
      }
      row += move[0];
      col += move[1];
      next = data[row][col];
    } else {
      row += move[0];
      col += move[1];
      break;
    }
  }
  return [row, col];
};

const countSteps = (arr) => {
  let steps = 0;
  for (const line of arr) {
    for (const tile of line) {
      if (tile === "X") {
        steps++;
      }
    }
  }
  return steps;
};

const solve = (arr) => {
  const map = arr.map((line) => line.split(""));
  let [row, col] = findStartingPos(map);
  let lines = 0;
  while (isInBounds(row, col)) {
    [row, col] = walkGaurd(row, col, lines, map);
    lines++;
  }
  const steps = countSteps(map);
  console.log(map.map((line) => line.join("")).join("\n"));
  console.log(steps);
};

solve(data);
