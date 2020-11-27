import { extend, toString } from 'lodash';
import BaseView from 'base/view';
import ClickOutsideBehavior from 'common/behaviors/click-outside';
import { KEY_ENTER, KEY_ESC } from 'common/constants';
import Template from './list-item.tmpl';

const SELECTED_CLASS_NAME = '--selected';
const TITLE_INTPUT_SELECTOR = 'input[name="list-title"]';
const EVENTS = {
  LIST_EDIT_START: 'list-item-edit:start',
  LIST_EDIT_STOP: 'list-item-edit:stop',
};

/**
 * @class TaskListView
 * @extends {Marionette.View}
 */
export default class TaskListView extends BaseView {
  constructor(options) {
    super(extend({
      events: {
        'click': 'onShowListDetailsClick',
        'click [data-action="delete"]': 'onDeleteClick',
        'click [data-action="rename"]': 'onRenameClick',
        [`keyup ${TITLE_INTPUT_SELECTOR}`]: 'onTitleInputKeyPress',
        [`click ${TITLE_INTPUT_SELECTOR}`]: 'onTitleInputClick',
        [`focus ${TITLE_INTPUT_SELECTOR}`]: 'onTitleInputFocus',
        [`blur ${TITLE_INTPUT_SELECTOR}`]: 'handleOutsideClick',
      },
      modelEvents: {
        'change': 'render',
      },
      template: Template,
    }, options));
  }

  className() {
    return `task-list ${this.model.isSelected() ? SELECTED_CLASS_NAME : ''}`.toString();
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
    return extend({
      isEditing: this.model.isEditing(),
      isNew: this.model.isNew(),
    }, this.model.toJSON());
  }

  onBeforeRender() {
    this.trigger(this.model.isEditing() ? EVENTS.LIST_EDIT_START : EVENTS.LIST_EDIT_STOP);
  }

  onRender() {
    if (this.model.isNew()) {
      // TODO: start editing mode and focus on input field, disable other models for editing
      console.log('created: ' + JSON.stringify(this.model.toJSON())); // eslint-disable-line
    }

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
      this.trigger('list-details:show', this.model);
    }
  }

  /**
   * @param {JQuery.Event} $e
   */
  onTitleInputKeyPress($e) {
    switch ($e.key) {
      case KEY_ESC:
        this.model.revert('title');
        this.model.stopEdit();
        return false;

      case KEY_ENTER:
        this.model.set('title', toString($e.currentTarget.value), { silent: true });

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
      const input = $e ? $e.currentTarget : this.$(TITLE_INTPUT_SELECTOR).currentTarget;

      if (input && input.select) {
        input.select();
      }
    }
  }
}
