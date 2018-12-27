import _ from 'lodash';
import BaseController from 'base/controller';
import TaskListsLayout from './layout';
import SideBarView from './sidebar';
import TasksListsModel from './list/model';
import TasksListsCollection from './list/collection';
import TasksListsCollectionView from './list/container';
import TaskListPlaceholderView from './list/placeholder';
import TaskListDetails from './task-list-details';

const layout = Symbol('layout');

/**
 * @param {Number} id
 * @returns {Boolean}
 */
const isValidListId = id => _.isFinite(parseInt(id, 10));

/**
 * @class TaskListsController
 * @extends {Marionette.Object}
 */
export default class TaskListsController extends BaseController {
  static get appRoutes() {
    return {
      'lists': 'homeRoute',
      'lists/:id': 'redirectToDetailsRoute',
      'lists/:id/tasks': 'listDetailsRoute',
      'lists/*other': 'otherwise',
    };
  }

  homeRoute() {
    this.show(this.getLayout());
  }

  redirectToDetailsRoute(id) {
    this.router.navigateTo(`lists/${id}/tasks`);
  }

  listDetailsRoute(id) {
    if (isValidListId(id)) {
      this.showListDetails({ id });
    } else {
      this.otherwise();
    }
  }

  otherwise() {
    this.router.navigateTo('lists');
  }

  /**
   * @returns {Marionette.View}
   */
  getLayout() {
    if (this[layout]) return this[layout];

    const taskListsLayout = new TaskListsLayout();

    this.listenTo(taskListsLayout, 'render', this.onShowLayout);

    this[layout] = taskListsLayout;
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
    this.listenTo(taskListsCollectionView, 'list-details:show', model => {
      this.listDetailsRoute(model[model.idAttribute]);
    });
    return taskListsCollectionView;
  }

  /**
   * @param {Backbone.Model} params
   */
  showListDetails(params) {
    const tasksListsModel = new TasksListsModel(params);
    tasksListsModel.fetch()
      .then(() => {
        this.getLayout()
          .getRegion(TaskListsLayout.contentRegion)
          .show(new TaskListDetails({ model: tasksListsModel }));
      })
      .catch(console.error.bind(console, '[ERROR]: '));
  }
}
