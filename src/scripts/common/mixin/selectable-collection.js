import { defaults } from 'lodash';
import { EVENT_NAME } from './selectable-item';

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
    if (model.isSelected() && !this.isMultiSelect) {
      this.without(model).forEach(item => {
        item.deselect({ silent: true });
      });
    }
  },

  isSelected(model) {
    const target = this.find(model);
    if (target) {
      return target.isSelected();
    }
    return false;
  },
};
