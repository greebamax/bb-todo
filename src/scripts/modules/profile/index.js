import ProfileRouter from './router';
import ProfileController from './controller';

export default {
  appRoutes: ProfileController.appRoutes,
  name: 'ProfileModule',
  router: ProfileRouter,
};
