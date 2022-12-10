const fs = require("fs");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
// console.log(data);

function moveRope(arr, num) {
  let map = {};
  let rope = [];

  // make rope
  for (let i = 0; i < num; i++) {
    rope.push([0, 0]);
  }

  const moveHead = {
    R: () => rope[0][1]++,
    D: () => rope[0][0]++,
    L: () => rope[0][1]--,
    U: () => rope[0][0]--,
  };

  const moveNodes = () => {
    for (let i = 1; i < rope.length; i++) {
      const [prevY, prevX] = rope[i - 1];
      const [curY, curX] = rope[i];
      const xDiff = curX - prevX;
      const yDiff = curY - prevY;
      if (xDiff > 1) {
        rope[i][1]--;
        rope[i][0] = Math.abs(yDiff) === 1 ? rope[i - 1][0] : rope[i][0];
      } else if (xDiff < -1) {
        rope[i][1]++;
        rope[i][0] = Math.abs(yDiff) === 1 ? rope[i - 1][0] : rope[i][0];
      }
      if (yDiff > 1) {
        rope[i][0]--;
        rope[i][1] = Math.abs(xDiff) === 1 ? rope[i - 1][1] : rope[i][1];
      } else if (yDiff < -1) {
        rope[i][0]++;
        rope[i][1] = Math.abs(xDiff) === 1 ? rope[i - 1][1] : rope[i][1];
      }
    }
  };

  for (let i = 0; i < arr.length; i++) {
    const [dir, count] = arr[i].split(" ").map((ele) => +ele || ele);
    for (let j = 0; j < count; j++) {
      const tail = rope.length - 1;
      moveHead[dir]();
      moveNodes();
      if (!map[rope[tail]]) map[rope[tail]] = true;
    }
  }
  return Object.keys(map).length;
}

console.log(`Part One: ${moveRope(data, 2)}`);
console.log(`Part Two: ${moveRope(data, 10)}`);
