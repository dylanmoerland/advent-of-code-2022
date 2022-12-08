import { readText } from '../helpers/readText';

const data = readText('src/day08/data.txt');

const result = data
  .split('\n')
  .map((line) => line.split('').map((x) => parseInt(x, 10)))
  .reduce((totalVisibleTrees, row, y, map) => {
    return totalVisibleTrees + row.reduce((rowTotal, column, x) => {
      if (x === 0 || y === 0 || x === row.length - 1 || y === map.length - 1)
        return rowTotal + 1;

      if (row.slice(x + 1).every((tree) => column > tree))
        return rowTotal + 1;

      if (row.slice(0, x).every((tree) => column > tree))
        return rowTotal + 1;

      if (map.slice(y + 1).every((trees) => column > trees[x]))
        return rowTotal + 1;

      if (map.slice(0, y).every((trees) => column > trees[x]))
        return rowTotal + 1;

      return rowTotal;
    }, 0);
  }, 0);
  
console.log(result);  