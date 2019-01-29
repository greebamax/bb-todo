import ErrorPageModuleRouter from './router';
import ErrorPageModuleCtrl from './controller';

export default {
  appRoutes: ErrorPageModuleCtrl.appRoutes,
  name: 'ErrorPageModule',
  router: ErrorPageModuleRouter,
};
