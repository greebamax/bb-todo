import _ from 'lodash';
import BaseController from 'base/controller';
import ListModel from '../lists/list/model';
import TaskListLayout from './layout';

/**
 * @param {Number} id
 * @returns {Boolean}
 */
const isValidListId = id => _.isFinite(parseInt(id, 10));

/**
 * @class TaskListController
 * @extends {Marionette.Object}
 */
export default class TaskListController extends BaseController {
  static get appRoutes() {
    return {
      'lists/:id': 'home',
      'lists/:id/tasks': 'viewListDetails',
      'lists/*other': 'otherwise',
    };
  }

  home(id) {
    this.router.navigateTo(`lists/${id}/tasks`);
  }

  viewListDetails(id) {
    if (isValidListId(id)) {
      this.getView({ id }).then(view => this.show(view));
    } else {
      this.otherwise();
    }
  }

  otherwise() {
    this.router.navigateTo('lists');
  }

  getView(params) {
    const def = new Promise((resolve, reject) => {
      const model = new ListModel(params);
      model.fetch()
        .then(() => resolve(new TaskListLayout({ model })))
        .catch(({ error }) => reject(error));
    });

    return def;
  }
}
