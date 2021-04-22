var express = require('express');

var api = express.Router();

const modeRoute = require('./routes/mode.js')
const colorRoute = require('./routes/palette.js')
const layerRoute = require('./routes/layer.js')
const activeRoute = require('./routes/active.js')
const sceneRoute = require('./routes/scene.js')
const utilRoute = require('./routes/util.js')

api.use('/mode', modeRoute);
api.use('/palette', colorRoute);
api.use('/layer', layerRoute);
api.use('/scene', sceneRoute);
api.use('/util', utilRoute);

api.use('/active', activeRoute);

module.exports = api;