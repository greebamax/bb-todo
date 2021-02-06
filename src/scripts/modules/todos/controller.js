import BaseController from "base/controller";
import { error } from "helpers/logger";
import TodosModuleLayout from "./layout";
import SideBarView from "./sidebar";
import TaskListCollection from "./task-lists/collection";
import TasksListsCollectionView from "./task-lists/container-view";
import TaskListDetailsPlaceholder from "./task-list-details/placeholder";
import TaskListDetails from "./task-list-details";

const layout = Symbol("layout");
const sidebar = Symbol("sidebar");

/**
 * @class TaskListsController
 * @extends {Marionette.Object}
 */
export default class TaskListsController extends BaseController {
  static get appRoutes() {
    return {
      "lists": "homeRoute",
      "lists/:id": "redirectToDetailsRoute",
      "lists/:id/tasks": "listDetailsRoute",
      "lists/*other": "otherwise",
    };
  }

  initialize() {
    this.selectedListId = null;
    this.taskLists = new TaskListCollection();
    this.taskLists.fetch();
  }

  homeRoute() {
    this.show(this.getLayout());
  }

  redirectToDetailsRoute(id) {
    this.router.navigateTo(`lists/${id}/tasks`);
  }

  redirectToErrorPage() {
    this.router.redirectTo("error");
  }

  listDetailsRoute(id) {
    this.selectedListId = id;

    if (!this[layout]) {
      this.show(this.getLayout());
    }

    if (this.taskLists) {
      if (!this.taskLists.isSynchronized()) {
        this.listenToOnce(this.taskLists, "sync", () => {
          this.showListDetails(this.taskLists.get(id));
          const selectedModel = this.taskLists.findWhere({ id });
          if (selectedModel && selectedModel.select) {
            selectedModel.select();
          }
        });
      } else {
        this.showListDetails(this.taskLists.get(id));
      }
    }
  }

  otherwise() {
    this.router.navigateTo("lists");
  }

  /**
   * @returns {Marionette.View}
   */
  getLayout() {
    const moduleLayout = new TodosModuleLayout();

    this.listenTo(moduleLayout, "render", this.onShowLayout);

    this[layout] = moduleLayout;
    return moduleLayout;
  }

  /**
   * @param {Marionette.View} todosModuleLayout
   */
  onShowLayout(todosModuleLayout) {
    todosModuleLayout
      .getRegion(TodosModuleLayout.sidebarRegion)
      .show(this.getSidebarView());
    todosModuleLayout
      .getRegion(TodosModuleLayout.contentRegion)
      .show(new TaskListDetailsPlaceholder());
  }

  /**
   * @param {Marionette.View} sidebarView
   */
  onShowSidebar(sidebarView) {
    sidebarView
      .getRegion(SideBarView.listsRegion)
      .show(this.getTaskListsView(this.taskLists));
  }

  getSidebarView() {
    const sidebarView = new SideBarView();

    this.listenTo(sidebarView, "render", this.onShowSidebar);
    this[sidebar] = sidebarView;
    return sidebarView;
  }

  /**
   * @param {Backbone.Collection} taskLists
   * @returns {Marionette.CollectionView}
   */
  getTaskListsView(taskLists) {
    const taskListsCollectionView = new TasksListsCollectionView({
      collection: taskLists,
    });
    this.listenTo(taskLists, "change:selected", (model) => {
      if (model.isSelected()) {
        this[sidebar].toggleSidebar(false);
        this.router.navigateTo(`lists/${model.id}/tasks`);
      }
    });
    return taskListsCollectionView;
  }

  /**
   * @param {Backbone.Model} list
   */
  showListDetails(list) {
    this.abortRequests();

    if (list) {
      const fetching = list.fetch();

      fetching.catch((resp) => {
        if (resp.status) {
          // check if not aborted by controller
          error(resp.status, resp.statusText);
          this.redirectToErrorPage({
            statusCode: resp.status,
            statusText: resp.statusText,
          });
        }
      });
      this.registerRequest(fetching);

      if (this[layout] && this[layout].isRendered()) {
        this[layout]
          .getRegion(TodosModuleLayout.contentRegion)
          .show(new TaskListDetails({ model: list }));
      }
    }
  }
}
