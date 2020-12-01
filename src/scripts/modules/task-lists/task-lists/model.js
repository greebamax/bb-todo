import { isString } from 'lodash';
import BaseModel from 'base/model';
import SelectableItem from 'common/mixin/selectable-item';
import Synchronized from 'common/mixin/synchronized';
import Reversible from 'common/mixin/reversible';

const IS_EDITING = Symbol('is-editing');

export const CHANGE_EDITING_EVENT_NAME = 'change:editing';

/**
 * @class TaskList
 * @extends {Backbone.Model}
 */
export default class TaskList extends BaseModel {
  get mixins() {
    return [SelectableItem, Synchronized, Reversible];
  }

  get urlRoot() {
    return 'api/lists';
  }

  defaults() {
    return {
      title: 'Untitled',
    };
  }

  initialize() {
    this[IS_EDITING] = false;
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
      return 'Title should be a string';
    }

    if (!/^[A-Za-z\s\d]+$/.test(attrs.title)) {
      return 'Title should be valid';
    }

    return undefined;
  }
}
