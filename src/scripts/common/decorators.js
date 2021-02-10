import isArray from "lodash/isArray";

/* eslint-disable import/prefer-default-export */

export function tagName(value) {
  return function decorator(target) {
    if (isArray(target.elements)) {
      target.elements.push({
        kind: "method",
        key: "tagName",
        placement: "prototype",
        descriptor: { configurable: true, enumerable: false, value },
      });
    }
  };
}

export function template(value) {
  return function decorator(target) {
    if (isArray(target.elements)) {
      target.elements.push({
        kind: "method",
        key: "template",
        placement: "prototype",
        descriptor: { configurable: true, enumerable: false, value },
      });
    }
  };
}
