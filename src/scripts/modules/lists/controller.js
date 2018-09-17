import BaseController from 'base/controller';
import TaskListsLayout from './layout';
import SideBarView from './sidebar';
import TaskListsCollection from './list/collection';
import TaskListsCollectionView from './list/container';
import TaskListPlaceholderView from './list-placeholder';

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

  /**
   * @returns {Marionette.View}
   */
  getLayout() {
    if (this[layout]) return this[layout];

    const taskListsLayout = new TaskListsLayout();

    this.listenTo(taskListsLayout, 'render', this.onShowLayout);

    return taskListsLayout;
  }

  homeRoute() {
    this.show(this.getLayout());
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
    const taskLists = new TaskListsCollection();
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
    const taskListsCollectionView = new TaskListsCollectionView({
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
    console.log('showListDetails', listModel);
  }
}
