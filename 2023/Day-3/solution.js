const fs = require("fs");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
// console.log(data);

const parts = {};
const findParts = () => {
  const nonParts = "0123456789.";
  for (const line of data) {
    const filtered = [...line].filter((char) => !nonParts.includes(char));
    for (const item of filtered) {
      if (!parts[item]) {
        parts[item] = true;
      }
    }
  }
};
findParts();

const checkForSerial = (row, col, isGear) => {
  const dirs = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
  ];
  const serials = [];
  let last = null;
  for (const dir of dirs) {
    const x = row + dir[0];
    const y = col + dir[1];
    if (isValidPos(x, y)) {
      const value = data[x][y];
      const current = value === "." ? null : findFullNumber(x, y);
      if (!Number.isNaN(+value) && current !== last) {
        serials.push(findFullNumber(x, y));
      }
      last = current;
    }
  }
  const formatted = [...serials].map((num) => +num);
  let gearRatio = 0;
  if (isGear && formatted.length === 2) {
    gearRatio = formatted[0] * formatted[1];
  }
  return [formatted, gearRatio];
};

const findFullNumber = (row, y) => {
  let front = y;
  let back = y;
  let isFoundFront = false;
  let isFoundBack = false;
  while (!isFoundFront && !isFoundBack) {
    if (Number.isNaN(+data[row][front] - 1)) {
      isFoundFront = true;
    }
    if (Number.isNaN(+data[row][back] + 1)) {
      isFoundBack = true;
    }
    if (!isFoundBack) {
      back++;
    }
    if (!isFoundFront) {
      front--;
    }
  }
  const slice = data[row].slice(front, back + 1);
  const formatted = [...slice]
    .filter((char) => "0123456789".includes(char))
    .join("");
  return formatted;
};

const isValidPos = (x, y) => {
  if (data[x] !== undefined) {
    if (data[x][y] !== undefined) {
      return true;
    }
  }
  return false;
};

const checkForParts = (str, i) => {
  let matches = [];
  let gearRatioTotal = 0;
  for (let j = 0; j < str.length; j++) {
    if (str[j] in parts) {
      const isGear = str[j] === "*";
      const [current, gearRatio] = checkForSerial(i, j, isGear);
      matches = matches.concat(current);
      gearRatioTotal += gearRatio;
    }
  }
  return [matches, gearRatioTotal];
};

const solve = (arr) => {
  let serialTotal = 0;
  let gearRatioTotal = 0;
  for (let i = 0; i < arr.length; i++) {
    const [matches, gearRatio] = checkForParts(arr[i], i);
    serialTotal += matches.reduce((acc, c) => acc + c, 0);
    gearRatioTotal += gearRatio;
  }
  console.log(`Part One: ${serialTotal} Part Two: ${gearRatioTotal}`);
};

solve(data);
