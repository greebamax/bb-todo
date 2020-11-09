import BaseView from 'base/view';
import HeaderTemplate from './template.tmpl';

/**
 * @class HeaderLayout
 * @extends {Marionette.View}
 */
export default class HeaderLayout extends BaseView {
  constructor() {
    super({
      className: 'header',
      tagName: 'ul',
      template: HeaderTemplate,
    });
  }
}
