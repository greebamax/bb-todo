import Bb from 'backbone';
import _ from 'lodash';
import BaseApplication from 'base/application';
import MainLayout from './layout';
import MainRouter from './router';

/**
 * @export
 * @class
 * @extends {Marionette.Application}
 */
export default class extends BaseApplication {
  constructor(options) {
    super(_.assign({
      region: '#app',
    }, options));

    this.mainRouter = new MainRouter();
  }

  onBeforeStart() {
    const modules = this.getOption('modules');

    _.forEach(modules, module => {
      this.mainRouter.registerSubRouter(module.router);
    });
  }

  onStart() {
    this.showView(new MainLayout());
    Bb.history.start();
  }
}
