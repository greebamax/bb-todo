import BaseModel from 'base/model';
import SelectableItem from 'common/mixin/selectable-item';
import Synchronized from 'common/mixin/synchronized';

/**
 * @class TaskList
 * @extends {Backbone.Model}
 */
export default class TaskList extends BaseModel {
  get mixins() {
    return [SelectableItem, Synchronized];
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
}
