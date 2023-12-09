const fs = require("fs");

const data = fs.readFileSync("sample.txt").toString().split("\r\n");
// console.log(data);

const formatNums = (str) => str.split(" ").map(Number);

const formatMapData = (arr) => {
  const name = arr[0].split(" ")[0];
  const [from, to] = name.split("-to-");
  const values = [];
  for (const line of arr.slice(1)) {
    const [destinationRangeStart, sourceRangeStart, rangeLength] =
      formatNums(line);
    values.push({
      destinationRangeStart,
      sourceRangeStart,
      rangeLength,
    });
  }
  return {
    from,
    to,
    values,
  };
};

const parseData = () => {
  const sets = [];
  let current = [];
  for (const line of data) {
    if (!line) {
      sets.push(current);
      current = [];
    } else {
      current.push(line);
    }
  }
  sets.push(current);
  const seeds = sets[0][0].split(":")[1].trim();
  const maps = sets.slice(1);
  return [formatNums(seeds), maps.map(formatMapData)];
};

let [seeds, maps] = parseData();
console.log([maps[0], maps[0].values]);
const solve = () => {};
//parsed data and tried afew tests to try and understand the problem, will work on figuring out what im even doing later XD
