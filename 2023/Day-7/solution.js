const fs = require("fs");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
// console.log(data);

class Poker {
  constructor(arr) {
    this.cardValues = {
      2: 1,
      3: 2,
      4: 3,
      5: 4,
      6: 5,
      7: 6,
      8: 7,
      9: 8,
      T: 9,
      J: 10,
      Q: 11,
      K: 12,
      A: 13,
    };
    this.handValues = {
      "High card": 1,
      "One pair": 2,
      "Two pair": 3,
      "Three of a kind": 4,
      "Full house": 5,
      "Four of a kind": 6,
      "Five of a kind": 7,
    };
    this.hands = this.parseData(arr);
  }
  parseData = (arr) => {
    const cards = [];
    for (const line of arr) {
      cards.push(this.buildCard(line.trim()));
    }
    return cards;
  };
  buildCard = (str) => {
    const [hand, wager] = str.split(" ");
    const cardArr = hand.split("");
    const [handType, cards] = this.evalHand(cardArr);
    const card = {
      hand: cardArr,
      handType,
      cards,
      wager: Number(wager),
    };
    return card;
  };
  evalHand = (arr) => {
    const map = this.mapCards(arr);
    const unique = [...new Set(arr)];
    let pairs = 0;
    let highest = 0;
    for (const card of unique) {
      if (map[card] > 1) {
        pairs++;
      }
      if (map[card] > highest) {
        highest = map[card];
      }
    }
    const handType = this.getHandType(highest, pairs > 1);
    return [
      handType,
      unique.sort((a, b) => {
        if (map[a] === map[b]) {
          return this.cardValues[b] - this.cardValues[a];
        } else {
          return map[b] - map[a];
        }
      }),
    ];
  };
  mapCards = (arr) => {
    const map = {};
    for (const card of arr) {
      card in map ? map[card]++ : (map[card] = 1);
    }
    return map;
  };
  getHandType(highest, multiplePairs) {
    switch (highest) {
      case 5:
        return "Five of a kind";
        break;
      case 4:
        return "Four of a kind";
        break;
      case 3:
        return multiplePairs ? "Full house" : "Three of a kind";
        break;
      case 2:
        return multiplePairs ? "Two pair" : "One pair";
        break;
      default:
        return "High card";
        break;
    }
  }
  sortHands() {
    const sortAlgo = (a, b) => {
      if (a.handType === b.handType) {
        for (let i = 0; i < 5; i++) {
          if (a.hand[i] !== b.hand[i]) {
            return this.cardValues[a.hand[i]] - this.cardValues[b.hand[i]];
          }
        }
        console.log(["missed", a.hand, b.hand]); //catch dupe hands
      }
      return this.handValues[a.handType] - this.handValues[b.handType];
    };
    this.hands.sort(sortAlgo);
  }
}

const game = new Poker(data);

const solve = () => {
  game.sortHands();
  let rank = 1;
  let score = 0;
  for (const hand of game.hands) {
    score += hand.wager * rank;
    rank++;
  }
  console.log(`Part One:${score}`);
};
solve();
