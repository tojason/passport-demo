module.exports = function(app, router) {
  app.use('/api/auth', require('./user.js'));
}
