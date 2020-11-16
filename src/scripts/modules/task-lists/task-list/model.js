import { extend } from 'lodash';
import BaseModel from 'base/model';
import Selectable from 'common/mixin/selectable-item';

/**
 * @class TaskList
 * @extends {Backbone.Model}
 */
export default class TaskList extends BaseModel {
  constructor(options) {
    super(options);
    extend(this, Selectable);
  }

  get urlRoot() {
    return 'api/lists';
  }

  defaults() {
    return {
      title: null,
    };
  }
}
