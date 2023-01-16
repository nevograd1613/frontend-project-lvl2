import { expect, test } from '@jest/globals';
import genDiff from '../index.js';
import readFile from '../src/readfile.js';

const testFile = readFile('test.txt');

test('gendiff.json', () => {
  expect(genDiff(('file1.json'), ('file2.json'))).toEqual(testFile);
});

test('gendiff.yml', () => {
  expect(genDiff(('file1.yml'), ('file2.yml'))).toEqual(testFile);
});
