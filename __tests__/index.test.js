import { expect, test } from '@jest/globals';
import genDiff from '../index.js';
import readFile from '../src/readfile.js';

test('stylish gendiff.json and .yml', () => {
  const testFile = readFile('test.txt');
  expect(genDiff(('file1.json'), ('file2.json'))).toEqual(testFile);
  expect(genDiff(('file1.yml'), ('file2.yml'))).toEqual(testFile);
});

test('plain gendiff.json and .yml', () => {
  const testPlain = readFile('testPlain.txt');
  expect(genDiff(('file1.json'), ('file2.json'), 'plain')).toEqual(testPlain);
  expect(genDiff(('file1.yml'), ('file2.yml'), 'plain')).toEqual(testPlain);
});

test('json gendiff.json and .yml', () => {
  const testJson = readFile('testJSON.txt');
  expect(genDiff(('file1.json'), ('file2.json'), 'json')).toEqual(testJson);
  expect(genDiff(('file1.yml'), ('file2.yml'), 'json')).toEqual(testJson);
});
