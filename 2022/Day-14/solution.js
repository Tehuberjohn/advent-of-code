const fs = require("fs");
const data = fs.readFileSync("input.txt").toString().split("\r\n");
// console.log(data);

function parseInput(input) {
  let map = new Set();
  let maxY = 0;

  //format splits and maps data into its x and y, also captures the lowest point of the y
  for (const line of input) {
    let points = line
      .split(" -> ")
      .map((point) => {
        const [x, y] = point.split(",");
        if (y > maxY) {
          maxY = y;
        }
        return { x: +x, y: +y };
      })
      .reverse();

    let currentPoint = points.pop();
    // //plots the points to the map
    while (points.length) {
      let targetPoint = points.pop();

      //while current point isn't target point, move and plot the walls
      while (
        currentPoint.x !== targetPoint.x ||
        currentPoint.y !== targetPoint.y
      ) {
        map.add(`${currentPoint.x},${currentPoint.y}`);
        if (currentPoint.x !== targetPoint.x) {
          const delta =
            (targetPoint.x - currentPoint.x) /
            Math.abs(targetPoint.x - currentPoint.x);
          currentPoint.x += delta;
        } else {
          const delta =
            (targetPoint.y - currentPoint.y) /
            Math.abs(targetPoint.y - currentPoint.y);
          currentPoint.y += delta;
        }
      }
      map.add(`${currentPoint.x},${currentPoint.y}`);
    }
  }
  return [map, +maxY];
}

const parsedData = parseInput(data);
console.log(parsedData);
