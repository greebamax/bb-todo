import Radio from 'backbone.radio';
import BaseView from 'base/view';
import SideBarTemplate from './template.tmpl';

const LISTS_REGION = 'lists-region';
const SIDEBAR_OPENED_CLASSNAME = '--opened';
const globalEvents = Radio.channel('app');

/**
 * @class SideBarLayout
 * @extends {Marionette.View}
 */
export default class SideBarLayout extends BaseView {
  static get listsRegion() { return LISTS_REGION; }

  constructor() {
    super({
      template: SideBarTemplate,
      className: 'sidebar',
      regions: {
        [LISTS_REGION]: {
          el: `[data-region="${LISTS_REGION}"]`,
          replaceElement: true,
        },
      },
    });
  }

  initialize() {
    this.isSidebarRegionOpened = false;
    this.listenTo(globalEvents, 'sidebar:toggle', this.toggleSidebar);
  }

  toggleSidebar(forceState) {
    if (this.isRendered()) {
      this.isSidebarRegionOpened = this.$el.toggleClass(
        SIDEBAR_OPENED_CLASSNAME,
        forceState,
      );
    }
  }
}
