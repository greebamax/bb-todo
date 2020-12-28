/* eslint-disable no-undef,no-underscore-dangle */
if (__ENV__ !== "production") {
  // Enable LiveReload
  document.write(
    '<script src="http://localhost:35729/livereload.js?snipver=1"></script>'
  );
}

// start the marionette inspector
if (window.__agent) {
  window.__agent.start(Backbone, Marionette);
}
