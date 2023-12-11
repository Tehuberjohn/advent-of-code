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

const getSeedRanges = (arr) => {
  const pairs = [];
  for (let i = 0; i < arr.length; i += 2) {
    const start = arr[i];
    const range = arr[i + 1];
    pairs.push([start, range]);
  }
  return pairs;
};

const solveOne = (book) => {
  const seeds = book.seeds;
  const locations = [];
  for (const seed of seeds) {
    let location = seed;
    for (const page of book.pages) {
      location = lookupSeedLocation(location, page.values);
    }
    locations.push(location);
  }
  console.log(`Part One: ${Math.min(...locations)}`);
};

const solveTwo = (book) => {
  const seeds = getSeedRanges(book.seeds);
  const locations = [];
  for (const seed of seeds) {
    let smallest = Number.MAX_SAFE_INTEGER;
    while (seed[1]) {
      let location = seed[0];
      for (const page of book.pages) {
        location = lookupSeedLocation(location, page.values);
      }
      if (location < smallest) {
        smallest = location;
      }
      seed[0]++;
      seed[1]--;
    }
    locations.push(smallest);
  }
  console.log(`Part Two: ${Math.min(...locations) - 1}`);
};
const almanac = new Almanac(data);
solveOne(almanac);
solveTwo(almanac);
