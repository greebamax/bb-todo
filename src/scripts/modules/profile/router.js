import BaseRouter from 'base/router';

export default class ProfileRouter extends BaseRouter {
  constructor() {
    super({
      appRoutes: {
        'profile/': 'home',
        'profile/*other': 'otherwise',
      },
      controller: {
        home() {
          console.log('profile home page');
        },
        otherwise() {
          console.log('profile otherwise');
          this.redirectTo(this.homeRoute);
        },
      },
    });
  }
}
