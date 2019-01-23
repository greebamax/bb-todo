import _ from 'lodash';
import Mn from 'backbone.marionette';
import Radio from 'backbone.radio';

const getRoute = (target, routes) => _.get(routes, _.isFunction(target) ? target.name : target, null);
const requests = Symbol('layout');

/**
 * @class BaseController
 * @extends {Marionette.Object}
 */
export default class BaseController extends Mn.Object {
  constructor(options = {}) {
    super(options);

    if (options.router) {
      this.router = options.router;
      this.routes = _.invert(this.__proto__.constructor.appRoutes); // eslint-disable-line
    }

    this[requests] = [];
  }

  /**
   * Trigger redirection by controller method name
   *
   * @param {Function|string} target
   * @memberof BaseController
   */
  redirectTo(target) {
    if (!this.router) return;

    const route = getRoute(target, this.routes);

    if (!_.isNull(route)) {
      this.router.redirectTo(route);
    }
  }

  show(view) {
    Radio.channel('app').request('show:content', view);
  }

  registerRequest(request) {
    this[requests].push(request);
  }

  abortRequests() {
    for (let i = 0; i < this[requests].length; i++) {
      const request = this[requests][i];

      if (request !== undefined && request.readyState > 0 && request.readyState < 4) {
        request.abort();
      } else if (request.readyState === 4) {
        this[requests].splice(i, 1);
      }
    }
  }
}
