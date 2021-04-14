import get from "lodash/get";
import BaseView from "base/view";
import { EVENT_START, EVENT_STOP } from "common/mixins/synchronized";
import { className, regions, template, ui } from "common/decorators";
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
  add: '[data-action="add"]',
})
export default class TasksListContainerView extends BaseView {
  events() {
    return {
      "click @ui.add": this.onAddListClick,
    };
  }

  initialize(options) {
    this.collection = get(options, "collection", []);
    this.listenTo(this.collection, EVENT_START, () => this.ui.add.hide());
    this.listenTo(this.collection, EVENT_STOP, () => this.ui.add.show());
  }

  onRender() {
    this.ui.add.hide();
    this.showChildView(
      "list",
      new TaskListsCollectionView({
        collection: this.collection,
      })
    );
  }

  onAddListClick() {
    this.collection.add(new TaskListModel());
  }
}
