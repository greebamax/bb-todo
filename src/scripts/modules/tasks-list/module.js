import Module from 'base/module';

export default class extends Module {
  static get routes() {
    return {
      key: this.method,
    };
  }

  method() {
    console.log('fire method', this);
  }
}
