import BaseModule from 'base/module';
import ProfileRouter from './router';
import ProfileController from './controller';

export default class ProfileModule extends BaseModule {
  static get router() {
    return ProfileRouter;
  }

  constructor(options) {
    super(options);
    const RouterClass = this.router;
    this.router = new RouterClass();
    this.controller = new ProfileController({ router: this.router });
  }
}
