import _ from 'lodash';
import Backbone from 'backbone';
import BaseController from 'base/controller';
import TaskListLayout from './layout';

/**
 * @class TaskListController
 * @extends {Marionette.Object}
 */
export default class TaskListController extends BaseController {
  static get appRoutes() {
    return {
      'lists/:id': 'home',
      'lists/*other': 'otherwise',
    };
  }

  getView(params) {
    return new TaskListLayout({
      model: new Backbone.Model(params),
    });
  }

  home(id) {
    const taskListId = parseInt(id, 10);

    if (!_.isNumber(taskListId)) {
      this.otherwise();
      return;
    }

    this.show(this.getView({
      taskListId,
    }));
  }

  otherwise() {
    this.redirectTo('lists/');
  }
}
