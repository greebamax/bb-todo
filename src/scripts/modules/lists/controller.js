import BaseController from 'base/controller';
import TaskListsLayout from './layout';
import SideBarView from './sidebar';
import TaskListsCollection from './list/collection';
import TaskListsCollectionView from './list/task-lists-container';

/**
 * @class ListsController
 * @extends {Marionette.Object}
 */
export default class TaskListsController extends BaseController {
  static get appRoutes() {
    return {
      lists: 'home',
    };
  }

  getLayout() {
    const layout = new TaskListsLayout();

    this.listenTo(layout, 'render', this.onShowLayout);

    return layout;
  }

  home() {
    this.show(this.getLayout());
  }

  /**
   * @param {Marionette.View} taskListsLayout
   */
  onShowLayout(taskListsLayout) {
    taskListsLayout.getRegion(TaskListsLayout.sidebarRegion).show(this.getSidebarView());
    // taskListsLayout.getRegion(TaskListsLayout.contentRegion).show()
  }

  /**
   * @param {Marionette.View} sidebarView
   */
  onShowSidebar(sidebarView) {
    const taskLists = new TaskListsCollection();
    taskLists.fetch();

    sidebarView.getRegion(SideBarView.listsRegion).show(new TaskListsCollectionView({
      collection: taskLists,
    }));
  }

  getSidebarView() {
    const sidebarView = new SideBarView();

    this.listenTo(sidebarView, 'render', this.onShowSidebar);

    return sidebarView;
  }
}
