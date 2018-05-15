import BaseView from 'base/view';
import ProfileViewTemplate from './template.hbs';

/**
 * @class ProfileView
 * @extends {Marionette.View}
 */
export default class ProfileView extends BaseView {
  constructor() {
    super({
      template: ProfileViewTemplate,
    });
  }
}
