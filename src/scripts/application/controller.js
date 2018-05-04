import BaseController from 'base/controller';

export default class AppController extends BaseController {
  static get appRoutes() {
    return {
      '': 'home',
      '*otherwise': 'otherwise',
    };
  }

  home() {
    console.log('main router home');
  }

  otherwise() {
    console.log('main router otherwise');
    this.redirectTo(this.home);
  }
}
