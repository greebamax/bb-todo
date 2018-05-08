import BaseModule from 'base/module';
import TaskListRouter from './router';

export default class TaskListModule extends BaseModule {
  static get router() {
    return TaskListRouter;
  }
}
