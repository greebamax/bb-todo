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
    if (!/\d{1,}/.test(id)) {
      this.otherwise();
    }

    this.show(this.getView({
      id,
    }));
  }

  otherwise() {
    this.router.navigateTo('lists');
  }
}
