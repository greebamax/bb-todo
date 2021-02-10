import BaseView from "base/view";
import { className, regions, template } from "common/decorators";
import TaskListsLayoutTemplate from "./template.tmpl";

const SIDEBAR_REGION = "sidebar";
const CONTENT_REGION = "task-list";

@className("todos-module")
@template(TaskListsLayoutTemplate)
@regions({
  [SIDEBAR_REGION]: {
    el: `[data-region="${SIDEBAR_REGION}"]`,
    replaceElement: true,
  },
  [CONTENT_REGION]: {
    el: `[data-region="${CONTENT_REGION}"]`,
    replaceElement: true,
  },
})
export default class TodosModuleLayout extends BaseView {
  static get sidebarRegion() {
    return SIDEBAR_REGION;
  }

  static get contentRegion() {
    return CONTENT_REGION;
  }
}
