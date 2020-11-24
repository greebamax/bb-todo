import { extend, get } from 'lodash';
import BaseView from 'base/view';
import TaskListsCollectionView from './collection-view';
import Template from './container.tmpl';

/**
 * @class TasksListContainerView
 * @extends {Marionette.CollectionView}
 */
export default class TasksListContainerView extends BaseView {
  constructor(options) {
    super(extend({
      className: 'tasks-list-container',
      template: Template,
      regions: {
        list: {
          el: '[data-region="list"]',
          replaceElement: true,
        },
      },
    }, options));
  }

  initialize(options) {
    this.collection = get(options, 'collection', []);
  }

  onRender() {
    this.showChildView('list', new TaskListsCollectionView({
      collection: this.collection,
    }));
  }
}
