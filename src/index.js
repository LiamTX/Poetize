const express = require('express');
const app = express();

require('dotenv').config();

app.use(express.urlencoded( {extended: true} ));
app.use(express.json());
app.use(express.static("public"));

const nunjucks = require('nunjucks');
nunjucks.configure("src/views", {
    express: app,
    noCache: true
});

const routes = require('./router/routes');
app.use(routes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Started!'));