import extend from "lodash/extend";
import toString from "lodash/toString";
import BaseView from "base/view";
import ClickOutsideBehavior from "common/behaviors/click-outside";
import { KEY_ENTER, KEY_ESC } from "common/constants";
import { CHANGE_SELECTED_EVENT_NAME } from "common/mixins/selectable-item";
import { template, ui } from "common/decorators";
import { CHANGE_EDITING_EVENT_NAME } from "./model";
import Template from "./list-item.tmpl";

const SELECTED_CLASS_NAME = "--selected";
const EVENTS = {
  LIST_EDIT_START: "list-item-edit:start",
  LIST_EDIT_STOP: "list-item-edit:stop",
};

@template(Template)
@ui({
  listTitleInput: 'input[name="list-title"]',
  deleteBtn: '[data-action="delete"]',
  renameBtn: '[data-action="rename"]',
})
export default class TaskListView extends BaseView {
  events() {
    return {
      "click": this.onShowListDetailsClick,
      "click @ui.deleteBtn": this.onDeleteClick,
      "click @ui.renameBtn": this.onRenameClick,
      "keyup @ui.listTitleInput": this.onTitleInputKeyPress,
      "click @ui.listTitleInput": this.onTitleInputClick,
      "focus @ui.listTitleInput": this.onTitleInputFocus,
      "blur @ui.listTitleInput": this.handleOutsideClick,
    };
  }

  modelEvents() {
    return {
      [CHANGE_EDITING_EVENT_NAME]: this.render,
      [CHANGE_SELECTED_EVENT_NAME]: this.onSelectedStateChange,
    };
  }

  className() {
    return `task-list ${
      this.model.isSelected() ? SELECTED_CLASS_NAME : ""
    }`.toString();
  }

  behaviors() {
    return [
      {
        behaviorClass: ClickOutsideBehavior,
        handler: this.handleOutsideClick,
        startListeningEvent: EVENTS.LIST_EDIT_START,
        stopListeningEvent: EVENTS.LIST_EDIT_STOP,
      },
    ];
  }

  serializeData() {
    return extend(
      {
        isEditing: this.model.isEditing(),
        isNew: this.model.isNew(),
      },
      this.model.toJSON()
    );
  }

  onBeforeRender() {
    this.trigger(
      this.model.isEditing() ? EVENTS.LIST_EDIT_START : EVENTS.LIST_EDIT_STOP
    );
  }

  onRender() {
    this.selectTitleInput();
  }

  /**
   * @param {JQuery.Event} $e
   */
  onDeleteClick($e) {
    $e.preventDefault();
    $e.stopPropagation();

    this.model.destroy({
      wait: true,
    });
  }

  /**
   * @param {JQuery.Event} $e
   */
  onRenameClick($e) {
    $e.preventDefault();
    $e.stopPropagation();

    this.model.startEdit();
  }

  /**
   * @param {JQuery.Event} $e
   */
  onShowListDetailsClick($e) {
    $e.preventDefault();

    if (!this.model.isSelected()) {
      this.model.select();
    }
  }

  /**
   * @param {JQuery.Event} $e
   */
  onTitleInputKeyPress($e) {
    switch ($e.key) {
      case KEY_ESC:
        this.model.revert("title");
        this.model.stopEdit();
        return false;

      case KEY_ENTER:
        this.model.set("title", toString($e.currentTarget.value), {
          silent: true,
        });

        if (this.model.isValid()) {
          this.model.stopEdit();
          this.model.save();
        }
        return false;

      default:
        return false;
    }
  }

  /**
   * @param {JQuery.Event} $e
   */
  onTitleInputClick($e) {
    $e.preventDefault();
    $e.stopPropagation();
    /* to prevent triggering click event on the element */
  }

  /**
   * @param {JQuery.Event} $e
   */
  onTitleInputFocus($e) {
    this.selectTitleInput($e);
  }

  handleOutsideClick() {
    this.model.stopEdit();
  }

  selectTitleInput($e) {
    if (this.isRendered() && this.model.isEditing()) {
      const input = $e ? $e.currentTarget : this.ui.listTitleInput;

      if (input && input.select) {
        input.select();
      }
    }
  }

  onSelectedStateChange() {
    this.$el.toggleClass(SELECTED_CLASS_NAME, this.model.isSelected());
  }
}
