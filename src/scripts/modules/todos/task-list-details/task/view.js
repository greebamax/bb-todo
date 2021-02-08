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
            checkbox: '[data-action="check"]',
          },
          events: {
            "click @ui.removeBtn": "remove",
            "change @ui.checkbox": "checked",
          },
        },
        options
      )
    );
  }

  remove() {
    this.model.collection.remove(this.model);
  }

  /**
   * @param {JQuery.Event} $event
   */
  checked($event) {
    this.model.set("done", $event.currentTarget.checked);
  }
}
