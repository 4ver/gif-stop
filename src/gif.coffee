module.exports = class Gif
    isStopped: null
    img: null
    animatedSource: null
    stoppedSource: null
    ready: null
    onPlay: null
    onStop: null

    constructor: (@img, options) ->
        config = options

        @getConfig = -> config

        @isStopped = true
        @ready = false
        @animatedSource = @img.src

        @img.classList.add 'gifStop'

        canvas = document.createElement 'canvas'
        canvasContext = canvas.getContext '2d'

        canvasImage = new Image()

        canvasImage.crossOrigin = "anonymous"

        errorLoadingImage = false

        @isLoaded = false

        onLoaded = =>
            return if @isLoaded
            canvas.width = @img.naturalWidth
            canvas.height = @img.naturalHeight

            canvasContext.drawImage canvasImage, 0, 0

            @stoppedSource = canvas.toDataURL()

            if @isStopped then @stop(true) else @play(true)

            @ready = true
            @isLoaded = true
            config.onReady(this) if config.onReady?


        checkIsLoaded = ->
            return if errorLoadingImage
            return setTimeout checkIsLoaded, 10 if canvasImage.naturalWidth is 0
            setTimeout onLoaded, 50

        onErrorLoading = -> errorLoadingImage = true

        canvasImage.onload = checkIsLoaded
        canvasImage.onerror = onErrorLoading

        canvasImage.src = @animatedSource

    play: (force=false) =>
        return unless @isStopped or force
        config = @getConfig()
        @img.src = @animatedSource
        @img.classList.add config.className
        @isStopped = false
        config.onPlay this if config.onPlay?

    stop: (force=false) =>
        return if @isStopped and not force
        config = @getConfig()
        @img.src = @stoppedSource
        @img.classList.remove config.className
        @isStopped = true
        config.onStop this if config.onStop?


    # Event handling
    handleEvent: (event) ->
        method = "on#{event.type}"
        eventHandlers[method].apply this, [event] if eventHandlers[method]?

    eventHandlers =
        onclick: () ->
            return unless @ready
            if @isStopped then @play() else @stop()

        onmouseenter: () ->
            return unless @ready
            @play()

        onmouseleave: () ->
            return unless @ready
            @stop()
