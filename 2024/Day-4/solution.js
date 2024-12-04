const fs = require("fs");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
// console.log(data);

const exploreBoard = (row, col) => {
  const dirs = {
    N: (x, y) => {
      if (x > 2) {
        let word = data[x][y];
        while (word.length < 4) {
          x--;
          word += data[x][y];
        }
        return word;
      }
      return null;
    },
    NE: (x, y) => {
      if (x > 2 && y < data[0].length - 2) {
        let word = data[x][y];
        while (word.length < 4) {
          x--;
          y++;
          word += data[x][y];
        }
        return word;
      }
      return null;
    },
    E: (x, y) => {
      if (y < data[0].length - 3) {
        let word = data[x][y];
        while (word.length < 4) {
          y++;
          word += data[x][y];
        }
        return word;
      }
      return null;
    },
    SE: (x, y) => {
      if (x < data.length - 3 && y < data[0].length - 3) {
        let word = data[x][y];
        while (word.length < 4) {
          x++;
          y++;
          word += data[x][y];
        }
        return word;
      }
      return null;
    },
    S: (x, y) => {
      if (x < data.length - 3) {
        let word = data[x][y];
        while (word.length < 4) {
          x++;
          word += data[x][y];
        }
        return word;
      }
      return null;
    },
    SW: (x, y) => {
      if (x < data.length - 3 && y > 2) {
        let word = data[x][y];
        while (word.length < 4) {
          x++;
          y--;
          word += data[x][y];
        }
        return word;
      }
      return null;
    },
    W: (x, y) => {
      if (y > 2) {
        let word = data[x][y];
        while (word.length < 4) {
          y--;
          word += data[x][y];
        }
        return word;
      }
      return null;
    },
    NW: (x, y) => {
      if (x > 2 && y > 2) {
        let word = data[x][y];
        while (word.length < 4) {
          x--;
          y--;
          word += data[x][y];
        }
        return word;
      }
      return null;
    },
  };
  let matches = 0;
  for (const dir in dirs) {
    const word = dirs[dir](row, col);
    if (["XMAS", "SAMX"].includes(word)) {
      matches++;
    }
  }
  return matches;
};

const checkForWord = (row, col) => {
  return exploreBoard(row, col);
};

const solve = (arr) => {
  let matches = 0;
  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[0].length; col++) {
      if (arr[row][col] === "X") {
        matches += checkForWord(row, col);
      }
    }
  }
  console.log(matches);
};

solve(data);
