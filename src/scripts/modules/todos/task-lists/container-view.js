import extend from "lodash/extend";
import get from "lodash/get";
import BaseView from "base/view";
import { EVENT_START, EVENT_STOP } from "common/mixin/synchronized";
import TaskListsCollectionView from "./collection-view";
import TaskListModel from "./model";
import Template from "./container.tmpl";

/**
 * @class TasksListContainerView
 * @extends {Marionette.CollectionView}
 */
export default class TasksListContainerView extends BaseView {
  constructor(options) {
    super(
      extend(
        {
          className: "tasks-list-container",
          template: Template,
          regions: {
            list: {
              el: '[data-region="list"]',
              replaceElement: true,
            },
          },
          ui: {
            add: '[data-action="add"]',
          },
          events: {
            "click @ui.add": "onAddListClick",
          },
        },
        options
      )
    );
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
