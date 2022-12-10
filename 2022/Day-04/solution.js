const fs = require("fs");
const data = fs.readFileSync("input.txt").toString().split("\r\n");
// console.log(data);

function createArr(min, max) {
  let output = [];
  for (let i = +min; i <= +max; i++) {
    output.push(i);
  }
  return output;
}

function dutyCheck(arr) {
  let fullOverlap = 0;
  let anyOverlap = 0;
  for (let i = 0; i < arr.length; i++) {
    const [a, b] = arr[i].split(",");
    const [aMin, aMax] = a.split("-").map((n) => +n);
    const [bMin, bMax] = b.split("-").map((n) => +n);
    let arrA = createArr(aMin, aMax);
    let arrB = createArr(bMin, bMax);
    if (aMin <= bMin && aMax >= bMax) {
      fullOverlap++;
    } else if (bMin <= aMin && bMax >= aMax) {
      fullOverlap++;
    }
    const length = arrA.length + arrB.length;
    const unique = new Set(arrA.concat(arrB)).size;
    if (unique != length) anyOverlap++;
  }
  return `part1: ${fullOverlap} part2: ${anyOverlap}`;
}

console.log(dutyCheck(data));
