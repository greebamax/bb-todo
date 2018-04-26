import _ from 'lodash';
import BaseRouter from 'base/router';
import AppRoutersCache from './app-routers-cache';
import AppController from './controller';

export default class AppRouter extends BaseRouter {
  constructor() {
    super();
    this.ctrl = new AppController({ router: this });
    this.routers = new AppRoutersCache();
    this.processAppRoutes(this.ctrl, {
      '': 'home',
      '*otherwise': 'otherwise',
    });
  }

  registerSubRouter(RouterClass) {
    const redirectionMethodName = `redirectTo${RouterClass.name}`;

    _.extend(this.ctrl, {
      [redirectionMethodName]: () => {
        const registeredRouter = this.routers.registerRouter(RouterClass);

        registeredRouter.redirectTo(registeredRouter.homeRoute);
      },
    });

    this.processAppRoutes(this.ctrl, {
      // Set 2 routes in such way to handle both cases:
      //    navigate throw `routesRoot/` and `routesRoot/*other` to ensure that target RouterClass
      //    will be always initialized. Static method `routesRoot` returns root route with ending
      //    slash to omit triggering navigation to `*otherwise` route of parent router.
      [RouterClass.routesRoot]: redirectionMethodName,
      [`${RouterClass.routesRoot}/*other`]: redirectionMethodName,
    });
  }
}
