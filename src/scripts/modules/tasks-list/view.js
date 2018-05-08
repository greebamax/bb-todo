import BaseView from 'base/view';
import TaskListViewTemplate from './template.hbs';

export default class extends BaseView {
  constructor() {
    super({
      template: TaskListViewTemplate,
    });
  }
}
