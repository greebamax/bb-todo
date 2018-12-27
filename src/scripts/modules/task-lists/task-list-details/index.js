import TaskListRouter from './router';
import TaskListController from './controller';

export default {
  appRoutes: TaskListController.appRoutes,
  name: 'TaskListModule',
  router: TaskListRouter,
};
