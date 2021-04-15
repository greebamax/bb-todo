import get from "lodash/get";
import BaseView from "base/view";
import { className, regions, template, ui } from "common/decorators";
import { KEY_ENTER } from "common/constants";
import TaskListsCollectionView from "./collection-view";
import TaskListModel from "./model";
import Template from "./container.tmpl";

@className("task-lists-container")
@template(Template)
@regions({
  list: {
    el: '[data-region="list"]',
    replaceElement: true,
  },
})
@ui({
  newListSection: ".new-list",
  newListField: "#new-list-name",
})
export default class TasksListContainerView extends BaseView {
  events() {
    return {
      "keypress @ui.newListField": this.onAddList,
    };
  }

  initialize(options) {
    this.collection = get(options, "collection", []);
  }

  onRender() {
    this.showChildView(
      "list",
      new TaskListsCollectionView({
        collection: this.collection,
      })
    );
  }

  onAddList($event) {
    switch ($event.key) {
      case KEY_ENTER:
        this.collection.create(
          new TaskListModel({ title: $event.currentTarget.value })
        );
        this.ui.newListField.val(null);
        break;

      default:
        break;
    }
  }
}
