import * as fs from 'fs';
import * as path from 'path'

export const readText = (pathName: string) => {
  const content = fs.readFileSync(path.join(pathName), 'utf8');

  return content.toString();
}