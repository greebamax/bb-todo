/* eslint-disable import/first */
import './plugins';
import 'bootstrap';
import $ from 'jquery';
import App from './application';
import modules from './modules';

const app = new App({
  modules,
});

$(() => {
  app.start();
});
