import path from 'path';
import _ from 'lodash';
import readfile from './src/readfile.js';
import parse from './src/parse.js';

const getDiffInfo = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const uniq = _.uniq([...keys1, ...keys2]);
  const sortUniq = _.sortBy(uniq);
  const result = sortUniq.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if ((value1 && value2) && (value1 !== value2)) {
      return {
        type: 'changed',
        key,
        value1,
        value2,
      };
    }
    if (!_.has(obj2, key)) {
      return {
        type: 'delited',
        key,
        value: value1,
      };
    }
    if (!_.has(obj1, key)) {
      return {
        type: 'added',
        key,
        value: value2,
      };
    }
    return {
      type: 'unchanged',
      key,
      value: value1,
    };
  });
  return result;
};

const getDiff = (diffInfo) => {
  const result = diffInfo.map((diff) => {
    const typediff = diff.type;
    switch (typediff) {
      case 'delited':
        return `  - ${diff.key}: ${diff.value}`;
      case 'unchanged':
        return `    ${diff.key}: ${diff.value}`;
      case 'changed':
        return (`  - ${diff.key}: ${diff.value1} \n  + ${diff.key}: ${diff.value2}`);
      case 'added':
        return `  + ${diff.key}: ${diff.value}`;
      default:
        return null;
    }
  });
  return `{\n${result.join('\n')}\n}`;
};

const getFormat = (filename) => path.extname(filename);

const genDiff = (file1, file2) => {
  const firstObj = readfile(file1);
  const secondObj = readfile(file2);
  const formatData1 = getFormat(file1);
  const formatData2 = getFormat(file2);
  const data1 = parse(formatData1, firstObj);
  const data2 = parse(formatData2, secondObj);
  return getDiff(getDiffInfo(data1, data2));
};

export default genDiff;
