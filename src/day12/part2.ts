import { readText } from '../helpers/readText';

const data = readText('src/day12/data.txt');

interface Coords {
  x: number;
  y: number;
}

const grid = data
  .split('\n')
  .map((line) => line.split(''));

const startingPositions = grid.reduce<Coords[]>((coords, row, y) => {
  row.forEach((column, x) => {
    if (column === 'a') {
      coords.push({ x, y });
    }
  })
  return coords;
}, []);

const endY = grid.findIndex((row) => row.includes('E'));
const endX = grid[endY].findIndex((letter) => letter === 'E');

const buildMatrix = (start: Coords) => {
  return grid.reduce<number[][]>((accumulator, row, y) => {
    return [
      ...accumulator,
      row.map((_, x) => {
        if (x === start.x && y === start.y) return 1;
        else return 0;
      })
    ];
  }, []);
}

const getValueFromCoords = ({ x, y }: Coords): number => {
  if (grid[y][x] === 'E') return 27;
  if (grid[y][x] === 'S') return 1;
  return grid[y][x].charCodeAt(0) - 96
}

const canMoveTo = (matrix: number[][], from: Coords, to: Coords) => {
  if (matrix[to.y]?.[to.x] !== 0) return false;

  return getValueFromCoords(from) - getValueFromCoords(to) >= -1;
}

const getPath = (matrix: number[][]) => {
  let x = endX;
  let y = endY;
  const path = [{ x, y }];
  let value = matrix[y][x];

  while (value > 1) {
    if (matrix[y - 1]?.[x] === value - 1) {
      y = y - 1;
      path.push({ x, y });
      value -= 1;
    }
    if (matrix[y + 1]?.[x] === value - 1) {
      y = y + 1;
      path.push({ x, y });
      value -= 1;
    }
    else if (matrix[y]?.[x + 1] === value - 1) {
      x = x + 1;
      path.push({ x, y });
      value -= 1;
    }
    else if (matrix[y]?.[x - 1] === value - 1) {
      x = x - 1;
      path.push({ x, y });
      value -= 1;
    }
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
      for (let x= 0; x < matrix[y].length; x++) {
        if (matrix[y][x] === step) {
          if (canMoveTo(matrix, {x, y}, { x, y: y - 1 })) {
            matrix[y - 1][x] = step + 1
          }
          if (canMoveTo(matrix, {x, y}, { x, y: y + 1 })) {
            matrix[y + 1][x] = step + 1
          }
          if (canMoveTo(matrix, {x, y}, { x: x - 1, y })) {
            matrix[y][x - 1] = step + 1
          }
          if (canMoveTo(matrix, {x, y}, { x: x + 1, y })) {
            matrix[y][x + 1] = step + 1
          }
        } 
      }
    }
  }
  
  const path = getPath(matrix);

  if (!path) return amountOfSteps;

  return path.length - 1 < amountOfSteps ? path.length - 1 : amountOfSteps;
}, grid.length * grid[0].length);

console.log(result)