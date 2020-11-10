import BaseBehavior from 'base/behavior';

const LOADING_CLASS_NAME = '--loading';

export default class LoadingBehavior extends BaseBehavior {
  get modelEvents() {
    return {
      'request': 'onStartRequest',
      'sync': 'onStopRequest',
    };
  }

  get collectionEvents() {
    return {
      'request': 'onStartRequest',
      'sync': 'onStopRequest',
    };
  }

  onStartRequest() {
    this.view.$el.addClass(LOADING_CLASS_NAME);
  }

  onStopRequest() {
    this.view.$el.removeClass(LOADING_CLASS_NAME);
  }

  onBeforeRender() {
    this.view.$el.addClass(`loading-behavior ${LOADING_CLASS_NAME}`);
  }
}
