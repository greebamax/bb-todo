/* eslint-disable import/first */
import './plugins';
import $ from 'jquery';
import 'semantic-ui-css';

import './common/partials';
import './helpers/handlebars';
import App from './application';
import modules from './modules';

const app = new App({
  modules,
});

$(() => {
  app.start();
});
