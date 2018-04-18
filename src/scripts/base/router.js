import Mn from 'backbone.marionette';
import _ from 'lodash';

export default class extends Mn.AppRouter {
  route(fragment, fn) {
    const callback = _.get(this.controller, fn);
    const beforeEachHook = _.get(this.controller, 'beforeEach');
    const afterEachHook = _.get(this.controller, 'afterEach');

    return super.route.call(this, fragment, fn, (...args) => {
      if (beforeEachHook && Boolean(beforeEachHook.apply(this.controller, args))) return;
      callback.apply(this, args);
      if (afterEachHook) afterEachHook.apply(this.controller, args);
    });
  }
}
