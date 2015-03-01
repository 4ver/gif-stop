Gif = require './gif.coffee'

module.exports = class GifStop

    # Private
    gifs = null
    getConfig = null
    getNodeList = null
    attachEvents = null
    detachEvents = null

    constructor: (nodeList, options, defaults) ->
        config =
            playOn: options.playOn || defaults.playOn
            className: options.className || defaults.className
            onPlay: options.onPlay || defaults.onPlay
            onStop: options.onStop || defaults.onStop
            onReady: options.onReady || defaults.onReady

        gifs = []

        @getConfig = -> config
        getNodeList = -> nodeList

        nodeList = [nodeList] unless nodeList instanceof NodeList

        for node in nodeList
            continue if node.tagName isnt 'IMG' and isImgAlreadySetup node

            gif = new Gif node, config

            gifs.push(gif)

            attachEvents.apply this, [gif]

    ## Public methods
    play: -> gif.play() for gif in gifs

    stop: -> gif.stop() for gif in gifs

    destroy: -> detachEvents(gif) for gif in gifs

    ## Private methods
    isImgAlreadySetup = (img) -> img.classList.contains 'gifStop'

    attachEvents = (gif) ->
        config = @getConfig()
        return unless config.playOn?
        if config.playOn is 'hover'
            gif.img.addEventListener 'mouseenter', gif, false
            gif.img.addEventListener 'mouseleave', gif, false

        else if config.playOn is 'click'
            gif.img.addEventListener 'click', gif, false

    detachEvents = (gif) ->
        config = @getConfig()
        return unless config.playOn?
        if config.playOn is 'hover'
            gif.img.removeEventListener 'mouseenter', gif, false
            gif.img.removeEventListener 'mouseleave', gif, false

        else if config.playOn is 'click'
            gif.img.removeEventListener 'click', gif, false
