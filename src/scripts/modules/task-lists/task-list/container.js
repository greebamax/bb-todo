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
      childView: TaskListView,
      childViewEvents: {
        'list-details:show': 'showListDetails',
      },
      behaviors: [LoadingBehavior],
    }, options));
  }

  showListDetails(model) {
    this.trigger('list-details:show', model);
  }
}
