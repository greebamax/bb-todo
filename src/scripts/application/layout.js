import BaseView from "base/view";
import { className, template, regions } from "common/decorators";
import AppTemplate from "./template.tmpl";
import HeaderView from "./header";

const CONTENT_REGION = "app-content";
const HEADER_REGION = "app-header";

@className("app-container")
@template(AppTemplate)
@regions({
  [CONTENT_REGION]: `[data-region="${CONTENT_REGION}"]`,
  [HEADER_REGION]: `[data-region="${HEADER_REGION}"]`,
})
export default class ApplicationLayout extends BaseView {
  static get contentRegion() {
    return CONTENT_REGION;
  }

  static get headerRegion() {
    return HEADER_REGION;
  }

  onAttach() {
    this.getRegion(HEADER_REGION).show(new HeaderView());
  }
}
