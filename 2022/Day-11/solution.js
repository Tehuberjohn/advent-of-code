const fs = require("fs");

const data = fs.readFileSync("input.txt").toString().split("Monkey");
data.shift();
// console.log(data);

const operators = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "/": (x, y) => x / y,
  "*": (x, y) => x * y,
};

const divisors = [];

let monkeys = [];
function mapMonkeys(data) {
  const studyMonkey = (arr) => {
    const ifTrue = +arr[4].slice(-1);
    const ifFalse = +arr[5].slice(-1);
    const testDiv = +arr[3].split(" ").pop();
    divisors.push(+testDiv);
    const monkey = {
      id: parseInt(arr[0]),
      items: arr[1]
        .split("Starting items:")[1]
        .split(",")
        .map((num) => +num),
      operation: arr[2]
        .split(" ")
        .slice(-2)
        .map((ele) => +ele || ele),
      test: (num) => (num % testDiv === 0 ? ifTrue : ifFalse),
      inspects: 0,
    };
    monkeys.push(monkey);
  };

  for (let i = 0; i < data.length; i++) {
    const arr = data[i].split("\r\n");
    studyMonkey(arr);
  }
}

function keepAway(arr, part) {
  const prod = divisors.reduce((acc, c) => acc * c, 1);

  const inspectItem = (monkey) => {
    let item;
    if (part === "one") {
      item = monkey.items.pop();
    } else if (part === "two") {
      item = monkey.items.pop() % prod;
    }
    let [operator, opVal] = monkey.operation;
    if (opVal === "old") opVal = item;
    const operation = operators[operator];
    if (part === "one") {
      return Math.floor(operation(item, opVal) / 3);
    } else if (part === "two") {
      return Math.floor(operation(item, opVal));
    }
  };

  const throwItem = (arr, monkey) => {
    const passedMonkey = monkey.test(item);
    arr[passedMonkey].items.push(item);
  };

  const roundOfMonkeys = () => {
    for (let i = 0; i < arr.length; i++) {
      const current = arr[i];
      const held = current.items.length;
      for (let j = 0; j < held; j++) {
        item = inspectItem(current);
        throwItem(arr, current);
        current.inspects++;
      }
    }
  };

  if (part === "one") {
    for (let i = 0; i < 20; i++) {
      roundOfMonkeys();
    }
  } else if (part === "two") {
    for (let i = 0; i < 10000; i++) {
      roundOfMonkeys();
    }
  }

  let totals = [];
  for (const monkey of arr) {
    totals.push(monkey.inspects);
  }

  totals = totals
    .sort((a, b) => a - b)
    .slice(-2)
    .reduce((acc, c) => acc * c, 1);
  console.log(`Part ${part}: ${totals}`);
}

mapMonkeys(data);
// keepAway(monkeys, "one");
keepAway(monkeys, "two");
//havent made it so the data doesnt get mutated, just run one at a time to get the answer
