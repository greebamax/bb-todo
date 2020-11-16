import { extend } from 'lodash';
import BaseView from 'base/view';
import { EVENT_NAME } from 'common/mixin/selectable-item';
import Template from './template.tmpl';

const SELECTED_CLASS_NAME = '--selected';

/**
 * @class TaskListView
 * @extends {Marionette.View}
 */
export default class TaskListView extends BaseView {
  constructor(options) {
    super(extend({
      events: {
        'click': 'onShowListDetailsClick',
        'click [data-action="delete"]': 'onDeleteClick',
      },
      modelEvents: {
        [EVENT_NAME]: 'onChangeSelectedState',
      },
      template: Template,
    }, options));
  }

  className() {
    return `task-list ${this.model.isSelected() ? SELECTED_CLASS_NAME : ''}`.toString();
  }

  /**
   * @param {JQuery.Event} $event
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

    this.model.select();
    this.trigger('list-details:show', this.model);
  }

  onChangeSelectedState(isSelected) {
    this.$el.toggleClass(SELECTED_CLASS_NAME, isSelected);
  }
}
