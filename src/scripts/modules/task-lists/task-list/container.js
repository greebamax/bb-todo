import { extend } from 'lodash';
import BaseCollectionView from 'base/collection-view';
import LoadingBehavior from 'common/behaviors/loading-behavior';
import TaskListView from './view';

/**
 * @class TasksListContainerView
 * @extends {Marionette.CollectionView}
 */
export default class TasksListContainerView extends BaseCollectionView {
  constructor(options) {
    super(extend({
      className: 'task-lists',
      childView: TaskListView,
      childViewEvents: {
        'list-details:show': 'showListDetails',
        'list:selected': 'onSelectList',
      },
      behaviors: [LoadingBehavior],
    }, options));
  }

  showListDetails(model) {
    this.trigger('list-details:show', model);
    this.render();
  }

  initialize() {
    this.listenTo(this.collection, 'sync', () => this.render());
  }
}
