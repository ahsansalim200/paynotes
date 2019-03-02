const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const mustacheExpress = require('mustache-express');
const app = express();
app.engine('html', mustacheExpress());
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, 'ui')));
//app.set('views', path.join(__dirname, 'ui'));
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

app.use('/', routes);

module.exports = app;