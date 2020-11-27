import { isString } from 'lodash';
import BaseModel from 'base/model';
import SelectableItem from 'common/mixin/selectable-item';
import Synchronized from 'common/mixin/synchronized';
import Reversible from 'common/mixin/reversible';

const IS_EDITING = Symbol('is-editing');

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
    this.trigger('change');
  }

  stopEdit() {
    this[IS_EDITING] = false;
    this.trigger('change');
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
