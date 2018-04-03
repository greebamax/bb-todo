/* eslint-disable import/first */
import './plugins';
import $ from 'jquery';
import App from './application';

const app = new App();

$(() => {
  app.start();
});
