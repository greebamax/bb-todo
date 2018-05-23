import ListsRouter from './router';
import ListsController from './controller';

export default {
  appRoutes: ListsController.appRoutes,
  name: 'ListsModule',
  router: ListsRouter,
};
