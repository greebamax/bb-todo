import BaseBehavior from "base/behavior";
import get from "lodash/get";
import { EVENT_START, EVENT_STOP } from "common/mixins/synchronized";

const LOADING_CLASS_NAME = "--loading";

export default class LoadingBehavior extends BaseBehavior {
  defaults() {
    return {
      listenToOnce: false,
    };
  }

  get modelEvents() {
    return {
      [EVENT_START]: "onStartRequest",
      [EVENT_STOP]: "onStopRequest",
    };
  }

  get collectionEvents() {
    return {
      [EVENT_START]: "onStartRequest",
      [EVENT_STOP]: "onStopRequest",
    };
  }

  onStartRequest() {
    if (!this.options.listenToOnce) {
      this.view.$el.addClass(LOADING_CLASS_NAME);
    }
  }

  onStopRequest() {
    this.view.$el.removeClass(LOADING_CLASS_NAME);
  }

  onBeforeRender() {
    this.view.$el.addClass("loading-behavior");
  }

  onRender() {
    // there should have either model or collection
    const target = get(this, "view.model", get(this, "view.collection"));
    if (target.isFetching && target.isFetching()) {
      this.view.$el.addClass(LOADING_CLASS_NAME);
    }
  }
}
