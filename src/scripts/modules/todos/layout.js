import BaseView from "base/view";
import TaskListsLayoutTemplate from "./template.tmpl";

const SIDEBAR_REGION = "sidebar";
const CONTENT_REGION = "task-list";

/**
 * @class TaskListsLayout
 * @extends {Marionette.View}
 */
export default class TaskListsLayout extends BaseView {
  static get sidebarRegion() {
    return SIDEBAR_REGION;
  }

  static get contentRegion() {
    return CONTENT_REGION;
  }

  constructor() {
    super({
      className: "task-lists-module",
      template: TaskListsLayoutTemplate,
      regions: {
        [SIDEBAR_REGION]: {
          el: `[data-region="${SIDEBAR_REGION}"]`,
          replaceElement: true,
        },
        [CONTENT_REGION]: {
          el: `[data-region="${CONTENT_REGION}"]`,
          replaceElement: true,
        },
      },
    });
  }
}
