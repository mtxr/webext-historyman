function promisify<TResult>(fn: (callback: (result: TResult) => void) => void): () => Promise<TResult>;
function promisify(fn: (callback: () => void) => void): () => Promise<void>;
function promisify<T1, TResult>(fn: (arg1: T1, callback: (result: TResult) => void) => void): (arg1: T1) => Promise<TResult>;
function promisify<T1>(fn: (arg1: T1, callback: () => void) => void): (arg1: T1) => Promise<void>;
function promisify<T1, T2, TResult>(fn: (arg1: T1, arg2: T2, callback: (result: TResult) => void) => void): (arg1: T1, arg2: T2) => Promise<TResult>;
function promisify<T1, T2>(fn: (arg1: T1, arg2: T2, callback: () => void) => void): (arg1: T1, arg2: T2) => Promise<void>;
function promisify<T1, T2, T3, TResult>(fn: (arg1: T1, arg2: T2, arg3: T3, callback: (result: TResult) => void) => void): (arg1: T1, arg2: T2, arg3: T3) => Promise<TResult>;
function promisify<T1, T2, T3>(fn: (arg1: T1, arg2: T2, arg3: T3, callback: () => void) => void): (arg1: T1, arg2: T2, arg3: T3) => Promise<void>;
function promisify<T1, T2, T3, T4, TResult>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, callback: (result: TResult) => void) => void): (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<TResult>;
function promisify<T1, T2, T3, T4>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, callback: () => void) => void): (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<void>;
function promisify<T1, T2, T3, T4, T5, TResult>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, callback: (result: TResult) => void) => void): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<TResult>;
function promisify<T1, T2, T3, T4, T5>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, callback: () => void) => void): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<void>;
function promisify(fn: (...args: any[]) => any): (() => Promise<any | void>) {
  // const fn = arguments[0];
  return function () {
    return new Promise((resolve, reject) => {
      if (arguments.length === 0) {
        return fn((data?: any) => {
          if (chrome.runtime.lastError) {
            return void reject(chrome.runtime.lastError);
          }
          return resolve(data);
        });
      }
      fn(...arguments, (data?: any) => {
        if (chrome.runtime.lastError) {
          return void reject(chrome.runtime.lastError);
        }
        return void resolve(data);
      });
    });
  };
}

export default promisify;
