import routeHelper from './route';

export default Handlebars => {
  Handlebars.registerHelper('route', routeHelper(Handlebars));
};
