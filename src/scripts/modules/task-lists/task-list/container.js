import _ from 'lodash';
import BaseCollectionView from 'base/collection-view';
import LoadingBehavior from 'common/behaviors/loading-behavior';
import TaskListView from './view';

/**
 * @class TasksListContainerView
 * @extends {Marionette.CollectionView}
 */
export default class TasksListContainerView extends BaseCollectionView {
  constructor(options) {
    super(_.extend({
      tagName: 'ul',
      className: 'nav flex-column',
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
