import Bb from 'backbone';
import _ from 'lodash';
import BaseApplication from 'base/application';
import MainLayout from './layout';
import MainRouter from './router';

/**
 * @class Application
 * @extends {Marionette.Application}
 */
export default class Application extends BaseApplication {
  constructor(options) {
    super(_.assign({
      region: '#root',
      channelName: 'app',
      radioRequests: {
        'show:content': 'showContent',
      },
    }, options));
    this.mainRouter = new MainRouter();
  }

  onBeforeStart() {
    const modules = this.getOption('modules');

    _.forEach(modules, module => {
      this.mainRouter.registerSubRouter(module);
    });
  }

  onStart() {
    this.showView(new MainLayout());
    Bb.history.start();
  }

  onBeforeDestroy() {
    this.mainRouter.routers.forEach(router => router.destroy());
  }

  showContent(view) {
    this.getView().getRegion(MainLayout.contentRegion).show(view);
  }
}
