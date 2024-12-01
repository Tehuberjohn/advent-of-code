const fs = require("fs");

const data = fs.readFileSync("input.txt").toString().split("\r\n");
// console.log(data);

class Poker {
  constructor(arr) {
    this.cardValues = {
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      T: 10,
      J: 12,
      Q: 13,
      K: 14,
      A: 15,
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
    this.isJokerDeck = false;
    this.hands = this.parseData(arr);
  }
  parseData(arr) {
    const cards = [];
    for (const line of arr) {
      cards.push(this.buildCard(line.trim()));
    }
    return cards;
  }
  buildCard(str) {
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
  }
  evalHand(arr) {
    const map = this.mapCards(arr);
    const unique = [...new Set(arr)];
    let pairs = [];
    let highest = 0;
    let jokers = 0;
    for (const card of unique) {
      const isJoker = this.isJokerDeck && card === "J";
      if (map[card] > 1) {
        isJoker ? (jokers += map[card]) : pairs.push(card);
      }
      if (map[card] > highest && !isJoker) {
        highest = map[card];
      }
    }
    if (this.isJokerDeck && jokers.length) {
      pairs.sort((a, b) => map[a] - map[b]);
      highest += jokers;
    }
    const handType = this.getHandType(highest, pairs.length > 1);
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
  }
  mapCards(arr) {
    const map = {};
    for (const card of arr) {
      card in map ? map[card]++ : (map[card] = 1);
    }
    return map;
  }
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
  game.isJokerDeck = true;
  game.hands = game.parseData(data);
  game.sortHands();
  rank = 1;
  score = 0;
  for (const hand of game.hands) {
    score += hand.wager * rank;
    rank++;
  }
  console.log(`Part One:${score}`);
};
solve();
