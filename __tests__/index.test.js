import { expect, test } from '@jest/globals';
import genDiff from '../index.js';
import readFile from '../src/readfile.js';

const testFile = readFile('test.txt');
const testPlain = readFile('testPlain.txt');
const testJson = readFile('testJSON.txt');

test('stylish gendiff.json', () => {
  expect(genDiff(('file1.json'), ('file2.json'))).toEqual(testFile);
});

test('stylish gendiff.yml', () => {
  expect(genDiff(('file1.yml'), ('file2.yml'))).toEqual(testFile);
});

test('plain gendiff.json', () => {
  expect(genDiff(('file1.json'), ('file2.json'), 'plain')).toEqual(testPlain);
});

test('plain gendiff.yml', () => {
  expect(genDiff(('file1.yml'), ('file2.yml'), 'plain')).toEqual(testPlain);
});

test('json gendiff.json', () => {
  expect(genDiff(('file1.json'), ('file2.json'), 'json')).toEqual(testJson);
});

test('json gendiff.yml', () => {
  expect(genDiff(('file1.yml'), ('file2.yml'), 'json')).toEqual(testJson);
});
