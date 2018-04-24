import _ from 'lodash';
import BaseRouter from 'base/router';
import AppRoutersCache from './app-routers-cache';
import AppController from './controller';

export default class extends BaseRouter {
  constructor() {
    super({
      appRoutes: {},
      controller: new AppController(),
    });
    this.routers = new AppRoutersCache();
  }

  registerSubRouter(RouterClass) {
    const redirectionMethodName = `redirectTo${RouterClass.name}`;

    _.extend(this.controller, {
      [redirectionMethodName]: () => {
        const registeredRouter = this.routers.registerRouter(RouterClass);

        registeredRouter.redirectTo(registeredRouter.homeRoute);
      },
    });

    this.processAppRoutes(this.controller, {
      [RouterClass.routesRoot]: redirectionMethodName,
      [`${RouterClass.routesRoot}/*other`]: redirectionMethodName,
    });
  }
}
