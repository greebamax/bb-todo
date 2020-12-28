import BaseView from "base/view";
import ErrorPageViewTemplate from "./template.tmpl";

/**
 * @class ErrorPageView
 * @extends {Marionette.View}
 */
export default class ErrorPageView extends BaseView {
  constructor() {
    super({
      template: ErrorPageViewTemplate,
    });
  }
}
