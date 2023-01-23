import stylish from './stylish.js';
import plain from './plain.js';

const whatFormat = (obj, format) => {
  if (format === 'stylish') {
    return stylish(obj);
  } if (format === 'plain') {
    return plain(obj);
  }
  return null;
};

export default whatFormat;
