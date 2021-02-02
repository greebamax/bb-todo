import extend from "lodash/extend";
import BaseView from "base/view";
import LoadingBehavior from "common/behaviors/loading-behavior";
import Template from "./template.tmpl";
import TodoCollectionView from "./todo/collection-view";

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
        },
        options
      )
    );
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
    if (!this.model.isFetching() && this.model.tasks) {
      this.showChildView(
        "tasks",
        new TodoCollectionView({ collection: this.model.tasks })
      );
    }
  }
}
