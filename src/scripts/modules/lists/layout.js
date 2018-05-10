import _ from 'lodash';
import BaseView from 'base/view';
import TaskListsViewTemplate from './template.hbs';
import TaskList from './container-view';

/**
 * @export
 * @class TaskListsView
 * @extends {Marionette.View}
 */
export default class TaskListsView extends BaseView {
  constructor(options) {
    super(_.extend({
      template: TaskListsViewTemplate,
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
