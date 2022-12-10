const fs = require("fs");
const data = fs.readFileSync("input.txt").toString().split("\r\n");

function getPriority(arr) {
  const value = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let groupOfThree = [];
  let partOne = 0;
  let partTwo = 0;

  const getValue = (item) => value.indexOf(item);

  function checkSack(str) {
    const middle = Math.floor(str.length / 2);
    const front = str.slice(0, middle);
    const back = str.slice(middle);
    return [...front].filter((l) => back.includes(l))[0];
  }

  function evalGroupOfThree(arr) {
    let checked = [...arr[0]].filter((l) => arr[1].includes(l));
    checked = [...checked].filter((l) => arr[2].includes(l));
    return checked[0];
  }

  for (let i = 0; i < arr.length; i++) {
    groupOfThree.push(arr[i]);
    if (groupOfThree.length === 3) {
      partTwo += getValue(evalGroupOfThree(groupOfThree));
      groupOfThree = [];
    }
    partOne += getValue(checkSack(arr[i]));
  }
  return `Part one:${partOne} Part two:${partTwo}`;
}

console.log(getPriority(data));
