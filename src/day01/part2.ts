import { readText } from '../helpers/readText';

const data = readText('src/day01/data.txt')

const amountOfCaloriesList = data
  .split('\n')
  .reduce<number[]>((elfCaloryList, line) => {
    if (line) elfCaloryList[elfCaloryList.length - 1] += parseInt(line, 10);
    else elfCaloryList.push(0);

    return elfCaloryList;
  }, [0])
  .sort((a, b) => a > b ? -1 : 1);

const result: number = amountOfCaloriesList[0] + amountOfCaloriesList[1] + amountOfCaloriesList[2]

console.log(result)