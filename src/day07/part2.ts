import { readText } from '../helpers/readText';

const data = readText('src/day07/data.txt');

interface File {
  name: string;
  size: number;
}

type System = Record<string, any>;

const addFileToSystem = (system: System, pathName: string, file: File) => {
  const paths = pathName.split('~');

  if (!system[paths[0]]) {
    system[paths[0]] = {}
  }

  if (paths.length > 1) {
    return addFileToSystem(system[paths[0]], paths.slice(1).join('~'), file);
  }

  system[paths[0]][file.name] = file.size;

  return system;
}

const { system } = data
  .split('\n')
  .reduce<{ pathName: string, system: System }>(({ pathName, system }, line) => {
    if (line === "$ ls") return { pathName, system };
  
    const [_, newPathName] = line.match(/cd ([a-z]{1,100})/) || [];

    if (newPathName) return {
      system,
      pathName: pathName + `~${newPathName}`
    }

    if (line.match(/cd ../)) {
      const paths = pathName.split('~');
      return {
        system,
        pathName: paths.slice(0, paths.length - 1).join('~')
      }
    }

    const [, fileSize, , fileName] = line.match(/(([0-9]){1,100}) (.*)/) || [];

    if (fileSize && fileName) {
      addFileToSystem(system, pathName, { name: fileName, size: parseInt(fileSize, 10) }) 
    }

    return {
      pathName,
      system,
    };
  }, { pathName: '', system: {} })

const calculateTotalFileSize = (directory: Record<string, any>): number => {
  const directorySize = Object
    .entries(directory)
    .reduce<number>((total, [name, value]) => {

      if (typeof value === 'object') 
        return total + calculateTotalFileSize(directory[name]);

      return total + value;
    }, 0);

  return directorySize;
}

const spaceNeeded = 30000000 - (70000000 - calculateTotalFileSize(system));
let spaceToBeDeleted = 70000000;

const calculateSizeToBeDeleted = (directory: Record<string, any>): number => {
  const directorySize = Object
    .entries(directory)
    .reduce<number>((total, [name, value]) => {

      if (typeof value === 'object') 
        return total + calculateSizeToBeDeleted(directory[name]);

      return total + value;
    }, 0);

  if (directorySize >= spaceNeeded && directorySize < spaceToBeDeleted) spaceToBeDeleted = directorySize;

  return directorySize;
}
calculateSizeToBeDeleted(system);



console.log(spaceToBeDeleted);