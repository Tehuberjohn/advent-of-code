const fs = require("fs");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
// console.log(data);

function createTree(lines) {
  //tree contents: name, directory, size, children, parent
  const tree = {
    name: "/",
    isDirectory: true,
    children: [],
  };

  let currentNode = tree;
  let currentCommand = null;
  let currentArgument = null;

  const navigate = (arg) => {
    if (arg === "/") {
      currentNode = tree;
    } else if (arg === "..") {
      currentNode = currentNode.parent;
    } else {
      currentNode = currentNode.children.find(
        (folder) => folder.isDirectory && folder.name === arg
      );
    }
  };

  const createNode = (arg) => {
    if (arg !== "$ ls") {
      if (arg.slice(0, 3) === "dir") {
        const [_, name] = arg.split(" ");

        const node = {
          name: name,
          isDirectory: true,
          children: [],
          parent: currentNode,
        };
        currentNode.children.push(node);
      } else {
        const [size, name] = arg.split(" ");

        const node = {
          name: name,
          isDirectory: false,
          size: +size,
        };
        currentNode.children.push(node);
      }
    }
  };

  for (const line of lines) {
    if (line[0] === "$") {
      const [_, command, argument] = line.split(" ");
      currentCommand = command;
      currentArgument = argument;
    }

    if (currentCommand === "cd") {
      navigate(currentArgument);
    } else if (currentCommand === "ls") {
      createNode(line);
    } else {
      throw new Error("somthing went wrong");
    }
  }
  return tree;
}

function printTree(node, depth = 0) {
  console.log(
    `${" ".repeat(depth * 2)}- ${node.name} (${
      node.isDirectory ? "dir" : `file, size=${node.size}`
    })`
  );
  if (node.isDirectory) {
    for (const child of node.children) {
      printTree(child, depth + 1);
    }
  }
} //only used to check file structure on test case

function getSize(node, directoryCallback = () => {}) {
  if (!node.isDirectory) {
    return node.size;
  }
  const directorySize = node.children
    .map((child) => getSize(child, directoryCallback))
    .reduce((a, b) => a + b, 0);

  directoryCallback(node.name, directorySize);

  return directorySize;
}

function part1() {
  const thresholdSize = 100000;
  const tree = createTree(data);

  // printTree(tree);

  let sumSmallFolder = 0;

  getSize(tree, (name, size) => {
    if (size < thresholdSize) {
      sumSmallFolder += size;
    }
  });

  console.log(sumSmallFolder);
}

function part2() {
  const totalDiskSpace = 70000000;
  const requiredSpace = 30000000;

  const tree = createTree(data);

  const usedSpace = getSize(tree);
  const availableSpace = totalDiskSpace - usedSpace;
  if (availableSpace > requiredSpace) {
    throw new Error("Already enough space");
  }
  const minimumFolderSize = requiredSpace - availableSpace;

  const candidates = [];

  getSize(tree, (name, size) => {
    if (size >= minimumFolderSize) {
      candidates.push({
        name,
        size,
      });
    }
  });

  candidates.sort((a, b) => a.size - b.size);

  console.log(candidates[0].size);
}

part1();
part2();
