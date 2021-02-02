import extend from "lodash/extend";
import BaseView from "base/view";
import TodoTemplate from "./todo-template.tmpl";

/**
 * @class TodoView
 * @extends {Marionette.View}
 */
export default class TodoView extends BaseView {
  constructor(options) {
    super(
      extend(
        {
          tagName: "li",
          className: "todo",
          template: TodoTemplate,
        },
        options
      )
    );
  }
}
