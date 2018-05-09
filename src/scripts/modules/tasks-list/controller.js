import BaseController from 'base/controller';
import TaskListView from './view';

/**
 * @class TaskListController
 * @extends Marionette.Object
 */
export default class TaskListController extends BaseController {
  static get appRoutes() {
    return {
      'task-lists/': 'home',
      'task-lists/*other': 'otherwise',
    };
  }

  getView() {
    const view = new TaskListView();
    this.listenTo(view, {
      show: this.onShow,
    }, this);
    return view;
  }

  home() {
    this.show(this.getView());
  }

  otherwise() {
    this.redirectTo(this.home);
  }
}
