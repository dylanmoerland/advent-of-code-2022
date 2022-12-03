import { readText } from '../helpers/readText';

const data = readText('src/day03/data.txt')

const result = data
  .split('\n')
  .map<[string[], string[]]>((line) => {
    return [line.slice(0, line.length / 2).split(''), line.slice(line.length / 2, line.length).split('')]
  })
  .map(([compartmentA, compartmentB]) => {
    return Array.from(new Set(compartmentA.filter((item) => compartmentB.includes(item))));
  })
  .reduce<number>((totalPriority, doubleItems) => {
    return totalPriority + doubleItems.reduce<number>((priority, doubleItem) => {
      const charCode = doubleItem.charCodeAt(0);

      if (charCode >= 65 && charCode <= 90) return priority + charCode - 38;
      else if (charCode >= 97 && charCode <= 122) return priority + charCode - 96;
    
      return priority;
    }, 0);
  }, 0);

console.log(result);