const fs = require("fs");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
const testData = fs.readFileSync("test.txt").toString().split("\r\n");
// console.log(data);

const parseData = (arr) => {
  const banks = [];
  for (const line of arr) {
    const [x, y, z] = line.split(",").map(Number);
    banks.push([x, y, z]);
  }
  return banks;
};

const calcDistance = ([x0, y0, z0], [x1, y1, z1]) =>
  Math.hypot(x1 - x0, y1 - y0, z1 - z0);

const getDistances = (banks) => {
  const distances = [];
  for (let i = 0; i < banks.length; i++) {
    for (let j = i; j < banks.length; j++) {
      if (i === j) {
        continue;
      }
      const distance = calcDistance(banks[i], banks[j]);
      distances.push([banks[i].join("-"), banks[j].join("-"), distance]);
    }
  }
  return distances.sort((a, b) => a[2] - b[2]);
};

const connectBanks = (banks, start, end, circuits, bankMap, max) => {
  let connectionsMade = 0;
  while (connectionsMade < end) {
    const [bank1, bank2, _] = banks[start];
    start++;
    if (bank1 in bankMap && bank2 in bankMap) {
      if (bankMap[bank1] !== bankMap[bank2]) {
        const circuitIdx = bankMap[bank2];
        const bank1Circuit = circuits[bankMap[bank1]];
        // console.log(bank1Circuit);
        // console.log(circuits[circuitIdx])
        circuits[circuitIdx] = circuits[circuitIdx].concat(bank1Circuit);
        circuits[bankMap[bank1]] = [];
        bank1Circuit.forEach((bank) => {
          bankMap[bank] = circuitIdx;
        });
        // console.log(["seen both", bank1, bank2]);
        // console.log(circuits[circuitIdx]);
        // console.log("----------");
      }
    } else if (bank1 in bankMap || bank2 in bankMap) {
      const isBank1 = bank1 in bankMap;
      const circuitIdx = isBank1 ? bankMap[bank1] : bankMap[bank2];
      circuits[circuitIdx].push(isBank1 ? bank2 : bank1);
      bankMap[isBank1 ? bank2 : bank1] = circuitIdx;
      // console.log([`added to circuit ${circuitIdx}`, isBank1 ? bank2 : bank1]);
      // console.log(circuits[circuitIdx]);
      // console.log("-------------");
    } else {
      circuits.push([bank1, bank2]);
      bankMap[bank1] = circuits.length - 1;
      bankMap[bank2] = circuits.length - 1;
      // console.log(["new circuit", bank1, bank2]);
      // console.log(circuits[circuits.length - 1]);
      // console.log("-------------");
    }
    if (circuits[bankMap[bank1]].length === max) {
      return [bank1, bank2];
    }
    connectionsMade++;
  }
  return [circuits, bankMap];
};

const solve = (arr, connections) => {
  const banks = parseData(arr);
  const distances = getDistances(banks);
  const [circuits, bankMap] = connectBanks(
    distances,
    0,
    connections,
    [],
    {},
    banks.length
  );
  const partOne = circuits.slice(0).sort((a, b) => b.length - a.length);
  const [bank1, bank2] = connectBanks(
    distances,
    connections,
    distances.length,
    circuits,
    bankMap,
    banks.length
  );
  const circuitSum = partOne
    .slice(0, 3)
    .map((arr) => arr.length)
    .reduce((a, b) => a * b, 1);
  const finalX = bank1.split("-")[0] * bank2.split("-")[0];
  console.log(`Part One: ${circuitSum} Part Two: ${finalX}`);
};

solve(testData, 10);
solve(data, 1000);

// Example test input and output
// [162, 817, 812, 425, 690, 689, 316.90219311326956];
// [162, 817, 812, 431, 825, 988, 321.560258738545];
// [906, 360, 560, 805, 96, 715, 322.36935338211043];
// [431, 825, 988, 425, 690, 689, 328.11888089532425];
// [862, 61, 35, 984, 92, 344, 333.6555109690233];
// [52, 470, 668, 117, 168, 530, 338.33858780813046];
// [819, 987, 18, 941, 993, 340, 344.3893145845266];
// [906, 360, 560, 739, 650, 466, 347.59890678769403];
// [346, 949, 466, 425, 690, 689, 350.786259708102];
// [906, 360, 560, 984, 92, 344, 352.936254867646];

// ["862,61,35", "984,92,344", "906,360,560", "805,96,715", "739,650,466"];
// ["162,817,812", "425,690,689", "431,825,988", "346,949,466"];
// ["52,470,668", "117,168,530"];
// ["819,987,18", "941,993,340"];
