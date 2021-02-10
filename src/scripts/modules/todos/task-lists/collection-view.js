import BaseCollectionView from "base/collection-view";
import LoadingBehavior from "common/behaviors/loading-behavior";
import { childView, className, behaviors } from "common/decorators";
import TaskListView from "./list-item-view";

@className("task-lists")
@childView(TaskListView)
@behaviors([
  {
    behaviorClass: LoadingBehavior,
    listenToOnce: true,
  },
])
export default class TasksListContainerView extends BaseCollectionView {}
