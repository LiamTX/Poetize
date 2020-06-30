const express = require('express');
const app = express();
const routes = require('./router');

app.use(routes);

app.use(express.urlencoded( {extended: true} ));

app.listen(3000, console.log("Started!"));

module.exports = app; 