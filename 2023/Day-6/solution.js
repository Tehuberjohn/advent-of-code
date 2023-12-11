const fs = require("fs");

const data = fs.readFileSync("input.txt").toString().split("\r\n");

const splitLines = (str) =>
  str.split(":")[1].trim().split(" ").filter(Boolean).map(Number);

const [times, records] = data.map(splitLines);
const solveOne = (arr) => {
  let possibleWins = [];
  for (let i = 0; i < arr.length; i++) {
    const currentTime = arr[i];
    let possibleWinNum = 0;
    let speed = 1;
    for (let j = 1; j < currentTime; j++) {
      const remainingTime = currentTime - j;
      const distanceTraveled = speed * remainingTime;
      if (distanceTraveled > records[i]) {
        possibleWinNum++;
      }
      speed++;
    }
    possibleWins.push(possibleWinNum);
  }
  console.log(`Part One: ${possibleWins.reduce((acc, c) => acc * c, 1)}`);
};

const solveTwo = (time, record) => {
  const currentTime = time;
  let possibleWinNum = 0;
  let speed = 1;
  for (let j = 1; j < currentTime; j++) {
    const remainingTime = currentTime - j;
    const distanceTraveled = speed * remainingTime;
    if (distanceTraveled > record) {
      possibleWinNum++;
    }
    speed++;
  }
  console.log(`Part Two: ${possibleWinNum}`);
};
solveOne(times);
solveTwo(+times.join(""), +records.join(""));
