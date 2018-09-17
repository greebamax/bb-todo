import _ from 'lodash';
import BaseView from 'base/view';
import Template from './template.tmpl';

/**
 * @class ListPlaceholderView
 * @extends {Marionette.View}
 */
export default class ListPlaceholderView extends BaseView {
  constructor(options) {
    super(_.extend({
      template: Template,
    }, options));
  }
}
