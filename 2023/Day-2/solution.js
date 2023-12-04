const fs = require("fs");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
// console.log(data);

const sack = {
  red: 12,
  green: 13,
  blue: 14,
};

const cleanRoundData = (str) => {
  let rounds = [];
  let current = "";
  for (const char of str) {
    if ([",", ";"].includes(char)) {
      rounds.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }
  rounds.push(current.trim());
  return rounds;
};

const findLowest = (arr) => {
  const boxes = {
    blue: [],
    red: [],
    green: [],
  };

  for (const round of arr) {
    const [number, colour] = round.split(" ");
    boxes[colour].push(+number);
  }
  return [
    Math.max(...boxes.red),
    Math.max(...boxes.green),
    Math.max(...boxes.blue),
  ];
};

const parseGameData = (str) => {
  let [game, rounds] = str.split(":");
  const gameId = game.split(" ")[1];
  rounds = cleanRoundData(rounds);
  const [lowRed, lowGreen, lowBlue] = findLowest(rounds);
  const cubedSum = lowRed * lowGreen * lowBlue;
  console.log(cubedSum);
  let isPossible = true;
  for (const round of rounds) {
    const [number, colour] = round.split(" ");
    if (+number > sack[colour]) {
      isPossible = false;
      break;
    }
  }
  return [+gameId, isPossible, cubedSum];
};

const solve = (arr) => {
  let idTotal = 0;
  let cubedTotal = 0;
  for (const line of arr) {
    const [id, isPossible, cubedSum] = parseGameData(line);
    cubedTotal += cubedSum;
    if (isPossible) {
      idTotal += id;
    }
  }
  return `Part One: ${idTotal} Part Two: ${cubedTotal}`;
};

console.log(solve(data));
