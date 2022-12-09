import { readText } from '../helpers/readText';

const data = readText('src/day09/data.txt');

type Direction = 'R' | 'U' | 'L' | 'D'
type Pos = number[];

const DIRECTION_MAP: Record<Direction, Pos> = {
  R: [1, 0],
  L: [-1, 0],
  U: [0, -1],
  D: [0, 1],
};

let rope: number[][] = new Array(10).fill([0, 0]);

const result = data
  .split('\n')
  .map<[Direction, number]>((line) => {
    const [direction, steps] = line.split(' ');
    return [direction as Direction, parseInt(steps, 10)]
  })
  .reduce<Pos[]>((visited, [direction, steps]) => {
    const newSteps = new Array(steps)
      .fill(direction)
      .reduce<Pos[]>((steps, step) => {
        rope[0] = rope[0].map((value, index) => value + DIRECTION_MAP[step][index]);

        for (let i = 1; i < 10; i++) {
          if (rope[i-1].some((value, index) => Math.abs(value - rope[i][index]) > 1)) {
            rope[i] = rope[i].map((value, index) => value + Math.sign(rope[i - 1][index] - value))
          }
        }

        return [...steps, rope[9]];
      }, [])
    return [...visited, ...newSteps];
  }, [])
  .filter((pos, index, list) => {
    return !list.slice(index + 1).some((item) => item[0] === pos[0] && item[1] === pos[1])
  })

console.log(result.length);  
