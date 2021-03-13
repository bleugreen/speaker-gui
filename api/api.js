var express = require('express');

var api = express.Router();

const modeRoute = require('./routes/mode.js')
const colorRoute = require('./routes/palette.js')

api.use('/mode', modeRoute);
api.use('/palette', colorRoute);

module.exports = api;