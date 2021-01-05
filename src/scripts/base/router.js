import Mn from "backbone.marionette";
import assign from "lodash/assign";
import get from "lodash/get";
import isString from "lodash/isString";

const DEFAULT_PREFIX = "#/";

/**
 * @class BaseRouter
 * @extends {Marionette.AppRouter}
 */
export default class BaseRouter extends Mn.AppRouter {
  /**
   * @returns {String}
   */
  get name() {
    return this.options.name || this.constructor.name;
  }

  /**
   * @param {!String} fragment
   * @param {Function} fn
   * @memberof BaseRouter
   */
  route(fragment, fn) {
    const callback = get(this.controller, fn);
    const beforeEachHook = get(this.controller, "beforeEach");
    const afterEachHook = get(this.controller, "afterEach");

    super.route.call(this, fragment, fn, (...args) => {
      if (
        beforeEachHook &&
        Boolean(beforeEachHook.apply(this.controller, args))
      )
        return;
      callback.apply(this.controller, args);
      if (afterEachHook) afterEachHook.apply(this.controller, args);
    });
  }

  /**
   * @param {String} fragment
   * @param {Object} [options]
   * @param {Boolean} [options.trigger=true]
   * @memberof BaseRouter
   */
  redirectTo(fragment, options) {
    if (!isString(fragment)) return;
    this.navigate(
      `${DEFAULT_PREFIX}${fragment}`,
      assign({ trigger: true }, options)
    );
  }

  /**
   * @param {String} fragment
   * @memberof BaseRouter
   */
  navigateTo(fragment) {
    if (!isString(fragment)) return;
    this.navigate(`${DEFAULT_PREFIX}${fragment}`);
  }
}
