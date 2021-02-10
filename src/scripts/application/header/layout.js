import Radio from "backbone.radio";
import BaseView from "base/view";
import { className, template } from "common/decorators";
import HeaderTemplate from "./template.tmpl";

@className("app-header")
@template(HeaderTemplate)
export default class HeaderLayout extends BaseView {
  events() {
    return {
      'click [id="sidebar-btn"]': this.onSidebarBtnClick,
    };
  }

  onSidebarBtnClick($e) {
    $e.preventDefault();
    $e.stopPropagation();
    Radio.channel("app").trigger("sidebar:toggle");
  }
}
