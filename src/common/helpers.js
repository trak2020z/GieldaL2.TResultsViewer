import { timeout } from "q";

/** Debounce function returning debounced version of a given
 * function, which will be called after the given waiting 
 * duration has elapsed (in milliseconds) 
 * @param fn function
 * @param delay time in milliseconds */
export const debounce = (fn, delay) => {
  let timer = null;
  return function(...args) {
    const context = this;
    if (timeout) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};
