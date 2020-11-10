import Radio from 'backbone.radio';
import BaseView from 'base/view';
import HeaderTemplate from './template.tmpl';

/**
 * @class HeaderLayout
 * @extends {Marionette.View}
 */
export default class HeaderLayout extends BaseView {
  constructor() {
    super({
      className: 'app-header',
      template: HeaderTemplate,
      events: {
        'click [id="sidebar-btn"]': 'onSidebarBtnClick',
      },
    });
  }

  onSidebarBtnClick() {
    Radio.channel('app').trigger('sidebar:toggle');
  }
}
