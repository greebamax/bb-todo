import extend from "lodash/extend";
import BaseView from "base/view";
import Template from "./template.tmpl";

/**
 * @class ListPlaceholderView
 * @extends {Marionette.View}
 */
export default class ListPlaceholderView extends BaseView {
  constructor(options) {
    super(
      extend(
        {
          template: Template,
        },
        options
      )
    );
  }
}
