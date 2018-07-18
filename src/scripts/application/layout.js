import BaseView from 'base/view';
import AppTemplate from './template.hbs';

const SIDEBAR_REGION = 'sidebar';
const CONTENT_REGION = 'content';

export default class AppLayout extends BaseView {
  static get sidebarRegion() { return SIDEBAR_REGION; }

  static get contentRegion() { return CONTENT_REGION; }

  constructor() {
    super({
      template: AppTemplate,
      className: 'app-layout',
      regions: {
        [SIDEBAR_REGION]: `#${SIDEBAR_REGION}`,
        [CONTENT_REGION]: `#${CONTENT_REGION}`,
      },
    });
  }

  onBeforeShow() {
    this.getRegion(SIDEBAR_REGION).show(/* SideBarView */);
    this.getRegion(CONTENT_REGION).show(/* contentRegionView */);
  }
}
