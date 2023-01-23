import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import * as fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);
const readFile = (name) => fs.readFileSync(getFixturePath(name), 'utf-8');
export default readFile;
