import BaseCollection from 'base/collection';
import SelectableCollection from 'common/mixin/selectable-collection';
import ListModel from './model';

/**
 * @class TaskListsCollection
 * @extends {Backbone.Collection}
 */
export default class TaskListsCollection extends BaseCollection {
  get mixins() {
    return [SelectableCollection];
  }

  get url() {
    return 'api/lists';
  }

  get model() {
    return ListModel;
  }
}
