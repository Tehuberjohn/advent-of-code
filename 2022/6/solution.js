const fs = require("fs");

const data = fs.readFileSync("input.txt").toString();
// console.log(data);

function findMarker(input) {
  let marker = null;
  let message = null;

  for (let i = 0; i < input.length; i++) {
    if (!marker) {
      let chunk = new Set(input.slice(i, i + 4));
      if (chunk.size === 4) marker = i + 4;
    } else if (!message) {
      let chunk = new Set(input.slice(i, i + 14));
      if (chunk.size === 14) message = i + 14;
    } else {
      return `Part One: ${marker} Part Two: ${message}`;
    }
  }
}

console.log(findMarker(data));
