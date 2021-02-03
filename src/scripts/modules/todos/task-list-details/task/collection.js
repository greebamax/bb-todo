import extend from "lodash/extend";
import BaseCollection from "base/collection";
import Task from "./model";

export default class TasksCollection extends BaseCollection {
  constructor(options) {
    super(
      extend(
        {
          model: Task,
        },
        options
      )
    );
  }
}
