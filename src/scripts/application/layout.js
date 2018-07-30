import BaseView from 'base/view';
import AppTemplate from './template.hbs';
import HeaderView from './header';

const CONTENT_REGION = 'content';
const HEADER_REGION = 'header';

/**
 * @class ApplicationLayout
 * @extends {Marionette.View}
 */
export default class ApplicationLayout extends BaseView {
  static get contentRegion() { return CONTENT_REGION; }

  static get headerRegion() { return HEADER_REGION; }

  constructor() {
    super({
      template: AppTemplate,
      className: 'app-layout',
      regions: {
        [CONTENT_REGION]: `#${CONTENT_REGION}`,
        [HEADER_REGION]: `#${HEADER_REGION}`,
      },
    });
  }

  onAttach() {
    // this.getRegion(CONTENT_REGION).show(/* ContentView */);
    this.getRegion(HEADER_REGION).show(new HeaderView());
  }
}
