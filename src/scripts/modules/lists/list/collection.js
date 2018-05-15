import BaseCollection from 'base/collection';
import ListModel from './model';

/**
 * @class TaskListsCollection
 * @extends {Backbone.Collection}
 */
export default class TaskListsCollection extends BaseCollection {
  get url() {
    return 'api/lists';
  }

  get model() {
    return ListModel;
  }
}
