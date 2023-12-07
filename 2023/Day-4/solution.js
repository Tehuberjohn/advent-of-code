const fs = require("fs");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
// console.log(data);

const formatNums = (str) => {
  const nums = str.split(" ").filter((num) => num);
  return nums.map((num) => +num).sort();
};

const mapArr = (arr) => {
  const map = {};
  for (const num of arr) {
    num in map ? map[num]++ : (map[num] = 1);
  }
  return map;
};

const buildCards = (input) => {
  const cards = [];
  for (const line of input) {
    const [card, numbers] = line.split(":");
    const cardNum = card.slice(5).trim();
    const [winner, player] = numbers.split("|");
    cards.push({
      number: +cardNum,
      numOfCards: 1,
      wins: 0,
      score: 0,
      playerNums: formatNums(player),
      winningNums: mapArr(formatNums(winner)),
    });
  }
  return cards;
};
const deck = buildCards(data);

const findCardScore = (num) => {
  let score = 0;
  while (num) {
    score === 0 ? (score = 1) : (score = score + score);
    num--;
  }
  return score;
};

const addBonusCards = (card) => {
  for (let i = 0; i < card.wins; i++) {
    deck[card.number + i].numOfCards += card.numOfCards;
  }
};

const readCard = (card) => {
  for (const num of card.playerNums) {
    if (num in card.winningNums) {
      card.wins++;
    }
  }
  card.score = findCardScore(card.wins);
  addBonusCards(card);
};

const solve = (arr) => {
  let scoreTotal = 0;
  let cardTotal = 0;
  for (const card of arr) {
    readCard(card);
    scoreTotal += card.score;
    cardTotal += card.numOfCards;
  }
  console.log(`Part One: ${scoreTotal} Part Two: ${cardTotal}`);
};
solve(deck);
