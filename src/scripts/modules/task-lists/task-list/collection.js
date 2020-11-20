import BaseCollection from 'base/collection';
import SelectableCollection from 'common/mixin/selectable-collection';
import Synchronized from 'common/mixin/synchronized';
import ListModel from './model';

/**
 * @class TaskListsCollection
 * @extends {Backbone.Collection}
 */
export default class TaskListsCollection extends BaseCollection {
  get mixins() {
    return [SelectableCollection, Synchronized];
  }

  get url() {
    return 'api/lists';
  }

  get model() {
    return ListModel;
  }
}
