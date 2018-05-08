import BaseView from 'base/view';
import ProfileViewTemplate from './template.hbs';

export default class extends BaseView {
  constructor() {
    super({
      template: ProfileViewTemplate,
    });
  }
}
