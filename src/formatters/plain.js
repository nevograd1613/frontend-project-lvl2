const stringify = (data) => {
  if (typeof data === 'object' && data !== null) {
    return '[complex value]';
  } if (typeof data === 'string') {
    return `'${data}'`;
  } if (data === null) {
    return null;
  }
  return String(data);
};

const plain = (data) => {
  const iter = (tree, acc) => {
    const result = tree.flatMap((node) => {
      const newAcc = (acc === '') ? `${node.name}` : `${acc}.${node.name}`;
      switch (node.type) {
        case 'added':
          return `Property '${newAcc}' was added with value: ${stringify(node.value)}`;
        case 'deleted':
          return `Property '${newAcc}' was removed`;
        case 'changed':
          return `Property '${newAcc}' was updated. From ${stringify(node.value)} to ${stringify(node.newValue)}`;
        case 'nested':
          return iter(node.value, newAcc);
        case 'unchanged':
          return [];
        default:
          return 'invalid';
      }
    });
    return [...result].join('\n');
  };
  return iter(data, '');
};

export default plain;
