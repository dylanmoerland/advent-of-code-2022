import { readText } from '../helpers/readText';

const data = readText('src/day08/data.txt');

interface CalculateScenicScoreOptions {
  x: number;
  y: number;
  map: number[][];
}

const calculateScenicScore = ({ x, y, map }: CalculateScenicScoreOptions): number => {
  if (x === 0 || y === 0 || x === map[y].length - 1 || y === map.length - 1) return 0;

  const eastScenicScore = (map[y].slice(x + 1).findIndex((tree) => map[y][x]  <= tree ) + 1) ||  map[y].slice(x + 1).length;
  const westScenicScore = (map[y].slice(0, x).reverse().findIndex((tree) => map[y][x] <= tree) + 1) ||  map[y].slice(0, x).length;
  const southhScenicScore = (map.slice(y + 1).findIndex((row) => map[y][x] <= row[x]) + 1) || map.slice(y + 1).length;
  const northScenicScore = (map.slice(0, y).reverse().findIndex((row) => map[y][x] <= row[x]) + 1) || map.slice(0, y).length;

  return eastScenicScore * southhScenicScore * westScenicScore * northScenicScore;
}

const result = data
  .split('\n')
  .map((line) => line.split('').map((x) => parseInt(x, 10)))
  .reduce((bestScenicScore, row, y, map) => {
    return row.reduce((currentScenicScore, _, x) => {
      const columnScenicScore = calculateScenicScore({ x, y, map });

      return columnScenicScore > currentScenicScore ? columnScenicScore : currentScenicScore;
    }, bestScenicScore);
  }, 0);
  
console.log(result);  