export const random = (min, max) => {
  if (typeof(min) === 'undefined' && typeof(max) === 'undefined') {
    return Math.random() < 0.5;
  } else {
    return Math.random() * (max - min) + min;
  }
};

export const removeNode = (node) => {
  node.parentNode.removeChild(node);
};
