var puppyController = require('./puppy');

module.exports = function (app) {
    puppyController.registerRoutes(app);
};