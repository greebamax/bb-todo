import { isString, isFunction, bindAll } from "lodash";
import BaseBehavior from "base/behavior";

/**
 * @class ClickOutsideBehavior
 * @extends {BaseBehavior}
 */
export default class ClickOutsideBehavior extends BaseBehavior {
  defaults() {
    return {
      handler: () => {},
      startListeningEvent: null,
      stopListeningEvent: null,
    };
  }

  initialize() {
    bindAll(this, ["handleClickOnDocument"]);

    if (this.options.startListeningEvent) {
      this.listenTo(
        this.view,
        this.options.startListeningEvent,
        this.attachHandler
      );
    }
    if (this.options.stopListeningEvent) {
      this.listenTo(
        this.view,
        this.options.stopListeningEvent,
        this.removeHandler
      );
    }
  }

  onRender() {
    if (!this.options.startListeningEvent) {
      this.attachHandler();
    }
  }

  onDestroy() {
    this.removeHandler();
  }

  attachHandler() {
    document.addEventListener("click", this.handleClickOnDocument);
  }

  removeHandler() {
    document.removeEventListener("click", this.handleClickOnDocument);
  }

  /**
   * @returns {Function}
   * @throws {Error}
   */
  getViewHandler() {
    if (isString(this.options.handler)) {
      return this.view.getOption(this.options.handler);
    }

    if (isFunction(this.options.handler)) {
      return this.options.handler;
    }

    throw new Error(
      `Unsupported handler type: typeof ${this.options.handler} is ${typeof this
        .options.handler}`
    );
  }

  /**
   * @param {JQuery.EventBase} $e
   */
  handleClickOnDocument($e) {
    if (this.view.isRendered()) {
      if (!this.view.$el[0].contains($e.target)) {
        this.getViewHandler().call(this.view, $e);
      }
    }
  }
}
