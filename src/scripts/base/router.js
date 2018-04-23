import Mn from 'backbone.marionette';
import _ from 'lodash';

const DEFAULT_PREFIX = '#/';

/**
 * @class
 * @extends Marionette.AppRouter
 */
export default class BaseRouter extends Mn.AppRouter {
  /**
   * @returns {string}
   */
  get name() {
    return this.options.name || this.constructor.name;
  }

  /**
   * @param {string} name
   */
  set name(name) {
    this.name = name;
  }

  /**
   * @readonly
   * @memberof BaseRouter
   * @returns {string|null}
   */
  get routesRoot() {
    const { routesRoot } = this.options;
    return routesRoot ? `${routesRoot}/` : null;
  }

  /**
   * @param {!string} fragment
   * @param {Function} fn
   * @memberof BaseRouter
   */
  route(fragment, fn) {
    const callback = _.get(this.controller, fn);
    const beforeEachHook = _.get(this.controller, 'beforeEach');
    const afterEachHook = _.get(this.controller, 'afterEach');

    super.route.call(this, fragment, fn, (...args) => {
      if (beforeEachHook && Boolean(beforeEachHook.apply(this.controller, args))) return;
      callback.apply(this, args);
      if (afterEachHook) afterEachHook.apply(this.controller, args);
    });
  }


  /**
   * @param {!string} fragment
   * @param {object} options
   * @param {boolean} [options.trigger=true]
   * @memberof BaseRouter
   */
  redirectTo(fragment = '', options) { // eslint-disable-line
    if (!_.isString(fragment)) return;
    this.navigate(`${DEFAULT_PREFIX}${fragment}`, Object.assign({ trigger: true }, options));
  }
}
