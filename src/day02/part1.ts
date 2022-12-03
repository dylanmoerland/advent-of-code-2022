import { readText } from '../helpers/readText';

const data = readText('src/day02/data.txt')

const VALUE_MAP = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3
};

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

const result = data
  .split("\n")
  .map<[keyof typeof VALUE_MAP, keyof typeof VALUE_MAP]>(
    (round) =>
      round.split(" ") as [keyof typeof VALUE_MAP, keyof typeof VALUE_MAP]
  )
  .map<[number, number]>(([opponent, you]) => [
    VALUE_MAP[opponent],
    VALUE_MAP[you]
  ])
  .reduce<number>((total, [opponent, you]) => {
    return total + calculateOutcome([opponent, you]) + you;
  }, 0);

console.log(result);