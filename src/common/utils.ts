// 函数管道
export function pipeFn(...fns: any[]) {
  return (...args: any[]) => {
    for (const fn of fns) {
      let res;
      try {
        res = fn(...args);
      } catch (error) {
        break;
      }
      if (res === false) {
        break;
      }
      args = [res];
    }
  };
}
