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
          ui: {
            removeBtn: '[data-action="remove"]',
          },
          events: {
            "click @ui.removeBtn": "remove",
          }
        },
        options
      )
    );
  }

  remove() {
    this.model.collection.remove(this.model);
  }
}
