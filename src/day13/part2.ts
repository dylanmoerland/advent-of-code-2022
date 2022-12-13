import { readText } from '../helpers/readText';

const data = readText('src/day13/data.txt');

type Side = (number | number[])[];

const getValueAsArray = (value: Side | number): any[] => {
  if (Array.isArray(value)) return value;

  return [value];
}

const validateOrder = (packet: [Side, Side]): number => {
  if (packet[0] === undefined || packet[1] === undefined)
    return packet[0] === undefined ? -1 : 1;

  if (typeof packet[0] === 'number' && typeof packet[1] === 'number')
    return packet[0] - packet[1];

  const left = getValueAsArray(packet[0]);
  const right = getValueAsArray(packet[1]);

  return new Array(left.length > right.length ? left.length : right.length)
    .fill(0)
    .reduce((accumulator, _, index) => {
      if (accumulator === 0) return validateOrder([left[index], right[index]])

      return accumulator;
    }, 0);
}

const dividerPackets = [[[2]], [[6]]];

const result = [
  ...data
    .split( '\n' )
    .filter((line) => !!line)
    .map( line => JSON.parse(line) ),
  ...dividerPackets
].sort((a, b) => validateOrder([a, b]) );

console.log(( result.indexOf(dividerPackets[0]) + 1 ) * ( result.indexOf(dividerPackets[1]) + 1 ));