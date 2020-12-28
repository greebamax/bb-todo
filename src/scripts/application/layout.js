import BaseView from "base/view";
import AppTemplate from "./template.tmpl";
import HeaderView from "./header";

const CONTENT_REGION = "app-content";
const HEADER_REGION = "app-header";

/**
 * @class ApplicationLayout
 * @extends {Marionette.View}
 */
export default class ApplicationLayout extends BaseView {
  static get contentRegion() {
    return CONTENT_REGION;
  }

  static get headerRegion() {
    return HEADER_REGION;
  }

  constructor() {
    super({
      template: AppTemplate,
      className: "app-container",
      regions: {
        [CONTENT_REGION]: `[data-region="${CONTENT_REGION}"]`,
        [HEADER_REGION]: `[data-region="${HEADER_REGION}"]`,
      },
    });
  }

  onAttach() {
    this.getRegion(HEADER_REGION).show(new HeaderView());
  }
}
