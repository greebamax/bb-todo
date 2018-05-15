import _ from 'lodash';
import BaseView from 'base/view';
import TaskListTemplate from './template.hbs';

/**
 * @class TaskListView
 * @extends {Marionette.View}
 */
export default class TaskListView extends BaseView {
  constructor(options) {
    super(_.extend({
      tagName: 'li',
      template: TaskListTemplate,
      events: {
        'click [data-action="delete"]': 'onDeleteClick',
      },
    }, options));
  }

  onDeleteClick() {
    this.model.destroy({
      wait: true,
    });
  }
}
