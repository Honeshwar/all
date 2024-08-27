import { range } from "d3-array";
import { scaleQuantile } from "d3-scale";

export function updatePercentiles(featureCollection, accessor) {
  const { features } = featureCollection;
  const scale = scaleQuantile().domain(features.map(accessor)).range(range(9));
  return {
    type: "FeatureCollection",
    features: features.map((f) => {
      const value = accessor(f);
      const properties = {
        ...f.properties,
        value,
        percentile: scale(value),
      };
      return { ...f, properties };
    }),
  };
}

export function debouncing(func, delay) {
  let timeoutId;
  return (...args) => {
    let a = clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      console.log("called", a);
      func.apply(null, args);
    }, delay);
  };
}
