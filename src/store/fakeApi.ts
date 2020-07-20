export function helperApi(): Promise<null> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
}

export function helperApi2(): Promise<null> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });
}
