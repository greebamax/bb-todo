import Bb from 'backbone';
import Mn from 'backbone.marionette';
import MainLayout from './layout';

export default class extends Mn.Application {
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
