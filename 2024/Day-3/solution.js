const fs = require("fs");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
// console.log(data);

const isValidFunction = (str) => {
  const map = {};
  const valid = [..."0123456789,"].map((char) => (map[char] = true));
  let current = "";
  let i = 1;
  while (str[i] !== ")") {
    if (!map[str[i]]) {
      return [false, null];
    }
    current += str[i];
    i++;
  }
  if (current.length < 3) {
    return [false, null];
  }
  return [true, current];
};

const solve = (arr) => {
  let total = 0;
  for (const line of arr) {
    const funcs = line.split("mul");
    for (const func of funcs) {
      if (func.startsWith("(")) {
        let [isFunc, args] = isValidFunction(func);
        if (isFunc) {
          args = args.split(",").map(Number);
          total += args[0] * args[1];
        }
      }
    }
  }
  return total;
};

const parseFunctions = (arr) => {
  const functions = [];
  for (const line of arr) {
    for (let i = 0; i < line.length; i++) {
      if (line.startsWith("don't()", i)) {
        functions.push("dont");
        i += 5;
        continue;
      }
      if (line.startsWith("do()", i)) {
        functions.push("do");
        i += 3;
        continue;
      }
      if (line.startsWith("mul", i)) {
        let [isFunc, args] = isValidFunction(line.slice(i + 3));
        if (isFunc) {
          const nums = args.split(",").map(Number);
          functions.push(nums);
          i += args.length;
        }
      }
    }
  }
  return functions;
};

const solve2 = (arr) => {
  const functions = parseFunctions(arr);
  let isCounting = true;
  let total = 0;
  for (const func of functions) {
    if (func === "do") {
      isCounting = true;
    } else if (func == "dont") {
      isCounting = false;
    } else {
      total += isCounting ? func[0] * func[1] : 0;
    }
  }
  return total;
};

console.log(`Part One: ${solve(data)} Part Two: ${solve2(data)}`);
