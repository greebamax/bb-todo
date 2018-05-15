import BaseRouter from 'base/router';
import ProfileCtrl from './controller';

/**
 * @class ProfileRouter
 * @extends {Marionette.AppRouter}
 */
export default class ProfileRouter extends BaseRouter {
  constructor(options) {
    super(options);
    this.controller = new ProfileCtrl({ router: this });
    this.processAppRoutes(this.controller, ProfileCtrl.appRoutes);
  }
}
