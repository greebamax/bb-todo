import extend from "lodash/extend";
import BaseView from "base/view";
import BaseCollection from "base/collection";
import { KEY_ENTER } from "common/constants";
import LoadingBehavior from "common/behaviors/loading-behavior";
import Template from "./template.tmpl";
import TasksCollectionView from "./task/collection-view";

/**
 * @class TaskListLayout
 * @extends {Marionette.View}
 */
export default class TaskListLayout extends BaseView {
  constructor(options) {
    super(
      extend(
        {
          template: Template,
          behaviors: [LoadingBehavior],
          modelEvents: {
            sync: "render",
          },
          regions: {
            tasks: {
              el: '[data-region="tasks"]',
              replaceElement: true,
            },
          },
          ui: {
            newTaskField: "#new-task",
          },
          events: {
            "keypress @ui.newTaskField": "handleKeypress",
          },
        },
        options
      )
    );
  }

  initialize() {
    this.listenTo(this.model.tasks, "add", this.showTasksList);
    this.listenTo(this.model.tasks, "remove", this.showTasksList);
  }

  serializeData() {
    return extend(
      {
        isFetching: this.model.isFetching(),
      },
      this.model.toJSON()
    );
  }

  onRender() {
    if (!this.model.isFetching()) {
      this.showTasksList();
    }
  }

  showTasksList() {
    if (this.model.tasks) {
      this.showChildView(
        "tasks",
        new TasksCollectionView({ collection: this.model.tasks })
      );
    }
  }

  /**
   * @param {JQuery.Event} $event
   */
  handleKeypress($event) {
    switch ($event.key) {
      case KEY_ENTER:
        this.addTask($event.currentTarget.value);
        this.ui.newTaskField.val(null);
        break;

      default:
        break;
    }
  }

  addTask(content) {
    if (this.model.tasks && this.model.tasks instanceof BaseCollection) {
      this.model.tasks.add({ content, dateAdded: Date.now() });
    }
  }
}
