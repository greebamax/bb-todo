export default (Handlebars, options) => {
  const { fn, hash: { id, to } } = options;
  const escapedText = Handlebars.escapeExpression(fn(this));

  let url = Handlebars.escapeExpression(to);
  url = url.replace(/{[^\s/]+}/g, id); // TODO: implement common replacement functionality

  return new Handlebars.SafeString(`<a href="#/${url}">${escapedText}</a>`);
};
