import { clone } from "lodash";

const INIT_ATTRS = Symbol("init-attrs");

export default {
  init() {
    this[INIT_ATTRS] = clone(this.attributes);
  },

  /**
   * Reset specific field to initial state
   * @param {String} field
   */
  revert(field) {
    this.set(field, this[INIT_ATTRS][field], { silent: true });
  },

  /**
   * Reset all model attributes initial state
   */
  revertAll() {
    this.set(this[INIT_ATTRS], { silent: true });
  },
};
