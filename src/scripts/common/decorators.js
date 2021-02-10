import defaults from "lodash/defaults";
import isArray from "lodash/isArray";

/* eslint-disable import/prefer-default-export */

function decoratorsFactory({ name, kind, placement, descriptorOptions }) {
  return function fn(value) {
    return function decorator(target) {
      if (isArray(target.elements)) {
        target.elements.push({
          kind,
          key: name,
          placement,
          descriptor: defaults(
            { configurable: true, enumerable: false, value },
            descriptorOptions
          ),
        });
      }
    };
  };
}

export const tagName = decoratorsFactory({
  kind: "method",
  name: "tagName",
  placement: "prototype",
});

export const template = decoratorsFactory({
  kind: "method",
  name: "template",
  placement: "prototype",
});
