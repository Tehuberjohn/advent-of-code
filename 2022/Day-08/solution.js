const fs = require("fs");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
// console.log(data);

function checkX(i, j, current) {
  let visibleX = false;
  const left = data[i].slice(0, j).split("");
  const right = data[i].slice(j + 1).split("");
  if (left.every((num) => num < current) || right.every((num) => num < current))
    visibleX = true;
  return visibleX;
}

function checkY(i, j, current) {
  let visibleY = false;
  const x = data.map((str) => str[j]);
  const top = x.slice(0, i).reverse();
  const bottom = x.slice(i + 1);
  if (top.every((num) => num < current) || bottom.every((num) => num < current))
    visibleY = true;
  return visibleY;
}

function partOne(data) {
  let visible = 0;
  visible += data[0].length * 2;

  for (let i = 1; i < data.length - 1; i++) {
    let row = data[i];
    for (let j = 1; j < row.length - 1; j++) {
      if (checkX(i, j, row[j]) || checkY(i, j, row[j])) {
        visible++;
      }
    }
    visible += 2;
  }
  return `Part One: ${visible}`;
}

function partTwo(data) {
  let highest = null;
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      let left = 0;
      for (let i = x - 1; i >= 0; i--) {
        left++;
        if (data[y][i] >= data[y][x]) break;
      }

      let right = 0;
      for (let i = x + 1; i < data[y].length; i++) {
        right++;
        if (data[y][i] >= data[y][x]) break;
      }

      let top = 0;
      for (let i = y - 1; i >= 0; i--) {
        top++;
        if (data[i][x] >= data[y][x]) break;
      }

      let bottom = 0;
      for (let i = y + 1; i < data.length; i++) {
        bottom++;
        if (data[i][x] >= data[y][x]) break;
      }

      let score = left * right * top * bottom;
      if (score > highest) highest = score;
    }
  }
  return `Part Two: ${highest}`;
}

console.log(partOne(data));
console.log(partTwo(data));
