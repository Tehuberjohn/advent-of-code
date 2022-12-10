const fs = require("fs");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
console.log(data);
