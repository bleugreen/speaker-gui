var express = require('express');

var api = express.Router();

const modeRoute = require('./routes/mode.js')
const colorRoute = require('./routes/palette.js')
const activeRoute = require('./routes/active.js')

api.use('/mode', modeRoute);
api.use('/palette', colorRoute);
api.use('/active', activeRoute);

module.exports = api;