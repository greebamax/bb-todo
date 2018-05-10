import _ from 'lodash';
import BaseCollectionView from 'base/collection-view';
import TaskListView from './list/view';

/**
 * @export
 * @class TaskListsView
 * @extends {Marionette.CollectionView}
 */
export default class extends BaseCollectionView {
  constructor(options) {
    super(_.extend({
      tagName: 'ul',
      childView: TaskListView,
    }, options));
  }
}
