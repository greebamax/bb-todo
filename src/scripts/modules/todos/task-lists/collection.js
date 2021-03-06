import BaseCollection from "base/collection";
import SelectableCollection from "common/mixins/selectable-collection";
import Synchronized from "common/mixins/synchronized";
import ListModel from "./model";

/**
 * @class TaskListsCollection
 * @extends {Backbone.Collection}
 */
export default class TaskListsCollection extends BaseCollection {
  get mixins() {
    return [SelectableCollection, Synchronized];
  }

  get url() {
    return "api/lists";
  }

  get model() {
    return ListModel;
  }

  initialize(models, { selectedListId } = {}) {
    this.listenToOnce(this, "sync", () => {
      const selectedModel = this.findWhere({ id: selectedListId });
      if (selectedModel && selectedModel.select) {
        selectedModel.select();
      }
    });
  }
}
