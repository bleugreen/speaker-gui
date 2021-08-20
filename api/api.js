var express = require('express');

var api = express.Router();

const colorRoute = require('./routes/palette.js')
const layerRoute = require('./routes/layer.js')
const sceneRoute = require('./routes/scene.js')
const utilRoute = require('./routes/util.js')

api.use('/palette', colorRoute);
api.use('/layer', layerRoute);
api.use('/scene', sceneRoute);
api.use('/util', utilRoute);

module.exports = api;