import { defaults } from 'lodash';
import { EVENT_NAME, FIELD_NAME } from './selectable-item';

export default {
  defaults: {
    isMultiSelect: false,
  },

  init() {
    defaults(this, this.defaults);
    this.listenTo(this, EVENT_NAME, this.onModelSelect);
  },

  /**
   * Deselect the rest models within a collection
   *
   * @param {Backbone.Model<SelectableItem>} model
   */
  onModelSelect(model) {
    if (model.get(FIELD_NAME) && !this.isMultiSelect) {
      this.without(model).forEach(item => {
        item.deselect({ silent: true });
      });
    }
  },

  isSelected(model) {
    return Boolean(this.find(model).get(FIELD_NAME));
  },
};
