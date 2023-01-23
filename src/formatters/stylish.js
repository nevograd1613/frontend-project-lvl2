import _ from 'lodash';

const keyOffset = 4;
const prefixOffset = 2;
const indentSymbol = ' ';
const openSymbol = '{';
const closeSymbol = '}';
const labels = {
  deleted: '-',
  added: '+',
  unchanged: ' ',
  nested: ' ',
};

const addPrefix = (key, type, indent) => `${indent}${labels[type]} ${key}`;

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const indentSize = depth * keyOffset;
  const keyIndent = indentSymbol.repeat(indentSize);
  const bracketIndent = indentSymbol.repeat(indentSize - keyOffset);
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${keyIndent}${key}: ${stringify(val, depth + 1)}`);

  return [
    `${openSymbol}`,
    ...lines,
    `${bracketIndent}${closeSymbol}`,
  ].join('\n');
};

const stylish = (data) => {
  const iter = (tree, depth) => {
    const result = tree.map((node) => {
      const indentSize = depth * keyOffset;
      const bracketIndent = indentSymbol.repeat(indentSize);
      const keyIndent = indentSymbol.repeat(indentSize - prefixOffset);
      const addPref = `${addPrefix(node.name, node.type, keyIndent)}: ${stringify(node.value, depth + 1)}`;
      if (node.type === 'added' || node.type === 'deleted' || node.type === 'ubchanged') {
        return addPref;
      }
      if (node.type === 'deleted') {
        return addPref;
      }
      if (node.type === 'unchanged') {
        return addPref;
      }
      if (node.type === 'changed') {
        return `${addPrefix(node.name, 'deleted', keyIndent)}: ${stringify(node.value, depth + 1)}\n${addPrefix(node.name, 'added', keyIndent)}: ${stringify(node.newValue, depth + 1)}`;
      }
      if (node.type === 'nested') {
        return `${addPrefix(node.name, node.type, keyIndent)}: ${openSymbol}\n${iter(node.value, depth + 1).join('\n')}\n${bracketIndent}${closeSymbol}`;
      }
      throw new Error();
    });
    return result;
  };
  return [
    `${openSymbol}`,
    ...iter(data, 1),
    `${closeSymbol}`,
  ].join('\n');
};

export default stylish;
