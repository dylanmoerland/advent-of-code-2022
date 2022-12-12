import { readText } from '../helpers/readText';

const data = readText('src/day11/data.txt');

function replaceAll(str: string, find: string, replace: string) {
  return str.replace(new RegExp(find, 'g'), replace);
}

class Monkey {
  private _items: number[];
  private operation: string;
  private test: string;
  private _itemsInspected = 0;

  constructor(startingItems: number[], operation: string, test: string) {
    this._items = [...startingItems];
    this.operation = operation;
    this.test = test;
  }

  public handleItems(monkey1: Monkey, monkey2: Monkey) {
    this._items.forEach((item) => {
      const newItem = this.handleInspection(item);  
      this.testItem(newItem) ? monkey1.receiveItem(newItem) : monkey2.receiveItem(newItem)
    });
    this._items = [];
  }

  public receiveItem(item: number) {
    this._items = [...this.items, item];
  }

  get itemsInspected() {
    return this._itemsInspected;
  }

  get items() {
    return this._items;
  }

  private handleInspection(item: number) {
    this._itemsInspected++;
    const [operation] = this.operation.match(/(old).*/g);
  
    return Math.floor((eval(replaceAll(operation, "old", item.toString())) / 3))
  }

  private testItem(item: number) {
    const [value] = this.test.match(/([0-9]){1,100}/g)

    return item % parseInt(value, 10) === 0;
  }
}

const monkeys = data
  .split('\n')
  .reduce<string[][]>((lines, line, index) => {
    if (index % 7 === 0) {
      lines.push([line]);
    }
    else {
      lines[lines.length - 1].push(line);
    }
    return lines;
  }, [])
  .reduce<{
    monkey: Monkey,
    trueTarget: number;
    falseTarget: number;
  }[]>((allMonkeys, lines) => {
    const startingItems = lines[1].match(/([0-9]){1,100}/g).map((x) => parseInt(x, 10));
    const [operation] = lines[2].match(/new.*/g);
    const [test] = lines[3].match(/divisible.*/g);
    const [trueTarget] = lines[4].match(/[0-9]/g);
    const [falseTarget] = lines[5].match(/[0-9]/g);
    return [
      ...allMonkeys,
      {
        monkey: new Monkey(startingItems, operation, test),
        trueTarget: parseInt(trueTarget, 10),
        falseTarget: parseInt(falseTarget, 10),
      }
    ];
  }, []);

for(let i = 0; i < 20; i++) {
  monkeys.forEach(({ monkey, trueTarget, falseTarget }) => {
    monkey.handleItems(monkeys[trueTarget].monkey, monkeys[falseTarget].monkey);
  })
}

monkeys
  .sort(({ monkey: a }, { monkey: b }) => a.itemsInspected > b.itemsInspected ? -1 : 1)

console.log(monkeys[0].monkey.itemsInspected * monkeys[1].monkey.itemsInspected);