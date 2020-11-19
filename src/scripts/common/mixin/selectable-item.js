import { defaults, get } from 'lodash';

export const FIELD_NAME = 'selected';
export const EVENT_NAME = 'selected:change';

export default {
  defaults: {
    [FIELD_NAME]: false,
  },

  init() {
    defaults(this.attributes, this.defaults);
  },

  isSelected() {
    return Boolean(this.get(FIELD_NAME));
  },

  select(...args) {
    this.set(FIELD_NAME, true);
    this.notify.call(this, ...args);
  },

  deselect(...args) {
    this.set(FIELD_NAME, false);
    this.notify.call(this, ...args);
  },

  toggle(...args) {
    const newState = !this.get(FIELD_NAME);
    this.set(FIELD_NAME, newState);
    this.notify.call(this, ...args);
  },

  notify(options) {
    if (!get(options, 'silent')) {
      this.trigger(EVENT_NAME, this);
    }
  },
};
