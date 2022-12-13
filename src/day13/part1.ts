import { readText } from '../helpers/readText';

const data = readText('src/day13/data.txt');

type Side = (number | number[])[];

const getValueAsArray = (value: Side | number): any[] => {
  if (Array.isArray(value)) return value;

  return [value];
}

// WORKS FOR TEST DATA ...
// const isInRightOrder = (left: Side, right: Side): boolean => {
//   return right.some((value, index) => {
//     return getValueAsArray(value) > getValueAsArray(left[index]);
//   });
// }

const validateOrder = (packet: [Side, Side]): boolean => {
  if (packet[0] === undefined || packet[1] === undefined)
    return packet[0] === undefined;

  if (typeof packet[0] === 'number' && typeof packet[1] === 'number') {
    const difference = packet[0] - packet[1];

    return difference === 0 ? undefined : difference <= -1
  }

  const left = getValueAsArray(packet[0]);
  const right = getValueAsArray(packet[1]);

  return new Array(left.length > right.length ? left.length : right.length)
    .fill(0)
    .reduce<boolean | undefined>((accumulator, _, index) => {
      if (accumulator === undefined) return validateOrder([left[index], right[index]])

      return accumulator;
    }, undefined);
}

const result = data
  .split('\n\n')
  .map((line) => {
    const [left, right] = line.split('\n');

    return [JSON.parse(left), JSON.parse(right)] as [Side, Side]
  })
  .reduce((indices, [left, right], index) => {
    if (validateOrder([left, right])) {
      return indices + (index + 1)
    }

    return indices;
  }, 0);

console.log(result);