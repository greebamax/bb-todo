import BaseModule from 'base/module';
import ProfileRouter from './router';


export default class ProfileModule extends BaseModule {
  static get router() {
    return ProfileRouter;
  }
}
