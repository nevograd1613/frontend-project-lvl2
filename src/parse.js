import yaml from 'js-yaml';

const parse = (format, data) => {
  if (format === '.json') {
    return JSON.parse(data);
  } if (format === '.yml' || format === '.yaml') {
    return yaml.load(data);
  }
  return null;
};
export default parse;
