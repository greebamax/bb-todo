import Radio from "backbone.radio";
import BaseView from "base/view";
import ClickOutsideBehavior from "common/behaviors/click-outside";
import { className, regions, template } from "common/decorators";
import SideBarTemplate from "./template.tmpl";

const LISTS_REGION = "lists-region";
const SIDEBAR_OPENED_CLASSNAME = "--opened";
const EVENTS = {
  OPENED: "sidebar:opened",
  CLOSED: "sidebar:closed",
};
const globalEvents = Radio.channel("app");

@className("sidebar")
@template(SideBarTemplate)
@regions({
  [LISTS_REGION]: {
    el: `[data-region="${LISTS_REGION}"]`,
    replaceElement: true,
  },
})
export default class SideBarLayout extends BaseView {
  static get listsRegion() {
    return LISTS_REGION;
  }

  initialize() {
    this.isSidebarRegionOpened = false;
    this.listenTo(globalEvents, "sidebar:toggle", this.toggleSidebar);
  }

  behaviors() {
    return [
      {
        behaviorClass: ClickOutsideBehavior,
        handler: this.handleOutsideClick,
        startListeningEvent: EVENTS.OPENED,
        stopListeningEvent: EVENTS.CLOSED,
      },
    ];
  }

  toggleSidebar(forceState) {
    if (this.isRendered()) {
      this.isSidebarRegionOpened = this.$el
        .toggleClass(SIDEBAR_OPENED_CLASSNAME, forceState)
        .hasClass(SIDEBAR_OPENED_CLASSNAME);

      this.trigger(this.isSidebarRegionOpened ? EVENTS.OPENED : EVENTS.CLOSED);
    }
  }

  handleOutsideClick() {
    this.toggleSidebar(false);
  }
}
