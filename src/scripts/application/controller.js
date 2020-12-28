import BaseController from "base/controller";

/**
 * @class ApplicationController
 * @extends {Marionette.Object}
 */
export default class ApplicationController extends BaseController {
  static get appRoutes() {
    return {
      "": "home",
      "*otherwise": "otherwise",
    };
  }

  home() {
    this.router.redirectTo("lists");
  }

  otherwise() {
    this.redirectTo(this.home);
  }
}
