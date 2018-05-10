import _ from 'lodash';
import BaseRouter from 'base/router';
import ListsController from './controller';

export default class ListsRouter extends BaseRouter {
  static get routesRoot() {
    return 'lists';
  }

  constructor(options) {
    super(_.extend({
      routesRoot: ListsRouter.routesRoot,
    }, options));
    this.controller = new ListsController({ router: this });
    this.processAppRoutes(this.controller, ListsController.appRoutes);
  }
}
