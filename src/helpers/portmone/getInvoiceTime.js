export const getInvoiceTime = (timeDiff = 20 /* min */) => {
  const timeMs = Date.now() + timeDiff * 60 * 1000;
  const date = new Date(timeMs);
  const dateStr = date.toLocaleString();
  return dateStr.split(', ').reduce((acc, el, i) => {
    if (i === 0) {
      return acc + el.split('.').reverse().join('');
    } else if (i === 1) {
      return acc + el.replace(/:/g, '');
    }
    return acc;
  }, '');
};
