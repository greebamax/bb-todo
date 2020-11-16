export const FIELD_NAME = 'selected';
export const EVENT_NAME = 'selected:change';

export default {
  defaults: {
    [FIELD_NAME]: false,
  },

  isSelected() {
    return Boolean(this.get(FIELD_NAME));
  },

  select() {
    this.set(FIELD_NAME, true);
    this.trigger(EVENT_NAME, true);
  },

  deselect() {
    this.set(FIELD_NAME, false);
    this.trigger(EVENT_NAME, false);
  },

  toggle() {
    const newState = !this.get(FIELD_NAME);
    this.set(FIELD_NAME, newState);
    this.trigger(EVENT_NAME, newState);
  },
};
