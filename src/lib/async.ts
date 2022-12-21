const UNINIT: unique symbol = Symbol('uninitialized variable for memoize');

export function memoize<T>(f: () => Promise<T>): () => Promise<T> {
  let error: unknown | typeof UNINIT = UNINIT;
  let promise: Promise<T> | typeof UNINIT = UNINIT;

  return function () {
    if (error !== UNINIT) return Promise.reject(error);
    if (promise !== UNINIT) return promise;

    try {
      promise = f().catch((e) => {
        error = e;
        throw e;
      });

      return promise;
    } catch (e) {
      error = e;
      return Promise.reject(e);
    }
  };
}
