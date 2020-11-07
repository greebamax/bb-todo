import { isFinite } from 'lodash';
import BaseController from 'base/controller';
import { error } from 'helpers/logger';
import TaskListsLayout from './layout';
import SideBarView from './sidebar';
import TaskListModel from './task-list/model';
import TaskListCollection from './task-list/collection';
import TasksListsCollectionView from './task-list/container';
import TaskListDetailsPlaceholder from './task-list-details/placeholder';
import TaskListDetails from './task-list-details';

const layout = Symbol('layout');

/**
 * @param {Number} id
 * @returns {Boolean}
 */
const isValidListId = id => isFinite(parseInt(id, 10));

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

  redirectToErrorPage() {
    this.router.redirectTo('error');
  }

  listDetailsRoute(id) {
    if (isValidListId(id)) {
      if (!this[layout]) {
        this.show(this.getLayout());
      }
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
    taskListsLayout.getRegion(TaskListsLayout.contentRegion).show(new TaskListDetailsPlaceholder());
  }

  /**
   * @param {Marionette.View} sidebarView
   */
  onShowSidebar(sidebarView) {
    const taskLists = new TaskListCollection();
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
    this.abortRequests();
    const tasksListsModel = new TaskListModel(params);
    const fetching = tasksListsModel.fetch();
    fetching
      .then(() => {
        this[layout]
          .getRegion(TaskListsLayout.contentRegion)
          .show(new TaskListDetails({ model: tasksListsModel }));
      })
      .catch(resp => {
        if (resp.status) { // check if not aborted by controller
          error(resp.status, resp.statusText);
          this.redirectToErrorPage({
            statusCode: resp.status,
            statusText: resp.statusText,
          });
        }
      });
    this.registerRequest(fetching);
  }
}
