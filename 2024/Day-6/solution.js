const fs = require("fs");

const data = fs.readFileSync("test.txt").toString().split("\r\n");
// console.log(data);

const seen = {};

const moves = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
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
  const move = moves[num % 4];
  let next = map[row][col];
  let loops = 0;
  let unique = 0;
  while (true) {
    map[row][col] = map[row][col] === "2" ? "2" : "X";
    const pos = `${row}|${col}`;
    if (!seen[pos]) {
      unique++;
    }
    seen[pos] ? seen[pos].push(num % 4) : (seen[pos] = [num % 4]);
    if (isInBounds(row + move[0], col + move[1])) {
      const isObstacleNext = map[row + move[0]][col + move[1]] === "#";
      if (isObstacleNext) {
        break;
      }

      if (checkForLoop(row, col, num + 1)) {
        map[row + move[0]][col + move[1]] = "2";
        loops++;
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
  return [row, col, unique, loops];
};

const checkForLoop = (x, y, num) => {
  const move = moves[num % 4];
  let [row, col] = [x, y].slice(0);
  while (true) {
    const tileData = seen[`${row}|${col}`] || [];
    if (isInBounds(row + move[0], col + move[1])) {
      if (tileData.includes((num % 4) % 4)) {
        return true;
      }
      row += move[0];
      col += move[1];
      current = data[row][col];
    } else {
      return false;
    }
  }
};

const solve = (arr) => {
  const map = arr.map((line) => line.split(""));
  let [row, col] = findStartingPos(map);
  const start = [row, col].slice(0);
  let lines = 0;
  let uniqueLocs = 0;
  let possibleLoops = 0;
  while (isInBounds(row, col)) {
    [row, col, unique, loops] = walkGaurd(row, col, lines, map);
    uniqueLocs += unique;
    possibleLoops += loops;
    lines++;
  }
  console.log(map.map((line) => line.join(" ")).join("\n"));
  console.log("         ");
  console.log(`Part One: ${uniqueLocs} Part 2: ${possibleLoops}`);
};

//works on sample for part 2, Needs more time in the over to figure out where my logic is flawed, maybe mapping the board first then evaluating the path after would be more successful?

solve(data);
