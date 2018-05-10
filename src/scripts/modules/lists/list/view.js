import _ from 'lodash';
import BaseView from 'base/view';
import Template from './template.hbs';

/**
 * @export
 * @class TaskListsView
 * @extends {Marionette.View}
 */
export default class TaskListsView extends BaseView {
  constructor(options) {
    super(_.extend({
      tagName: 'li',
      template: Template,
    }, options));
  }
}
