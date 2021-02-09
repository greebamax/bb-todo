import extend from "lodash/extend";
import BaseView from "base/view";
import ClickOutsideBehavior from "common/behaviors/click-outside";
import { EVENTS } from "common/mixins/editable-item";
import { KEY_ENTER, KEY_ESC } from "common/constants";
import TaskTemplate from "./template.tmpl";

/**
 * @class TaskView
 * @extends {Marionette.View}
 */
export default class TaskView extends BaseView {
  constructor(options) {
    super(
      extend(
        {
          ui: {
            removeBtn: '[data-action="remove"]',
            checkbox: '[data-action="check"]',
            editBtn: '[data-action="edit"]',
            contentField: '[data-field="content"]',
          },
        },
        options
      )
    );
  }

  get tagName() {
    return "li";
  }

  get className() {
    return `task ${this.model.get("done") ? "--completed" : ""}`;
  }

  get template() {
    return TaskTemplate;
  }

  events() {
    return {
      "click @ui.removeBtn": this.remove,
      "change @ui.checkbox": this.check,
      "click @ui.editBtn": this.edit,
      "keyup @ui.contentField": this.handleKeypress,
    };
  }

  modelEvents() {
    return {
      [EVENTS.START_EDIT]: this.onEditChanged,
      [EVENTS.STOP_EDIT]: this.onEditChanged,
    };
  }

  behaviors() {
    return [
      {
        behaviorClass: ClickOutsideBehavior,
        handler: this.handleOutsideClick,
        startListeningEvent: "start:edit",
        stopListeningEvent: "stop:edit",
      },
    ];
  }

  serializeData() {
    return extend({ isEditing: this.model.isEditing() }, this.model.toJSON());
  }

  /**
   * @param {JQuery.Event} $e
   */
  remove($e) {
    $e.stopPropagation();
    this.model.collection.remove(this.model);
  }

  /**
   * @param {JQuery.Event} $e
   */
  check($e) {
    $e.stopPropagation();
    this.model.set("done", $e.currentTarget.checked);
  }

  /**
   * @param {JQuery.Event} $e
   */
  edit($e) {
    $e.stopPropagation();
    this.model.startEdit();
  }

  handleOutsideClick() {
    if (this.model.isEditing()) {
      this.model.stopEdit();
    }
  }

  onEditChanged(isEditing) {
    this.trigger(isEditing ? EVENTS.START_EDIT : EVENTS.STOP_EDIT);
    this.render();
  }

  onRender() {
    this.ui.contentField.focus();
  }

  /**
   * @param {JQuery.Event} $e
   */
  handleKeypress($e) {
    switch ($e.key) {
      case KEY_ENTER:
        this.model.set("content", this.ui.contentField.val());
        this.model.stopEdit();
        break;

      case KEY_ESC:
        this.ui.contentField.val(this.model.get("content"));
        this.model.stopEdit();
        break;

      default:
        break;
    }
  }
}
