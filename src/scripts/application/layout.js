import BaseView from 'base/view';
import AppTemplate from './template.hbs';

export default class extends BaseView {
  constructor() {
    super({
      template: AppTemplate,
    });
  }
}
