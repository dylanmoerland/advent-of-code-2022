import { readText } from '../helpers/readText';

const data = readText('src/day14/data.txt');

type GridItem = '.' | '#' | 'o'
type Cave = Record<number, Record<number, GridItem>>;
interface Coords {
  x: number;
  y: number;
}

const draw = (cave: Cave, item: GridItem, { x,y }: Coords) => {
  if (!cave[y]) {
    cave[y] = {};
  }
  cave[y][x] = item;
}

const cave = data
  .split('\n')
  .reduce<number[][][]>((points, line) => {
    return [
      ...points,
      line.split(' -> ').map((point) => {
        return point.split(',').map((x) => parseInt(x, 10));
      })
    ]
  }, [])
  .reduce<Cave>((cave, points) => {
    points.forEach((point, index) => {
      const nextPoint = points[index + 1];
      if (!nextPoint) return;

      new Array(Math.abs(point[0] - nextPoint[0]) + 1)
        .fill(0)
        .forEach((_, i) => {
          draw(cave, '#', { x: point[0] + (point[0] > nextPoint[0] ? -i : i), y: point[1]} );
        })

      new Array(Math.abs(point[1] - nextPoint[1]) + 1)
        .fill(0)
        .forEach((_, i) => {
          draw(cave, '#', { x: point[0], y: point[1] + (point[1] > nextPoint[1] ? -i : i)} );
        })
    })
    return cave;
  }, {});

const POURING_POINT = { y: 0, x: 500};

const abyssY = parseInt(Object.keys(cave).reverse()[0], 10);

let { x, y }: Coords = { ...POURING_POINT };

const canMoveTo = (cave: Cave, { x, y }: Coords) => {
  if (y >= abyssY + 2) return false;
  return cave[y]?.[x] === '.' || !cave[y]?.[x];
}

while (cave[POURING_POINT.y]?.[POURING_POINT.x] !== 'o') {
  draw(cave, '.' , { x, y });
  if (canMoveTo(cave, { x, y: y + 1 })) {
    y += 1;
    draw(cave, 'o' , { x, y });
  } else if (canMoveTo(cave, { x: x - 1, y: y + 1 })) {
    x -= 1;
    y += 1;
    draw(cave, 'o' , { x, y });
  } else if (canMoveTo(cave, { x: x + 1, y: y + 1 })) {
    x += 1;
    y += 1;
    draw(cave, 'o' , { x, y });
  } else {
    draw(cave, 'o' , { x, y });
    x = POURING_POINT.x;
    y = POURING_POINT.y;
  }
}

const result = Object.values(cave).reduce((total, line) => {
  return total + Object.values(line).reduce((lineTotal, item) => {
    if (item === 'o') return lineTotal + 1;
    return lineTotal;
  }, 0);
}, 0)

console.log(result);