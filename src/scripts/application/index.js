import Bb from 'backbone';
import BaseApplication from 'base/application';
import MainLayout from './layout';

export default class extends BaseApplication {
  constructor() {
    super({
      region: '#app',
    });
  }

  onStart() {
    this.showView(new MainLayout());
    Bb.history.start();
  }
}
