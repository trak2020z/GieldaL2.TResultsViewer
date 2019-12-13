import DataService from "./services/DataServices";
import { timeout } from "q";

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

export const getCleanData = () => {
  DataService.getChartData("").then(data => {
    let n = data.graphs.length;
    if (n) {
      let reqTime = data.graphs.map(d => d.reqTime);
      let sum = reqTime.reduce(function(a, b) {
        return a + b;
      });
      let avg = sum / n;
      let innerPar = reqTime.map(x => {
        return Math.pow(x - avg, 2);
      });
      let sum2 = innerPar.reduce((x, b) => {
        return x + b;
      });
      let div = sum2 / n;
      console.log(div);
    }
  });
};
