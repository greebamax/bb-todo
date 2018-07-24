export default Handlebars => options => {
  const {
    fn,
    hash: {
      to,
      className,
    },
  } = options;
  const escapedText = Handlebars.escapeExpression(fn(this));

  let url = Handlebars.escapeExpression(to);
  const passedArgs = Object.keys(options.hash);
  if (passedArgs.length > 1) {
    url = passedArgs.reduce((str, key) => {
      if (key !== 'to') {
        return str.replace(new RegExp(`{${key}}`), options.hash[key]);
      }
      return str;
    }, url);
  }

  return new Handlebars.SafeString(`<a href="#/${url}" class="nav-link ${className || ''}">${escapedText}</a>`);
};
