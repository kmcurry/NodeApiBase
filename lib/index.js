var express = require('express'),
    app = express(),
    routes = require('./routes');

app.use(express.logger());
app.use(express.compress());
app.use(express.methodOverride());
app.use(express.bodyParser());

routes(app);

function start(port) {
    console.log("Starting server");
    app.listen(port);
    console.log("Listening on port " + port);
}

module.exports = {
    start: start
};