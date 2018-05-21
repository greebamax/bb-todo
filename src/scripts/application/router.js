import _ from 'lodash';
import Backbone from 'backbone';
import BaseRouter from 'base/router';
import AppRoutersCache from './app-routers-cache';
import AppController from './controller';

export default class AppRouter extends BaseRouter {
  constructor(options) {
    super(options);
    this.controller = new AppController({ router: this });
    this.routers = new AppRoutersCache();
    this.processAppRoutes(this.controller, AppController.appRoutes);
  }

  registerSubRouter(RouterClass) {
    const redirectionMethodName = `redirectTo${RouterClass.name}`;

    _.extend(this.controller, {
      [redirectionMethodName]: () => {
        const registeredRouter = this.routers.registerRouter(RouterClass);
        const route = /:/.test(registeredRouter.homeRoute) // assume that parametrical route might be only of child route
          ? Backbone.history.getFragment()
          : registeredRouter.homeRoute;

        registeredRouter.redirectTo(route);
      },
    });

    this.processAppRoutes(this.controller, {
      [RouterClass.routesRoot]: redirectionMethodName,
    });
  }
}
