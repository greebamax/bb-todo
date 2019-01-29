import BaseRouter from 'base/router';
import ErrorModuleCtrl from './controller';

/**
 * @class ErrorModuleRouter
 * @extends {Marionette.AppRouter}
 */
export default class ErrorModuleRouter extends BaseRouter {
  constructor() {
    super();
    this.controller = new ErrorModuleCtrl({ router: this });
    this.processAppRoutes(this.controller, ErrorModuleCtrl.appRoutes);
  }
}
