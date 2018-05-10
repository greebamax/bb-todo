import BaseCollection from 'base/collection';
import ListModel from './model';

/**
 * @export
 * @class ListsCollection
 * @extends {BaseCollection}
 */
export default class ListsCollection extends BaseCollection {
  get url() {
    return 'api/lists';
  }

  get model() {
    return ListModel;
  }
}
