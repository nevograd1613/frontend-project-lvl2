import { expect, test } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '..';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['file1.json', 'file2.json', 'stylish', 'test.txt'],
  ['file1.yml', 'file2.yml', 'stylish', 'test.txt'],
  ['file1.json', 'file2.json', 'plain', 'testPlain.txt'],
  ['file1.yml', 'file2.yml', 'plain', 'testPlain.txt'],
  ['file1.json', 'file2.json', 'json', 'testJSON.txt'],
  ['file1.yml', 'file2.yml', 'json', 'testJSON.txt'],
])('compare %p %p %p', (file1, file2, format, expectedResult) => {
  const recieved = genDiff(getFixturePath(file1), getFixturePath(file2), format);
  const expected = readFile(expectedResult);
  expect(expected).toEqual(recieved);
});
