import { readText } from '../helpers/readText';

const data = readText('src/day05/data.txt')

const [containerData, operationData] = data
  .split('\n\n');

const containers = containerData
  .split('\n')
  .reverse()
  .slice(1)
  .reduce<string[][]>((allContainers, line) => {
    line.match(/.{1,4}/g).forEach((operationContainer, index) => {
      const operation = operationContainer.charAt(1);

      if (operation === ' ') return;

      if (Array.isArray(allContainers[index])) {
        allContainers[index].push(operation)
      } else {
        allContainers[index] = [operation]
      }
    })
    return allContainers;
  }, []);

const operations = operationData
  .split('\n')
  .map((line) => line.match(/[0-9]{1,10}/g)
  .map((number) => {
    return parseInt(number, 10);
  }));

operations
  .forEach(([amount, from, to]) => {
    const slice = containers[from - 1].splice(containers[from - 1].length - amount);
    containers[to - 1].push(...slice);
  });

const result = containers
  .map((container) => container[container.length - 1])
  .join('');
  
console.log(result);