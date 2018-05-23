import BaseController from 'base/controller';
import ListsLayout from './layout';
import ListsCollection from './list/collection';

/**
 * @class ListsController
 * @extends {Marionette.Object}
 */
export default class ListsController extends BaseController {
  static get appRoutes() {
    return {
      lists: 'home',
    };
  }

  getLayout() {
    const taskLists = new ListsCollection();
    taskLists.fetch();

    const layout = new ListsLayout({
      collection: taskLists,
    });

    return layout;
  }

  home() {
    this.show(this.getLayout());
  }
}
