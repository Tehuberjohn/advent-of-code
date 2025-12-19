const fs = require("fs");
const { get } = require("http");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
const testData = fs.readFileSync("test.txt").toString().split("\r\n");
// console.log(data);

const parseData = (arr) => {
  const tiles = [];
  const seenRows = {};
  const seenCols = {};
  const rows = [];
  const cols = [];
  for (const line of arr) {
    const [col, row] = line.split(",").map(Number);
    tiles.push([col, row]);
    if (!seenRows[row]) {
      seenRows[row] = true;
      rows.push(row);
    }
    if (!seenCols[col]) {
      seenCols[col] = true;
      cols.push(col);
    }
  }
  return [tiles, rows, cols];
};

const getNewIndex = (arr) => {
  const newIndex = {};
  arr.sort((a, b) => b - a);
  let i = -1;
  let last = null;
  while (arr.length > 0) {
    const current = arr.pop();
    if (last === null || current === last + 1) {
      i++;
    } else {
      i += 2;
    }
    newIndex[current] = i;
    last = current;
  }
  return [newIndex, i + 1];
};

const addGridBoundaries = (compressedGrid) => {
  //add left and right boundaries
  for (let i = 0; i < compressedGrid.length; i++) {
    let inBoundsLeft = false;
    let inBoundsRight = false;
    for (let j = 0; j < compressedGrid[i].length; j++) {
      const left = compressedGrid[i][j];
      const right = compressedGrid[i][compressedGrid[i].length - j];
      if (left === "#") {
        inBoundsLeft = true;
      }
      if (right === "#") {
        inBoundsRight = true;
      }
      if (inBoundsLeft && inBoundsRight) {
        break;
      }
      if (!inBoundsLeft) {
        compressedGrid[i][j] = "X";
      }
      if (!inBoundsRight) {
        compressedGrid[i][compressedGrid[i].length - j] = "X";
      }
    }
  }
  //add top and bottom boundaries
  for (let i = 0; i < compressedGrid[0].length; i++) {
    let inBoundsTop = false;
    let inBoundsBottom = false;
    for (let j = 0; j < compressedGrid.length; j++) {
      let top = compressedGrid[j][i];
      let bottom = compressedGrid[compressedGrid.length - j - 1][i];
      if (top === "#") {
        inBoundsTop = true;
      }
      if (bottom === "#") {
        inBoundsBottom = true;
      }
      if (inBoundsTop && inBoundsBottom) {
        break;
      }
      if (!inBoundsTop) {
        compressedGrid[j][i] = "X";
      }
      if (!inBoundsBottom) {
        compressedGrid[compressedGrid.length - j - 1][i] = "X";
      }
    }
  }
  return compressedGrid;
};

const getCompressedGrid = (tiles, rowMap, rowLength, colMap, colLength) => {
  tiles = tiles.map((tile) => [colMap[tile[0]], rowMap[tile[1]]]);
  let compressedGrid = Array(rowLength)
    .fill()
    .map((_) => Array(colLength).fill("."));
  let last = tiles[tiles.length - 1];
  for (const tile of tiles) {
    let [col, row] = tile;
    compressedGrid[row][col] = "#";
    while (row !== last[1] || col !== last[0]) {
      if (row !== last[1]) {
        row > last[1] ? row-- : row++;
      }
      if (col !== last[0]) {
        col > last[0] ? col-- : col++;
      }
      compressedGrid[row][col] = "#";
    }
    last = tile;
  }
  compressedGrid = addGridBoundaries(compressedGrid);
  const img = compressedGrid.map((row) => row.join(" ")).join("\n");
  return [compressedGrid, img];
};

const isValidSquare = (tileA, tileB, compressedGrid, rowMap, colMap) => {
  const [colA, rowA] = [colMap[tileA[0]], rowMap[tileA[1]]];
  const [colB, rowB] = [colMap[tileB[0]], rowMap[tileB[1]]];
  for (let i = Math.min(rowA, rowB); i <= Math.max(rowA, rowB); i++) {
    const sliceStart = Math.min(colA, colB);
    const sliceEnd = Math.max(colA, colB) + 1;
    const slice = compressedGrid[i].slice(sliceStart, sliceEnd);
    if (slice.includes("X")) {
      return false;
    }
  }
  return true;
};

const solve = (arr) => {
  const [tiles, rows, cols] = parseData(arr);
  const [rowMap, rowLength] = getNewIndex(rows);
  const [colMap, colLength] = getNewIndex(cols);
  const [compressedGrid, img] = getCompressedGrid(
    tiles,
    rowMap,
    rowLength,
    colMap,
    colLength
  );
  const posibleSquares = [];
  let highestSquare = null;
  let highestConfinedSquare = null;
  for (let i = 0; i < tiles.length; i++) {
    let current = tiles[i];
    for (let j = i + 1; j < tiles.length; j++) {
      const height = Math.abs(tiles[j][1] - current[1]) + 1;
      const width = Math.abs(tiles[j][0] - current[0]) + 1;
      const square = height * width;
      posibleSquares.push({
        points: [current, tiles[j]],
        area: square,
      });
      if (highestSquare === null || square > highestSquare) {
        highestSquare = square;
      }
      // console.log(current, tiles[j]);
    }
  }
  posibleSquares.sort((a, b) => a.area - b.area);
  // console.log(img);
  while (true) {
    const current = posibleSquares.pop();
    // console.log(current);
    if (
      isValidSquare(
        current.points[0],
        current.points[1],
        compressedGrid,
        rowMap,
        colMap
      )
    ) {
      highestConfinedSquare = current.area;
      break;
    }
  }
  // try {
  //   fs.writeFileSync(
  //     "/advent-of-code/2025/Day-09/image.txt",
  //     img
  //   );
  //   // file written successfully
  // } catch (err) {
  //   console.error(err);
  // }
  console.log(`Part One: ${highestSquare} Part Two: ${highestConfinedSquare}`);
};

// solve(testData);
solve(data);
