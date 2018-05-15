import _ from 'lodash';
import BaseView from 'base/view';
import TaskListsLayoutTemplate from './template.hbs';
import TaskList from './container-view';

/**
 * @class TaskListsLayout
 * @extends {Marionette.View}
 */
export default class TaskListsLayout extends BaseView {
  constructor(options) {
    super(_.extend({
      template: TaskListsLayoutTemplate,
      regions: {
        listsContainer: {
          el: '#lists',
          replaceElement: true,
        },
      },
    }, options));
  }

  onRender() {
    this.showChildView('listsContainer', new TaskList({
      collection: this.collection,
    }));
  }
}
