import _ from 'lodash';
import BaseCollectionView from 'base/collection-view';
import TaskListView from './list/view';

/**
 * @export
 * @class TasksListContainerView
 * @extends {Marionette.CollectionView}
 */
export default class TasksListContainerView extends BaseCollectionView {
  constructor(options) {
    super(_.extend({
      tagName: 'ul',
      childView: TaskListView,
    }, options));
  }
}
