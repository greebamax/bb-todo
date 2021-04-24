import Backbone from "backbone";
import each from "lodash/each";
import extend from "lodash/extend";
import BaseRouter from "base/router";
import AppRoutersCache from "./app-routers-cache";
import AppController from "./controller";

export default class AppRouter extends BaseRouter {
  constructor() {
    super();
    this.controller = new AppController({ router: this });
    this.routersCache = new AppRoutersCache();
    this.processAppRoutes(this.controller, AppController.appRoutes);
  }

  registerSubRouter(module) {
    const handlers = {};
    const redirectionMethodName = `redirectTo${module.name}`;

    extend(this.controller, {
      [redirectionMethodName]: () => {
        if (this.routersCache.isLoaded(module)) return;

        this.routersCache.registerRouter(module.router);

        Backbone.history.loadUrl();
      },
    });

    each(module.appRoutes, (method, route) => {
      handlers[route] = redirectionMethodName;
    });

    this.processAppRoutes(this.controller, handlers);
  }
}
