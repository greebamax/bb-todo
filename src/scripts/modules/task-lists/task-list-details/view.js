import { extend } from 'lodash';
import BaseView from 'base/view';
import TaskListLayoutTemplate from './template.tmpl';

/**
 * @class TaskListLayout
 * @extends {Marionette.View}
 */
export default class TaskListLayout extends BaseView {
  constructor(options) {
    super(extend({
      template: TaskListLayoutTemplate,
    }, options));
  }

  serializeData() {
    return extend({
      cid: this.model.cid,
    }, this.model.toJSON());
  }
}
