import { extend } from 'lodash';
import BaseView from 'base/view';
import LoadingBehavior from 'common/behaviors/loading-behavior';
import Template from './template.tmpl';

/**
 * @class TaskListLayout
 * @extends {Marionette.View}
 */
export default class TaskListLayout extends BaseView {
  constructor(options) {
    super(extend({
      template: Template,
      behaviors: [LoadingBehavior],
      modelEvents: {
        'sync': 'render',
      },
    }, options));
  }

  serializeData() {
    return extend({
      cid: this.model.cid,
    }, this.model.toJSON());
  }
}
