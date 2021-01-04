import BaseController from "base/controller";
import { error } from "helpers/logger";
import TaskListsLayout from "./layout";
import SideBarView from "./sidebar";
import TaskListModel from "./task-lists/model";
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

  homeRoute() {
    this.setToState({ selectedListId: null });
    this.show(this.getLayout());
  }

  redirectToDetailsRoute(id) {
    this.router.navigateTo(`lists/${id}/tasks`);
  }

  redirectToErrorPage() {
    this.router.redirectTo("error");
  }

  listDetailsRoute(id) {
    this.setToState({ selectedListId: id });
    if (!this[layout]) {
      this.show(this.getLayout());
    }
    this.showListDetails();
  }

  otherwise() {
    this.router.navigateTo("lists");
  }

  /**
   * @returns {Marionette.View}
   */
  getLayout() {
    const taskListsLayout = new TaskListsLayout();

    this.listenTo(taskListsLayout, "render", this.onShowLayout);

    this[layout] = taskListsLayout;
    return taskListsLayout;
  }

  /**
   * @param {Marionette.View} taskListsLayout
   */
  onShowLayout(taskListsLayout) {
    taskListsLayout
      .getRegion(TaskListsLayout.sidebarRegion)
      .show(this.getSidebarView());
    taskListsLayout
      .getRegion(TaskListsLayout.contentRegion)
      .show(new TaskListDetailsPlaceholder());
  }

  /**
   * @param {Marionette.View} sidebarView
   */
  onShowSidebar(sidebarView) {
    const selectedListId = this.getFromState("selectedListId");
    const taskLists = new TaskListCollection(null, { selectedListId });
    taskLists.fetch();

    sidebarView
      .getRegion(SideBarView.listsRegion)
      .show(this.getTaskListsView(taskLists));
  }

  getSidebarView() {
    const sidebarView = new SideBarView();

    this.listenTo(sidebarView, "render", this.onShowSidebar);
    this[sidebar] = sidebarView;
    return sidebarView;
  }

  /**
   * @param {Backbone.Collection} taskListCollection
   * @returns {Marionette.CollectionView}
   */
  getTaskListsView(taskListCollection) {
    const taskListsCollectionView = new TasksListsCollectionView({
      collection: taskListCollection,
    });
    this.listenTo(taskListCollection, "change:selected", (model) => {
      if (model.isSelected()) {
        this[sidebar].toggleSidebar(false);
        this.router.navigateTo(`lists/${model.id}/tasks`);
      }
    });
    return taskListsCollectionView;
  }

  /**
   * @param {Backbone.Model} params
   */
  showListDetails() {
    this.abortRequests();

    const listId = this.getFromState("selectedListId");
    const tasksListsModel = new TaskListModel({ id: listId });
    const fetching = tasksListsModel.fetch();

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
        .getRegion(TaskListsLayout.contentRegion)
        .show(new TaskListDetails({ model: tasksListsModel }));
    }
  }
}
