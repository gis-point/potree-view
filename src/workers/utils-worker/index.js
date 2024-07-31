
export const createQueryStringFromObject = (objQuery) => {
  if (typeof objQuery !== 'object') {
    return '';
  }

  const elements = Object.keys(objQuery).map(
    (key) => `${key}=${objQuery[key]}`
  );
  return elements.length ? '?' + elements.join('&') : '';
};
