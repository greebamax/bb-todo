import get from "lodash/get";

export const FIELD_NAME = Symbol("is-editing");
export const EVENTS = {
  START_EDIT: "start:edit",
  STOP_EDIT: "stop:edit",
};

export default {
  init() {
    this[FIELD_NAME] = false;
  },

  isEditing() {
    return Boolean(this[FIELD_NAME]);
  },

  startEdit(...args) {
    this[FIELD_NAME] = true;
    this.notify.call(this, ...args);
  },

  stopEdit(...args) {
    this[FIELD_NAME] = false;
    this.notify.call(this, ...args);
  },

  notify(options) {
    if (!get(options, "silent")) {
      this.trigger(
        this[FIELD_NAME] ? EVENTS.START_EDIT : EVENTS.STOP_EDIT,
        this[FIELD_NAME]
      );
    }
  },
};
