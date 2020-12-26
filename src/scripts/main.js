/* eslint-disable import/first */
import './plugins';
import $ from 'jquery';
import './common/partials'; // eslint-disable-line import/extensions
import './helpers/handlebars';
import App from './application';
import modules from './modules';

const app = new App({
  modules,
});

$(() => {
  app.start();
});
