import { extend } from 'lodash';
import BaseView from 'base/view';
import TaskListTemplate from './template.tmpl';

/**
 * @class TaskListView
 * @extends {Marionette.View}
 */
export default class TaskListView extends BaseView {
  constructor(options) {
    super(extend({
      className: 'nav-item',
      events: {
        'click [data-action="show-list-details"]': 'onShowListDetailsClick',
        'click [data-action="delete"]': 'onDeleteClick',
      },
      tagName: 'li',
      template: TaskListTemplate,
    }, options));
  }

  /**
   * @param {JQueryEventObject} $event
   */
  onDeleteClick($event) {
    $event.preventDefault();

    this.model.destroy({
      wait: true,
    });
  }

  /**
   * @param {JQuery.Event} $event
   */
  onShowListDetailsClick($event) {
    $event.preventDefault();

    this.trigger('list-details:show', this.model);
  }
}
