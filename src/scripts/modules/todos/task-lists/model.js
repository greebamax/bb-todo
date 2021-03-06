import isString from "lodash/isString";
import has from "lodash/has";
import extend from "lodash/extend";
import BaseModel from "base/model";
import SelectableItem from "common/mixins/selectable-item";
import Synchronized from "common/mixins/synchronized";
import Reversible from "common/mixins/reversible";
import TasksCollection from "../task-list-details/task/collection";

const IS_EDITING = Symbol("is-editing");

export const CHANGE_EDITING_EVENT_NAME = "change:editing";

/**
 * @class TaskList
 * @extends {Backbone.Model}
 */
export default class TaskList extends BaseModel {
  get mixins() {
    return [SelectableItem, Synchronized, Reversible];
  }

  get urlRoot() {
    return "api/lists";
  }

  defaults() {
    return {
      title: "Untitled",
    };
  }

  initialize() {
    this[IS_EDITING] = false;

    this.tasks = new TasksCollection();
  }

  isEditing() {
    return this[IS_EDITING];
  }

  startEdit() {
    this[IS_EDITING] = true;
    this.trigger(CHANGE_EDITING_EVENT_NAME);
  }

  stopEdit() {
    this[IS_EDITING] = false;
    this.trigger(CHANGE_EDITING_EVENT_NAME);
  }

  validate(attrs) {
    if (!isString(attrs.title)) {
      return "Title should be a string";
    }

    if (!/^[A-Za-z\s\d]+$/.test(attrs.title)) {
      return "Title should be valid";
    }

    return undefined;
  }

  parse(response) {
    if (has(response, "tasks")) {
      if (has(this, "tasks")) {
        this.tasks.reset(response.tasks);
      } else {
        this.tasks = new TasksCollection(response.tasks);
      }
      delete response.tasks;
    }

    return response;
  }

  toJSON() {
    const json = BaseModel.prototype.toJSON.apply(this);

    return extend(
      {
        tasks: this.tasks.toJSON(),
      },
      json
    );
  }
}
