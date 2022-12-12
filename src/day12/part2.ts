import { readText } from '../helpers/readText';

const data = readText('src/day12/data.txt');

type Coords = [number, number]

const grid = data
  .split('\n')
  .map((line) => line.split(''));

const startingPositions = grid.reduce<Coords[]>((coords, row, y) => {
  return [
    ...coords,
    ...row.reduce<Coords[]>((rowCoords, column, x) => {
      if (column === 'a') rowCoords.push([x, y]);
      return rowCoords
    }, []),
  ];
}, []);

const buildMatrix = ([startX, startY]: Coords) => {
  return grid.reduce<number[][]>((accumulator, row, y) => {
    return [
      ...accumulator,
      row.map((_, x) => {
        if (x === startX && y === startY) return 1;
        else return 0;
      })
    ];
  }, []);
}

const getValueFromCoords = ([ x, y ]: Coords): number => {
  if (grid[y][x] === 'E') return 27;
  if (grid[y][x] === 'S') return 1;
  return grid[y][x].charCodeAt(0) - 96
}

const canMoveTo = (matrix: number[][], [fromX, fromY]: Coords, [toX, toY]: Coords) => {
  if (matrix[toY]?.[toX] !== 0) return false;

  return getValueFromCoords([fromX, fromY]) - getValueFromCoords([toX, toY]) >= -1;
}

const DIRECTION_LIST = [
  [1, 0],
  [-1, 0],
  [0, -1],
  [0, 1],
];

const endY = grid.findIndex((row) => row.includes('E'));
const endX = grid[endY].findIndex((letter) => letter === 'E');

const getPath = (matrix: number[][]) => {
  let x = endX;
  let y = endY;
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

console.log(`processing ${startingPositions.length} starting positions`);

const result = startingPositions.reduce<number>((amountOfSteps, startingPosition, index) => {
  console.log(`processing ${index + 1} (best: ${amountOfSteps})`);
  const matrix = buildMatrix(startingPosition);

  let step = 0;
  while (matrix[endY][endX] === 0) {
    step += 1;

    if (step >= amountOfSteps) {
      return amountOfSteps;
    }

    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] === step) {
          DIRECTION_LIST.forEach(([xDir, yDir]) => {
            if (canMoveTo(matrix, [x,y], [x + xDir, y + yDir])) {
              matrix[y + yDir][x + xDir] = step + 1;
            }
          })
        } 
      }
    }
  }
  
  const path = getPath(matrix);

  if (!path) return amountOfSteps;

  return path.length - 1 < amountOfSteps ? path.length - 1 : amountOfSteps;
}, grid.length * grid[0].length);

console.log(result);