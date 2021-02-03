import extend from "lodash/extend";
import BaseCollectionView from "base/collection-view";
import TaskView from "./view";

/**
 * @class TasksCollectionView
 * @extends {Marionette.CollectionView}
 */
export default class TasksCollectionView extends BaseCollectionView {
  constructor(options) {
    super(
      extend(
        {
          tagName: "ol",
          className: "tasks-list",
          childView: TaskView,
        },
        options
      )
    );
  }
}
