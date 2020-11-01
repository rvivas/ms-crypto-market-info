const express = require('express');

const app = new express();


app.use(require('./market-info'));

module.exports = app;
