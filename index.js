import path from 'path';
import _ from 'lodash';
import readfile from './src/readfile.js';
import parse from './src/parse.js';
import stylish from './src/stylish.js';

const genDiffComparison = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(keys);
  const result = sortedKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return { name: key, type: 'added', value: obj2[key] };
    }
    if (!_.has(obj2, key)) {
      return { name: key, type: 'deleted', value: obj1[key] };
    }
    if ((_.isPlainObject(obj1[key])) && (_.isPlainObject(obj2[key]))) {
      return { name: key, type: 'nested', value: genDiffComparison(obj1[key], obj2[key]) };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        name: key, type: 'changed', value: obj1[key], newValue: obj2[key],
      };
    }
    return { name: key, type: 'unchanged', value: obj1[key] };
  });
  return result;
};

const getFormat = (filename) => path.extname(filename);

const genDiff = (file1, file2) => {
  const firstObj = readfile(file1);
  const secondObj = readfile(file2);
  const formatData1 = getFormat(file1);
  const formatData2 = getFormat(file2);
  const data1 = parse(formatData1, firstObj);
  const data2 = parse(formatData2, secondObj);
  const getStylish = genDiffComparison(data1, data2);
  return stylish(getStylish);
};

export default genDiff;
