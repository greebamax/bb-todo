import { isString } from 'lodash';
import BaseModel from 'base/model';
import SelectableItem from 'common/mixin/selectable-item';
import Synchronized from 'common/mixin/synchronized';
import Reversible from 'common/mixin/reversible';

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
      editing: false,
    };
  }

  get isEditing() {
    return this.get('editing');
  }

  startEdit() {
    this.set('editing', true);
  }

  stopEdit() {
    this.set('editing', false);
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
