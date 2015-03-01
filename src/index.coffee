GifStop = require './gifStop.coffee'
Gif = require './gif.coffee'

defaultConfig =
    playOn: 'hover'
    className: 'gif-playing'
    onPlay: null
    onPause: null
    onReady: null

gifStop = (nodeList, options={}) =>
    return new GifStop(nodeList, options, defaultConfig)

gifStop::setConfig = (options = {}) =>
    defaultConfig.playOn = options.playOn if options.playOn?
    defaultConfig.className = options.className if options.className?
    defaultConfig.onPlay = options.onPlay
    defaultConfig.onPause = options.onPause
    return

gifStop::gif = (node, options) =>
    return new Gif(node, options, defaultConfig)

module.exports = gifStop