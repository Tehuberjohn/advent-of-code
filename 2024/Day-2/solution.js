const fs = require("fs");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
// console.log(data);
const parseData = (arr) => {
  const reports = [];
  for (const line of arr) {
    const levels = line.split(" ").map(Number);
    reports.push(levels);
  }
  return reports;
};

const isSafeLevels = (levels) => {
  const isAccending = levels[0] < levels.slice(-1);
  if (!isAccending) {
    levels = levels.reverse();
  }
  let last = levels[0];
  for (let i = 1; i < levels.length; i++) {
    const current = levels[i];
    const isInvalid = current - last > 3 || last == current;
    if (isInvalid) {
      return false;
    }
    last = current;
  }
  return true;
};

const isValidReport = (arr) => {
  const isAccending = arr[0] < arr.slice(-1);
  const sorted = arr
    .slice(0)
    .sort((a, b) => (isAccending ? a - b : b - a))
    .join("");
  return arr.join("") === sorted;
};

const problemDampener = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let newReport = arr.slice(0);
    newReport.splice(i, 1);
    if (isValidReport(newReport)) {
      if (isSafeLevels(newReport)) {
        return true;
      }
    }
  }
  return false;
};

const solve = (arr) => {
  const reports = parseData(arr);
  let safeReports = 0;
  let savedReports = 0;
  for (const report of reports) {
    const isValid = isValidReport(report);
    const isSafeReport = isSafeLevels(report);
    if (isValid && isSafeReport) {
      safeReports++;
    } else {
      if (problemDampener(report)) {
        savedReports++;
      }
    }
  }
  console.log(
    `Part One: ${safeReports} Part Two: ${safeReports + savedReports}`
  );
};

solve(data);
