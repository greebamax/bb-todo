import Mn from 'backbone.marionette';
import _ from 'lodash';

const DEFAULT_PREFIX = '#/';

/**
 * @class BaseRouter
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
   * Returns root route with ending slash to omit triggering navigation to `*otherwise` route of
   * parent router.
   *
   * @readonly
   * @memberof BaseRouter
   * @returns {string}
   */
  static get routesRoot() {
    return _.first(this.name.split('Router')).toLowerCase();
  }

  get homeRoute() {
    const routesRoot = _.get(this.options, 'routesRoot', this.constructor.routesRoot);

    return `${routesRoot}/`;
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
      callback.apply(this.controller, args);
      if (afterEachHook) afterEachHook.apply(this.controller, args);
    });
  }

  /**
   * @param {!string} fragment
   * @param {object} options
   * @param {boolean} [options.trigger=true]
   * @memberof BaseRouter
   */
  redirectTo(fragment = '', options) {
    if (!_.isString(fragment)) return;
    this.navigate(`${DEFAULT_PREFIX}${fragment}`, _.assign({ trigger: true }, options));
  }

  /**
   * @param {!string} fragment
   * @memberof BaseRouter
   */
  navigateTo(fragment = '') {
    if (!_.isString(fragment)) return;
    this.navigate(`${DEFAULT_PREFIX}${fragment}`);
  }
}
