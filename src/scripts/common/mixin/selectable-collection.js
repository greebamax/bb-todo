import { defaults } from "lodash";
import { CHANGE_SELECTED_EVENT_NAME } from "./selectable-item";

export default {
  defaults: {
    isMultiSelect: false,
  },

  init() {
    defaults(this, this.defaults);
    this.listenTo(
      this,
      CHANGE_SELECTED_EVENT_NAME,
      this.onModelSelectedStateChange
    );
  },

  /**
   * Deselect the rest models within a collection
   *
   * @param {Backbone.Model<SelectableItem>} model
   */
  onModelSelectedStateChange(model) {
    if (!this.isMultiSelect && model.isSelected()) {
      this.without(model).forEach((item) => {
        item.deselect({ silent: this.isMultiSelect });
      });
    }
  },
};
