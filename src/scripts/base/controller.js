import Mn from "backbone.marionette";
import Radio from "backbone.radio";
import get from "lodash/get";
import invert from "lodash/invert";
import isFunction from "lodash/isFunction";
import isNull from "lodash/isNull";
import BaseModel from "./model";

const getRoute = (target, routes) =>
  get(routes, isFunction(target) ? target.name : target, null);
const requests = Symbol("layout");
const state = Symbol("state");

/**
 * @class BaseController
 * @extends {Marionette.Object}
 */
export default class BaseController extends Mn.Object {
  constructor(options = {}) {
    super(options);

    if (options.router) {
      this.router = options.router;
      this.routes = invert(this.__proto__.constructor.appRoutes); // eslint-disable-line
    }

    this[requests] = [];
    this[state] = new BaseModel();
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

    if (!isNull(route)) {
      this.router.redirectTo(route);
    }
  }

  show(view) {
    Radio.channel("app").request("show:content", view);
  }

  registerRequest(request) {
    this[requests].push(request);
  }

  abortRequests() {
    for (let i = 0; i < this[requests].length; i++) {
      const request = this[requests][i];

      if (
        request !== undefined &&
        request.readyState > 0 &&
        request.readyState < 4
      ) {
        request.abort();
      } else if (request.readyState === 4) {
        this[requests].splice(i, 1);
      }
    }
  }

  setToState(attrs) {
    this[state].set(attrs);
  }

  getFromState(field) {
    return this[state].get(field);
  }
}
