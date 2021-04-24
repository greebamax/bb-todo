import Radio from "backbone.radio";
import BaseController from "base/controller";
import TaskListsRouter from "../modules/todos/router";

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

  initialize() {
    this.listenTo(Radio.channel("app"), "sidebar:toggle", this.onOpenSidebar);
  }

  onOpenSidebar() {
    if (this.router.routersCache.getActive() !== TaskListsRouter.name) {
      this.router.redirectTo("lists");
    }
  }
}
