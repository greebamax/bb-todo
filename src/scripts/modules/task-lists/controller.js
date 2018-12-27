import BaseController from 'base/controller';
import TaskListsLayout from './layout';
import SideBarView from './sidebar';
import TasksListsCollection from './list/collection';
import TasksListsCollectionView from './list/container';
import TaskListPlaceholderView from './list/placeholder';
import TaskListDetailsView from './task-list-details/layout';

const layout = Symbol('layout');

/**
 * @class TaskListsController
 * @extends {Marionette.Object}
 */
export default class TaskListsController extends BaseController {
  static get appRoutes() {
    return {
      lists: 'homeRoute',
    };
  }

  homeRoute() {
    this.show(this.getLayout());
  }

  /**
   * @returns {Marionette.View}
   */
  getLayout() {
    if (this[layout]) return this[layout];

    const taskListsLayout = new TaskListsLayout();

    this.listenTo(taskListsLayout, 'render', this.onShowLayout);

    return taskListsLayout;
  }

  /**
   * @param {Marionette.View} taskListsLayout
   */
  onShowLayout(taskListsLayout) {
    taskListsLayout.getRegion(TaskListsLayout.sidebarRegion).show(this.getSidebarView());
    taskListsLayout.getRegion(TaskListsLayout.contentRegion).show(new TaskListPlaceholderView());
  }

  /**
   * @param {Marionette.View} sidebarView
   */
  onShowSidebar(sidebarView) {
    const taskLists = new TasksListsCollection();
    taskLists.fetch();

    sidebarView.getRegion(SideBarView.listsRegion).show(this.getTaskListsView(taskLists));
  }

  getSidebarView() {
    const sidebarView = new SideBarView();

    this.listenTo(sidebarView, 'render', this.onShowSidebar);

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
    this.listenTo(taskListsCollectionView, 'list-details:show', this.showListDetails);
    return taskListsCollectionView;
  }

  /**
   * @param {Backbone.Model} model
   */
  showListDetails(model) {
    this.getLayout()
      .getRegion(TaskListsLayout.contentRegion)
      .show(this.getListDetailsView(model));
  }

  /**
   * @param {Backbone.Model} listModel
   * @returns {Marionette.View}
   */
  getListDetailsView(listModel) {
    return new TaskListDetailsView({ model: listModel });
  }
}
