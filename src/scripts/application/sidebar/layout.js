import BaseView from 'base/view';
import SideBarTemplate from './template.hbs';

/**
 * @class SideBarLayout
 * @extends {Marionette.View}
 */
export default class SideBarLayout extends BaseView {
  constructor() {
    super({
      template: SideBarTemplate,
      className: 'header',
    });
  }
}
