import BaseController from 'base/controller';

export default class ProfileController extends BaseController {
  static get appRoutes() {
    return {
      'profile/': 'home',
      'profile/*other': 'otherwise',
    };
  }

  home() {
    console.log('profile home');
  }

  otherwise() {
    console.log('profile otherwise');
    this.redirectTo(this.home);
  }
}
