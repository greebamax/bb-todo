import BaseCollection from 'base/collection';
import TodoModel from './model';

export default class TasksCollection extends BaseCollection {
  get url() {
    return 'api/task-lists';
  }

  get model() {
    return TodoModel;
  }

  get completed() {
    return this.filter('completed');
  }

  get remaining() {
    return this.without(...this.filter('completed'));
  }
}
