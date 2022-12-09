import { readText } from '../helpers/readText';

const data = readText('src/day09/data.txt');

type Direction = 'R' | 'U' | 'L' | 'D'
type Pos = number[];

const DIRECTION_MAP = {
  R: [1, 0],
  L: [-1, 0],
  U: [0, -1],
  D: [0, 1],
};

const rope: number[][] = [[0,0], [0,0]];

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

        if (rope[0].some((value, index) => Math.abs(value - rope[1][index]) > 1))
          rope[1] = rope[1].map((value, index) => value + Math.sign(rope[0][index] - value))

        return [...steps, rope[1]];
      }, [])
    return [...visited, ...newSteps];
  }, [])
  .filter((pos, index, list) => {
    return !list.slice(index + 1).some((item) => item[0] === pos[0] && item[1] === pos[1])
  })

console.log(result.length);  
