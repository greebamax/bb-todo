import BaseRouter from 'base/router';

const routers = Symbol('routers');
const isExtendsBaseRouter = router =>
  Object.prototype.isPrototypeOf.call(Object.getPrototypeOf(BaseRouter), router);

/**
 * @class AppRoutersCache
 * @extends Marionette.AppRouter
 */
export default class AppRoutersCache {
  constructor() {
    this[routers] = new Map();
  }

  /**
   * @param {BaseRouter} RouterClass
   * @memberof AppRoutersCache
   * @returns {BaseRouter}
   */
  registerRouter(RouterClass) {
    if (!isExtendsBaseRouter(RouterClass)) {
      throw new Error('Attempt to register a malformed RouterClass');
    }

    let targetRouter;

    if (this[routers].has(RouterClass.name)) {
      targetRouter = this.getRouter(RouterClass.name);
    } else {
      // If it not exists, initiate it
      targetRouter = new RouterClass();
      this[routers].set(RouterClass.name, targetRouter);
    }

    return targetRouter;
  }

  /**
   * @param {BaseRouter} RouterClass
   * @memberof AppRoutersCache
   * @returns {boolean}
   */
  unregisterRouter(RouterClass) {
    if (!isExtendsBaseRouter(RouterClass)) {
      throw new Error('Attempt to unregister a malformed RouterClass');
    }

    return this[routers].delete(RouterClass.name);
  }

  /**
   * Get registered router by name
   *
   * @param {string} name
   * @returns {Marionette.AppRouter|undefined}
   * @memberof AppRoutersCache
   */
  getRouter(name) {
    return this[routers].get(name);
  }

  forEach(cb) {
    return this[routers].forEach(cb);
  }
}
