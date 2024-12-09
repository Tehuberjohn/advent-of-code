const fs = require("fs");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
// console.log(data)

const parseData = (str) => {
  let files = [];
  let fileSystem = [];
  let num = 0;
  for (let i = 0; i < str.length; i += 2) {
    let file = [];
    for (let j = 0; j < str[i]; j++) {
      fileSystem.push(num);
      file.push(num);
    }
    if (file.length) {
      files.push(file);
    }
    file = [];
    for (let k = 0; k < str[i + 1]; k++) {
      fileSystem.push(".");
      file.push(".");
    }
    if (file.length) {
      files.push(file);
    }
    num++;
  }
  return [fileSystem, files];
};

const checksum = (arr) => {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== ".") {
      total += arr[i] * i;
    }
  }
  return total;
};

const solve1 = (str) => {
  const [fileSystem, _] = parseData(str);
  let x = 0;
  let y = fileSystem.length - 1;
  while (x <= y) {
    const isValidX = fileSystem[x] === ".";
    const isValidY = fileSystem[y] !== ".";
    if (!isValidX) {
      x++;
    }
    if (!isValidY) {
      y--;
    }
    if (isValidX && isValidY) {
      const temp = fileSystem[x];
      fileSystem[x] = fileSystem[y];
      fileSystem[y] = temp;
      x++;
      y--;
    }
  }
  const total = checksum(fileSystem);
  console.log(total);
};

const solve2 = (str) => {
  let [_, files] = parseData(str);
  const seen = {};
  for (let i = files.length - 1; i >= 0; i--) {
    let current = files[i];
    if (current[0] !== ".") {
      for (let j = 0; j < files.length - 1; j++) {
        let target = files[j];
        if (current[0] === target[0] || seen[current[0]]) {
          break;
        }
        if (target[0] === "." && target.length >= current.length) {
          const dif = target.length - current.length;
          const emptySpace = Array(current.length).fill(".");
          files[j] = current;
          files[i] = emptySpace;
          seen[current[0]] = true;
          if (target.length > current.length) {
            files.splice(j + 1, 0, Array(dif).fill("."));
            i++;
          }
          break;
        }
      }
    }
  }
  const fileSystem = files.map((arr) => arr.join("")).join("");

  const total = checksum(fileSystem);
  console.log(total);
};

solve1(data[0].slice());
solve2(data[0]);

//working on part 2 sample, not input, will have to step through and see where it is going wrong.
