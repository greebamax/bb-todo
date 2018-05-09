import _ from 'lodash';
import BaseRouter from 'base/router';
import TaskListRouterCtrl from './controller';

export default class TaskListRouter extends BaseRouter {
  static get routesRoot() {
    return 'task-lists';
  }

  constructor(options) {
    super(_.extend({
      routesRoot: TaskListRouter.routesRoot,
    }, options));
    this.controller = new TaskListRouterCtrl({ router: this });
    this.processAppRoutes(this.controller, TaskListRouterCtrl.appRoutes);
  }
}
