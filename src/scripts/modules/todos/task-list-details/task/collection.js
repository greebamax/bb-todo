import BaseCollection from "base/collection";
import Task from "./model";

export default class TasksCollection extends BaseCollection {
  get model() {
    return Task;
  }
}
