import Handlebars from 'handlebars';
import routeHelper from './route';
import iconHelper from './icon';

Handlebars.registerHelper('route', routeHelper(Handlebars));
Handlebars.registerHelper('icon', iconHelper(Handlebars));
