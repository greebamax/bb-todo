import routeHelper from './route';

export default Handlebars => {
  Handlebars.registerHelper('route', routeHelper.bind(routeHelper, Handlebars));
};
