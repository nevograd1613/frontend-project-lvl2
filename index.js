import fs from 'fs';
import parse from './src/parse.js';
import formatData from './src/formatters/index.js';
import { genDiffComparison, getFormat } from './src/index.js';

const genDiff = (file1, file2, format = 'stylish') => {
  const formatData1 = getFormat(file1).slice(1);
  const formatData2 = getFormat(file2).slice(1);
  const firstObj = fs.readFileSync(file1);
  const secondObj = fs.readFileSync(file2);
  const data1 = parse(formatData1, firstObj);
  const data2 = parse(formatData2, secondObj);
  const diff = genDiffComparison(data1, data2);
  return formatData(diff, format);
};

export default genDiff;
