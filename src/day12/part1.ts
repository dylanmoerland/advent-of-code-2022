import { readText } from '../helpers/readText';

const data = readText('src/day12/data.txt');

const grid = data
  .split('\n')
  .map((line) => line.split(''));

let end: Coords;
const matrix = grid.reduce<number[][]>((accumulator, row, y) => {
  return [
    ...accumulator,
    row.map((_, x) => {
      if (grid[y][x] === 'E') {
        end = [x, y];
      }
      if (grid[y][x] === 'S') return 1;
      else return 0;
    })
  ];
}, []);


type Coords = [number, number];

const getValueFromCoords = ([ x, y ]: Coords): number => {
  if (grid[y][x] === 'E') return 27;
  if (grid[y][x] === 'S') return 0;
  return grid[y][x].charCodeAt(0) - 96
}

const canMoveTo = (from: Coords, to: Coords) => {
  if (matrix[to[1]]?.[to[0]] !== 0) return false;

  return getValueFromCoords(from) - getValueFromCoords(to) >= -1;
}

const DIRECTION_LIST = [
  [1, 0],
  [-1, 0],
  [0, -1],
  [0, 1],
];

const makeStep = (step: number) => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x= 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === step) {
        DIRECTION_LIST.forEach(([xDir, yDir]) => {
          if (canMoveTo([x,y], [x + xDir, y + yDir])) {
            matrix[y + yDir][x + xDir] = step + 1;
          }
        })
      } 
    }
  }
}

let step = 0;
while (matrix[end[1]][end[0]] === 0) {
  step += 1;
  makeStep(step);
}

const getPath = () => {
  let [ x, y ] = end;
  const path = [{ x, y }];
  let value = matrix[y][x];

  while (value > 1) {
    DIRECTION_LIST.forEach(([xDir, yDir]) => {
      if (matrix[y + yDir]?.[x + xDir] === value - 1) {
        y += yDir;
        x += xDir;
        path.push({ x, y });
        value -= 1;
      }
    })
  }
  return path;
}

console.log(getPath().length - 1)