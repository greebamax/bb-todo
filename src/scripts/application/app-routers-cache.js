import { Events } from "backbone";
import BaseRouter from "base/router";

const routers = Symbol("routers");
const activeRouter = Symbol("active-route");

const isExtendsBaseRouter = (router) =>
  Object.prototype.isPrototypeOf.call(
    Object.getPrototypeOf(BaseRouter),
    router
  );

/**
 * @class AppRoutersCache
 * @extends {Marionette.AppRouter}
 */
export default class AppRoutersCache {
  constructor() {
    this[routers] = new Map();
    this[activeRouter] = null;
  }

  /**
   * @param {BaseRouter} RouterClass
   * @memberof AppRoutersCache
   * @returns {BaseRouter}
   */
  registerRouter(RouterClass) {
    if (!isExtendsBaseRouter(RouterClass)) {
      throw new Error("Attempt to register a malformed RouterClass");
    }

    let targetRouter;

    if (this[routers].has(RouterClass.name)) {
      targetRouter = this.getRouter(RouterClass.name);
    } else {
      // If it not exists, initiate it
      targetRouter = new RouterClass();
      Events.listenTo(targetRouter, "route", this.handleRouteChange.bind(this, RouterClass.name));
      this[routers].set(RouterClass.name, targetRouter);
    }

    return targetRouter;
  }

  /**
   * @param {BaseRouter} RouterClass
   * @memberof AppRoutersCache
   * @returns {Boolean}
   */
  unregisterRouter(RouterClass) {
    if (!isExtendsBaseRouter(RouterClass)) {
      throw new Error("Attempt to unregister a malformed RouterClass");
    }

    return this[routers].delete(RouterClass.name);
  }

  /**
   * Get registered router by name
   *
   * @param {String} name
   * @returns {Marionette.AppRouter|undefined}
   * @memberof AppRoutersCache
   */
  getRouter(name) {
    return this[routers].get(name);
  }

  forEach(cb) {
    return this[routers].forEach(cb);
  }

  isLoaded(module) {
    return this[routers].has(module.name);
  }

  handleRouteChange(router) {
    this[activeRouter] = router;
  }

  /**
   * Get current active router name
   *
   * @returns {Marionette.AppRouter|undefined}
   * @memberof AppRoutersCache
   */
  getActive() {
    return this[activeRouter];
  }
}
