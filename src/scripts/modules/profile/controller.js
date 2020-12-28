import BaseController from "base/controller";
import ProfileView from "./view";

/**
 * @class ProfileController
 * @extends {Marionette.Object}
 */
export default class ProfileController extends BaseController {
  static get appRoutes() {
    return {
      "profile": "home",
      "profile/*other": "otherwise",
    };
  }

  getView() {
    const view = new ProfileView();
    this.listenTo(
      view,
      {
        show: this.onShow,
      },
      this
    );
    return view;
  }

  home() {
    this.show(this.getView());
  }

  otherwise() {
    this.redirectTo(this.home);
  }
}
