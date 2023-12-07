const fs = require("fs");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
// console.log(data);

const formatNums = (str) => {
  const nums = str.split(" ").filter((num) => num);
  return nums.map((num) => +num).sort();
};

const buildCards = (input) => {
  const cards = [];
  for (const line of input) {
    const [card, numbers] = line.split(":");
    const cardNum = card.split(" ")[1];
    const [winner, player] = numbers.split("|");
    cards.push({
      number: +cardNum,
      numOfCards: 1,
      playerNums: formatNums(player),
      winningNums: formatNums(winner),
    });
  }
  return cards;
};
const deck = buildCards(data);

const mapArr = (arr) => {
  const map = {};
  for (const num of arr) {
    num in map ? map[num]++ : (map[num] = 1);
  }
  return map;
};

const findCardWorth = (num) => {
  let score = 0;
  while (num) {
    score === 0 ? (score = 1) : (score = score + score);
    num--;
  }
  return score;
};

const addBonusCards = (cardNum, number, copies) => {
  for (let i = 0; i < number; i++) {
    deck[cardNum + i].numOfCards += copies;
  }
};

const scoreCard = (card) => {
  const winners = mapArr(card.winningNums);
  let matches = 0;
  for (const num of card.playerNums) {
    if (num in winners) {
      matches++;
    }
  }
  addBonusCards(card.number, matches, card.numOfCards);
  return findCardWorth(matches);
};

const solve = (arr) => {
  let scoreTotal = 0;
  let cardTotal = 0;
  for (const card of arr) {
    let score = scoreCard(card);
    scoreTotal += score;
    cardTotal += card.numOfCards;
    console.log(card.numOfCards);
  }
  console.log([scoreTotal, cardTotal]);
};
solve(deck);
