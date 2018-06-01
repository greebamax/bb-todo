import _ from 'lodash';
import Mn from 'backbone.marionette';
import Radio from 'backbone.radio';

const getRoute = (target, routes) =>
  _.get(routes, _.isFunction(target) ? target.name : target, null);

/**
 * @class BaseController
 * @extends Marionette.Object
 */
export default class BaseController extends Mn.Object {
  constructor(options = {}) {
    super(options);

    if (options.router) {
      this.router = options.router;
      this.routes = _.invert(this.__proto__.constructor.appRoutes); // eslint-disable-line
    }
  }

  /**
   * Trigger redirection by controller method name
   *
   * @param {Function|String} target
   * @memberof BaseController
   */
  redirectTo(target) {
    if (!this.router) return;

    const route = getRoute(target, this.routes);

    if (!_.isNull(route)) {
      this.router.redirectTo(route);
    }
  }

  show(view) { // eslint-disable-line
    Radio.channel('app').request('show:content', view);
  }
}
