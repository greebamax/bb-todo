import BaseView from 'base/view';
import SideBarTemplate from './template.hbs';

const LISTS_REGION = 'listsRegion';

/**
 * @class SideBarLayout
 * @extends {Marionette.View}
 */
export default class SideBarLayout extends BaseView {
  static get listsRegion() { return LISTS_REGION; }

  constructor() {
    super({
      template: SideBarTemplate,
      className: 'sidebar__inner',
      regions: {
        [LISTS_REGION]: {
          el: `[data-region="${LISTS_REGION}"]`,
          replaceElement: true,
        },
      },
    });
  }
}
