const fs = require("fs");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
// console.log(data);

class Almanac {
  constructor(data) {
    this.rawData = this.parseData(data);
    this.seeds = this.formatNumArr(this.rawData[0]);
    this.pages = this.rawData[1].map(this.formatPageData);
  }
  parseData = () => {
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
    const pages = sets.slice(1);
    return [seeds, pages];
  };
  formatPageData = (arr) => {
    const name = arr[0].split(" ")[0];
    const [from, to] = name.split("-to-");
    const values = [];
    for (const line of arr.slice(1)) {
      const [destinationRangeStart, sourceRangeStart, rangeLength] =
        this.formatNumArr(line);
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
  formatNumArr = (str) => {
    return str.split(" ").map(Number);
  };
}

const lookupSeedLocation = (num, values) => {
  for (const value of values) {
    const min = value.sourceRangeStart;
    const max = value.sourceRangeStart + value.rangeLength;
    if (num >= min && num <= max) {
      const offset = num - min;
      return value.destinationRangeStart + offset;
    }
  }
  return num;
};

const getSeeds = (arr) => {};

const almanac = new Almanac(data);
const solve = (book, part) => {
  const seeds = part === "one" ? book.seeds : getSeeds(book.seeds);
  const locations = [];
  for (const seed of seeds) {
    let location = seed;
    for (const page of book.pages) {
      location = lookupSeedLocation(location, page.values);
    }
    locations.push(location);
  }
  console.log(`Part ${part}: ${Math.min(...locations)}`);
};
solve(almanac, "one");
