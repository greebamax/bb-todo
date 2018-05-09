import BaseController from 'base/controller';

export default class AppController extends BaseController {
  static get appRoutes() {
    return {
      '': 'home',
      '*otherwise': 'otherwise',
    };
  }

  home() {
    this.router.redirectTo('task-lists');
  }

  otherwise() {
    this.redirectTo(this.home);
  }
}
