import BaseRouter from 'base/router';
import ListsController from './controller';

/**
 * @class ListsRouter
 * @extends {Marionette.AppRouter}
 */
export default class ListsRouter extends BaseRouter {
  constructor() {
    super();
    this.controller = new ListsController({ router: this });
    this.processAppRoutes(this.controller, ListsController.appRoutes);
  }
}
