import BaseCollectionView from "base/collection-view";
import { tagName, className, childView } from "common/decorators";
import TaskView from "./view";

@tagName("ol")
@className("tasks-list")
@childView(TaskView)
export default class TasksCollectionView extends BaseCollectionView {}
