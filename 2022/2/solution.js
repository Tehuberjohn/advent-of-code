const fs = require("fs");

let input = fs.readFileSync("input.txt", { encoding: "utf-8" });

input = String(input)
  .split("\n")
  .map((ele) => ele.slice(0, 3));

// console.log(input);

function RPS(arr) {
  let value = ["", "rock", "paper", "scissors"];

  const convert = {
    A: "rock",
    X: "rock",
    B: "paper",
    Y: "paper",
    C: "scissors",
    Z: "scissors",
  };

  function checkWin(str1, str2) {
    if (str1 === "rock" && str2 === "paper") return true;
    if (str1 === "paper" && str2 === "scissors") return true;
    if (str1 === "scissors" && str2 === "rock") return true;
    return false;
  }

  let score = 0;
  for (let i = 0; i < arr.length; i++) {
    let [a, b] = String(arr[i]).split(" ");
    a = convert[a];
    b = convert[b];
    if (checkWin(a, b)) {
      score += 6;
    } else if (a === b) {
      score += 3;
    }
    score += value.indexOf(b);
  }
  return score;
}

function RPS2(arr) {
  let value = ["", "rock", "paper", "scissors"];

  const convert = {
    A: "rock",
    B: "paper",
    C: "scissors",
  };

  const convertLose = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  const convertWin = {
    rock: "paper",
    paper: "scissors",
    scissors: "rock",
  };

  function checkWin(str1, str2) {
    if (str1 === "rock" && str2 === "paper") return true;
    if (str1 === "paper" && str2 === "scissors") return true;
    if (str1 === "scissors" && str2 === "rock") return true;
    return false;
  }

  let score = 0;
  for (let i = 0; i < arr.length; i++) {
    let [a, b] = String(arr[i]).split(" ");
    a = convert[a];
    if (b === "X") b = convertLose[a];
    if (b === "Z") b = convertWin[a];
    if (b === "Y") b = a;
    if (checkWin(a, b)) {
      score += 6;
    } else if (a === b) {
      score += 3;
    }
    score += value.indexOf(b);
  }
  return score;
}

console.log(RPS(input));
console.log(RPS2(input));
