import { lazy } from 'react';

export const loadComponentWithRetry = (
  importFunc,
  retries = 3,
  interval = 1000
) => {
  const isReload =
    JSON.parse(window.sessionStorage.getItem('isReload')) || false;
  return lazy(
    () =>
      new Promise((resolve, reject) => {
        importFunc()
          .then((component) => {
            window.sessionStorage.getItem('isReload', false);
            resolve(component);
          })
          .catch((error) => {
            if (retries === 1) {
              if (!isReload) {
                window.sessionStorage.getItem('isReload', true);
                window.location.reload();
              } else {
                reject(error);
              }
            } else {
              setTimeout(() => {
                loadComponentWithRetry(importFunc, retries - 1, interval)
                  .then((component) => {
                    window.sessionStorage.getItem('isReload', false);
                    resolve(component);
                  })
                  .catch(reject);
              }, interval);
            }
          });
      })
  );
};
