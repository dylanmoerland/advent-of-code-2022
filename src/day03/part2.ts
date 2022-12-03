import { readText } from '../helpers/readText';

const data = readText('src/day03/data.txt');

const result = data
  .split('\n')
  .reduce<string[][]>((groups, line, index) => {
    if (index % 3 === 0) groups.push([line])
    else groups[groups.length - 1].push(line)
  
    return groups;
  }, [])
  .map(([a, b, c]) => {
    return [a.split(''), b.split(''), c.split('')];
  })
  .map(([a, b, c]) => {
    return Array.from(new Set(a.filter((item) => {
      return b.includes(item) && c.includes(item)
    })))
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