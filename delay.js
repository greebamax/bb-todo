module.exports = function (req, res, next) {
  var delay = Math.floor((Math.random() * 10)) * 100;
  setTimeout(function () {
    next();
  }, delay);
};
