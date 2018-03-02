const menufieldCommon = {
  replace: str => srcKey => (replaceStr) => {
    str = str.replace(srcKey, replaceStr);
    if (str.indexOf(srcKey) > 0) { return menufieldCommon.replace(str)(srcKey)(replaceStr); }
    return str;
  },

  setProductPropsForRender: (properties) => {
    if (!properties || properties === null) return {};

    const result = Object.keys(properties).reverse().reduce((prev, current) => {
      prev[current] = typeof properties[current] === 'object'
        ? Object.keys(properties[current]).join(', ')
        : properties[current] === 'Checked'
          ? 'Yes'
          : properties[current];
      return prev;
    }, {});

    return result;
  },
};

export default menufieldCommon;
