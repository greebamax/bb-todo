import extend from "lodash/extend";
import BaseView from "base/view";
import BaseCollection from "base/collection";
import { KEY_ENTER } from "common/constants";
import LoadingBehavior from "common/behaviors/loading-behavior";
import { regions, template, ui, className } from "common/decorators";
import TaskListTemplate from "./template.tmpl";
import TasksCollectionView from "./task/collection-view";

@template(TaskListTemplate)
@className("task-list-details")
@regions({
  tasks: {
    el: '[data-region="tasks"]',
    replaceElement: true,
  },
})
@ui({
  newTaskField: "#new-task",
})
export default class TaskListLayout extends BaseView {
  events() {
    return {
      "keypress @ui.newTaskField": this.handleKeypress,
    };
  }

  modelEvents() {
    return {
      sync: this.render,
    };
  }

  behaviors() {
    return [
      {
        behaviorClass: LoadingBehavior,
        onSyncStart: this.onModelSyncStart,
        onSyncStop: this.onModelSyncStop,
      },
    ];
  }

  initialize() {
    this.listenTo(this.model.tasks, "add", this.syncTaskList);
    this.listenTo(this.model.tasks, "remove", this.syncTaskList);
    this.listenTo(this.model.tasks, "change:done", this.syncTaskList);
    this.listenTo(this.model.tasks, "change:content", this.syncTaskList);
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
    this.ui.newTaskField.focus();
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

  syncTaskList() {
    this.model.save();
  }

  onModelSyncStart() {
    this.ui.newTaskField.prop("disabled", true);
  }

  onModelSyncStop() {
    this.ui.newTaskField.prop("disabled", false);
  }
}
