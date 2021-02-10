import assign from "lodash/assign";
import defaults from "lodash/defaults";
import isArray from "lodash/isArray";

/* eslint-disable import/prefer-default-export */

/**
 * Descriptor Options
 * @typedef {Object} PropertyDescriptor
 * @property {boolea} configurable
 * @property {boolean} enumerable
 * @property {boolean} writable
 * @property {function} get
 * @property {function} set
 * @property {*} value
 */

/**
 * Factory Options
 * @typedef {Object} FactoryOptions
 * @property {string} name - name of the function, will be used as a `key` of the target prototype
 * @property {('method'| 'field')} kind - kind of the decorator
 * @property {PropertyDescriptor} descriptor
 */

/**
 * @param {FactoryOptions} param0
 * @returns Function
 */
function decoratorsFactory({ name, kind, descriptor }) {
  return function fn(value) {
    return function decorator(target) {
      if (isArray(target.elements)) {
        const elementDefaults = {
          kind,
          key: name,
          placement: "prototype",
        };
        let element;

        // eslint-disable-next-line default-case
        switch (kind) {
          case "field":
            element = assign(elementDefaults, {
              initializer() {
                return value;
              },
              descriptor: defaults(
                { configurable: true, enumerable: true, writable: true },
                descriptor
              ),
            });
            break;

          case "method":
            element = assign(elementDefaults, {
              descriptor: defaults(
                { configurable: true, enumerable: false, value },
                descriptor
              ),
            });
            break;
        }

        target.elements.push(element);
      }
    };
  };
}

export const tagName = decoratorsFactory({
  kind: "field",
  name: "tagName",
});

export const template = decoratorsFactory({
  kind: "field",
  name: "template",
});

export const className = decoratorsFactory({
  kind: "field",
  name: "className",
});

export const ui = decoratorsFactory({
  kind: "field",
  name: "ui",
});

export const childView = decoratorsFactory({
  kind: "field",
  name: "childView",
});
