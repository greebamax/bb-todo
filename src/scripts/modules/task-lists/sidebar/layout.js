import BaseView from 'base/view';
import SideBarTemplate from './template.tmpl';

const LISTS_REGION = 'lists-region';

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
}
