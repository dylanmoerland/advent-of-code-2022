import { readText } from '../helpers/readText';

const data = readText('src/day02/data.txt')

const calculateOutcome = ([opponent, you] : [number, number]): number => {
  if (you === opponent) return 3;

  switch (you) {
    case 1:
      return opponent === 3 ? 6 : 0
    case 2:
        return opponent === 1 ? 6 : 0
    case 3:
        return opponent === 2 ? 6 : 0
  }

  return 0;
}

const VALUE_MAP = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3
};

type RoundMap = [keyof typeof VALUE_MAP, keyof typeof VALUE_MAP];

const resolveRound = ([opponent, strategy]: RoundMap): RoundMap => {
  switch (strategy) {
    case 'Z':
      switch (opponent) {
        case 'A':
          return [opponent, 'B'];
        case 'B':
            return [opponent, 'C'];
        case 'C':
            return [opponent, 'A'];
      }
      break;
    case 'X':
      switch (opponent) {
        case 'A':
          return [opponent, 'C'];
        case 'B':
            return [opponent, 'A'];
        case 'C':
            return [opponent, 'B'];
      }
      break;
  }
  return [opponent, opponent];
}

const totalPoints = data
  .split("\n")
  .map((round) => {
    const [opponent, strategy] = round.split(" ") as [keyof typeof VALUE_MAP, keyof typeof VALUE_MAP];
    return resolveRound([opponent, strategy]);
  })
  .map<[number, number]>(([opponent, you]) => [
    VALUE_MAP[opponent],
    VALUE_MAP[you]
  ])
  .reduce<number>((total, [opponent, you], test, list) => {
    return total + calculateOutcome([opponent, you]) + you;
  }, 0);

console.log(totalPoints);