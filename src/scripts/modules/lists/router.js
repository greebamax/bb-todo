import BaseRouter from 'base/router';
import TaskListsController from './controller';

/**
 * @class ListsRouter
 * @extends {Marionette.AppRouter}
 */
export default class TaskListsRouter extends BaseRouter {
  constructor() {
    super();
    this.controller = new TaskListsController({ router: this });
    this.processAppRoutes(this.controller, TaskListsController.appRoutes);
  }
}
