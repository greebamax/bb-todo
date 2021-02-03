import extend from "lodash/extend";
import BaseView from "base/view";
import TaskTemplate from "./template.tmpl";

/**
 * @class TaskView
 * @extends {Marionette.View}
 */
export default class TaskView extends BaseView {
  constructor(options) {
    super(
      extend(
        {
          tagName: "li",
          className: "task",
          template: TaskTemplate,
        },
        options
      )
    );
  }
}
