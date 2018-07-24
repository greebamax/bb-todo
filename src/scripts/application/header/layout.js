import BaseView from 'base/view';
import HeaderTemplate from './template.hbs';

/**
 * @class HeaderLayout
 * @extends {Marionette.View}
 */
export default class HeaderLayout extends BaseView {
  constructor() {
    super({
      className: 'navbar-nav',
      tagName: 'ul',
      template: HeaderTemplate,
    });
  }
}
