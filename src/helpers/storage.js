export const getFromLS = (key) => {
  return JSON.parse(localStorage.getItem(key)) ?? null;
};

export const setToLS = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
