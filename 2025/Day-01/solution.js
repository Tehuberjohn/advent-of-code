const fs = require("fs");
const { format } = require("path");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
// const data = fs.readFileSync("test.txt").toString().split("\r\n");
// console.log(data);

const formatData = (str) => {
  const direction = str[0];
  const ammount = str.slice(1);
  return [direction, +ammount];
};

const turnDial = (num, dir, dial) => {
  let position = dial;
  let clicks = 0;
  while (num > 0) {
    num--;
    position += dir === "L" ? -1 : 1;
    if (position < 0) {
      position = 99;
    }
    if (position > 99) {
      position = 0;
    }
    if (position === 0 && num) {
      clicks++;
    }
  }
  return [position, clicks];
};

const solve = (arr) => {
  let dial = 50;
  let matches = 0;
  let clickNumber = 0;
  for (const line of arr) {
    const [dir, num] = formatData(line);
    const [position, clicks] = turnDial(num, dir, dial);
    dial = position;
    clickNumber += clicks;
    if (dial === 0) {
      matches++;
    }
    // console.log([dial, `matches: ${matches}`, `clicks: ${clickNumber}`]);
  }
  console.log(`Part One: ${matches} part Two: ${clickNumber + matches}`);
};
solve(data);
