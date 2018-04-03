import Mn from 'backbone.marionette';
import AppTemplate from './template.hbs';

export default class extends Mn.View {
  constructor() {
    super({
      template: AppTemplate,
    });
  }
}
