import extend from "lodash/extend";
import BaseCollectionView from "base/collection-view";
import LoadingBehavior from "common/behaviors/loading-behavior";
import TaskListView from "./list-item-view";

/**
 * @class TasksListContainerView
 * @extends {Marionette.CollectionView}
 */
export default class TasksListContainerView extends BaseCollectionView {
  constructor(options) {
    super(
      extend(
        {
          className: "task-lists",
          childView: TaskListView,
          behaviors: [
            {
              behaviorClass: LoadingBehavior,
              listenToOnce: true,
            },
          ],
        },
        options
      )
    );
  }
}
