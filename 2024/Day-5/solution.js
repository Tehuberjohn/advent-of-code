const fs = require("fs");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
// console.log(data);

const mapPages = (arr) => {
  const map = {};
  for (const line of arr) {
    const [num, before] = line.split("|");
    map[num] ? map[num].push(+before) : (map[num] = [+before]);
  }
  return map;
};

const parseData = (arr) => {
  const pages = [];
  const productRun = [];
  let isPages = true;
  for (const line of arr) {
    if (line === "") {
      isPages = false;
      continue;
    }
    isPages ? pages.push(line) : productRun.push(line.split(",").map(Number));
  }
  const pageMap = mapPages(pages);
  return [pageMap, productRun];
};

const checkPageOrder = (idx, nums, line) => {
  while (idx >= 0) {
    if (nums.includes(line[idx])) {
      return false;
    }
    idx--;
  }
  return true;
};

const findMiddleTotal = (arr) => {
  let total = 0;
  for (const line of arr) {
    const middle = Math.floor(line.length / 2);
    total += line[middle];
  }
  return total;
};

const sortPages = (arr, map) => {
  const sorted = [];
  for (let line of arr) {
    line = line.sort((a, b) => {
      const aMap = map[a] || [];
      if (aMap.includes(b)) {
        return -1;
      }
      return 0;
    });
    sorted.push(line);
  }
  return sorted;
};

const solve = (arr) => {
  const [pageMap, production] = parseData(arr);
  const safeToPrint = [];
  const pagesToSort = [];
  for (const line of production) {
    let wrongPages = line.length - 1;
    for (let i = 1; i < line.length; i++) {
      const pageNum = line[i];
      const isCorrectOrder = checkPageOrder(
        i - 1,
        pageMap[pageNum] || [],
        line
      );
      if (isCorrectOrder) {
        wrongPages--;
      }
    }
    wrongPages === 0 ? safeToPrint.push(line) : pagesToSort.push(line);
  }
  const middleTotal1 = findMiddleTotal(safeToPrint);
  const middleTotal2 = findMiddleTotal(sortPages(pagesToSort, pageMap));
  console.log(`Part One:${middleTotal1} Part Two:${middleTotal2}`);
};
solve(data);
