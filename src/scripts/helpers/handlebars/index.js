import routeHelper from './route';
import iconHelper from './icon';

export default Handlebars => {
  Handlebars.registerHelper('route', routeHelper(Handlebars));
  Handlebars.registerHelper('icon', iconHelper(Handlebars));
};
