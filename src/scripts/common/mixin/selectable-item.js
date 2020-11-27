import { get } from 'lodash';

export const FIELD_NAME = Symbol('selected');
export const EVENT_NAME = 'selected:change';

export default {
  init() {
    this[FIELD_NAME] = false;
  },

  isSelected() {
    return Boolean(this[FIELD_NAME]);
  },

  select(...args) {
    this[FIELD_NAME] = true;
    this.notify.call(this, ...args);
  },

  deselect(...args) {
    this[FIELD_NAME] = false;
    this.notify.call(this, ...args);
  },

  toggle(...args) {
    const newState = !this[FIELD_NAME];
    this[FIELD_NAME] = newState;
    this.notify.call(this, ...args);
  },

  notify(options) {
    if (!get(options, 'silent')) {
      this.trigger(EVENT_NAME, this);
    }
  },
};
