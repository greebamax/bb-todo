import BaseController from 'base/controller';

export default class AppController extends BaseController {
  home() {
    console.log('main router home');
  }

  otherwise() {
    console.log('main router otherwise');
    this.redirectTo('notFound');
  }
}
