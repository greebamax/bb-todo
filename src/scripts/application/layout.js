import BaseView from 'base/view';
import AppTemplate from './template.hbs';

const SIDEBAR_REGION = 'sidebar';
const MAIN_REGION = 'main';

export default class AppLayout extends BaseView {
  static get sidebarRegion() { return SIDEBAR_REGION; }
  static get mainRegion() { return MAIN_REGION; }

  constructor() {
    super({
      template: AppTemplate,
      tagName: 'section',
      className: 'app',
      regions: {
        [SIDEBAR_REGION]: '#sidebar',
        [MAIN_REGION]: '#main',
      },
    });
  }

  onBeforeShow() {
    this.getRegion(SIDEBAR_REGION).show(/* SideBarView */);
    this.getRegion(MAIN_REGION).show(/* MainRegionView */);
  }
}
