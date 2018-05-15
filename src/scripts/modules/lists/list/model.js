import BaseModel from 'base/model';

/**
 * @class TaskList
 * @extends {Backbone.Model}
 */
export default class TaskList extends BaseModel {
  get urlRoot() {
    return this.collection.url;
  }

  get defaults() {
    return {
      title: null,
    };
  }
}
