module.exports = (req, res, next) => {
  const delay = Math.floor(Math.random() * 10) * 100;
  setTimeout(() => {
    next();
  }, delay);
};
