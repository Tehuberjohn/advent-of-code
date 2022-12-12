const fs = require("fs");
const data = fs.readFileSync("input.txt").toString().split("\n");

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function mapHill(input, part) {
  const starts = [];
  const seen = [];
  let end;
  const map = input.map((line, i) =>
    line.split("").map((char, j) => {
      let elevation;
      if (char === "S" || (part === "two" && char === "a")) {
        elevation = 0;
        starts.push([i, j]);
      } else if (char === "E") {
        elevation = 25;
        end = [i, j];
      } else {
        elevation = char.charCodeAt(0) - "a".charCodeAt(0);
      }
      return elevation;
    })
  );

  const queue = starts.map((ele) => ({ pos: ele, steps: 0 }));

  while (queue[0].pos[0] !== end[0] || queue[0].pos[1] !== end[1]) {
    const {
      pos: [i, j],
      steps,
    } = queue.shift();
    if (seen[i] && seen[i][j]) {
      continue;
    }
    for (const [di, dj] of dirs) {
      const outBounds = map[i + di]?.[j + dj] === undefined;
      const longer = map[i + di]?.[j + dj] > map[i][j] + 1;
      const alreadySeen = seen[i + di]?.[j + dj];
      if (outBounds || longer || alreadySeen) {
        continue;
      }
      queue.push({ pos: [i + di, j + dj], steps: steps + 1 });
    }
    seen[i] = seen[i] || [];
    seen[i][j] = 1;
  }
  console.log(`Part ${part}: ${queue[0].steps}`);
}
mapHill(data, "one");
mapHill(data, "two");
