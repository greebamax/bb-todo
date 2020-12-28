import BaseView from "base/view";
import ProfileViewTemplate from "./template.tmpl";

/**
 * @class ProfileView
 * @extends {Marionette.View}
 */
export default class ProfileView extends BaseView {
  constructor() {
    super({
      template: ProfileViewTemplate,
    });
  }
}
