const fs = require("fs");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
// console.log(data);

let screen = [
  ".".repeat(40).split(""),
  ".".repeat(40).split(""),
  ".".repeat(40).split(""),
  ".".repeat(40).split(""),
  ".".repeat(40).split(""),
  ".".repeat(40).split(""),
];

function CRTmonitor(input) {
  let sprite = "###.....................................";
  let count = 0;
  let screenPos = [0, 0];
  let registerX = 1;
  let signal = 0;

  const drawSprite = (idx) => {
    let blank = " ".repeat(40).split("");
    blank.splice(Math.max(idx, 0), 3, "#", "#", "#"); //pixels 202 and 203 arent rendering correctly, will refactor later
    sprite = blank.join("");
  };

  const renderPixel = () => {
    const [y, x] = screenPos;
    const pixel = sprite[x];
    screen[y][x] = pixel;
  };

  const checkCycle = (cmd, num) => {
    const process = {
      noop: 1,
      addx: 2,
    };
    for (let i = 0; i < process[cmd]; i++) {
      count++;
      renderPixel();
      //pixels take the correct sprite so maybe it is intentional?
      if (count === 202) console.log([screenPos, registerX, sprite]);
      if (count === 203) console.log([screenPos, registerX, sprite]);
      screenPos[1]++;
      if (count % 40 === 20) {
        signal += count * registerX;
      }
      if (screenPos[1] === 40) {
        screenPos[0]++;
        screenPos[1] = 0;
      }
    }
    registerX += num;
    drawSprite(registerX - 1);
  };

  for (let i = 0; i < input.length; i++) {
    let [cmd, num] = input[i].split(" ").map((ele) => +ele || ele);
    if (num == null) num = 0;
    checkCycle(cmd, num);
  }
  console.log(`Part One: ${signal}`);
  return screen.map((arr) => arr.join(""));
}

console.log(CRTmonitor(data));
