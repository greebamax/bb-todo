import BaseController from 'base/controller';
import ErrorPageView from './view';

/**
 * @class ErrorModuleCtrl
 * @extends {Marionette.Object}
 */
export default class ErrorModuleCtrl extends BaseController {
  static get appRoutes() {
    return {
      'error': 'homeRoute',
      'error/*other': 'otherwiseRoute',
    };
  }

  getView() {
    const view = new ErrorPageView();
    this.listenTo(view, {
      show: this.onShow,
    }, this);
    return view;
  }

  homeRoute() {
    this.show(this.getView());
  }

  otherwiseRoute() {
    this.redirectTo(this.homeRoute);
  }
}
