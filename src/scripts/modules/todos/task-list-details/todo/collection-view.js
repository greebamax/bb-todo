import extend from "lodash/extend";
import BaseCollectionView from "base/collection-view";
import TodoView from "./view";

/**
 * @class TodoCollectionView
 * @extends {Marionette.CollectionView}
 */
export default class TodoCollectionView extends BaseCollectionView {
  constructor(options) {
    super(
      extend(
        {
          tagName: "ol",
          className: "todos",
          childView: TodoView,
        },
        options
      )
    );
  }
}
