gif-stop
==============

Simply play and pause gifs

## Installation

`npm install gif-stop`

## gifStop([node|nodeList], [object])

Returns a `GifStop` object

```js
imgs = document.getElementsByTagName('img');

// Play the gifs and stop after five seconds
gifs = gifStop(imgs, {
    playOn: 'click',
    onReady: function(gif){
        gif.play()
        setTimout(function(){
            gif.stop()
        }, 5000)
    }
});
```

```js
imgs = document.getElementsByTagName('img');

gifs = gifStop(imgs)

// Plays all gifs
gifs.play()
// Stops all gifs
gifs.stop()
// Removes event handlers
gifs.destroy()
```

### gifStop.setConfig([object])

Option | Default | type | Description
--- | --- | --- | ---
`playOn` | `hover`  | `string`  | Whether you want the gif played on hover or click. Can be set to `hover` or `click`.
`className` | `gif-playing` | `string` | The class you want added to the image when it is playing.
`onPlay` | `null` | `function` | The function is called when the gif is played. It is passed a Gif object.
`onStop` | `null` | `function` | The function is called when the gif is stopped. It is passed a Gif object.
`onReady` | `null` | `function` | The function is called when the gif is loaded and ready to be stopped. It is passed a Gif object.

### gifStop.gif([node], [object])

This takes similar options as `gifStop` and `setConfig`. The main difference is that you can only pass one gif.

Option | Default | type | Description
--- | --- | --- | ---
`className` | `gif-playing` | `string` | The class you want added to the image when it is playing.
`onPlay` | `null` | `function` | The function is called when the gif is played. It is passed a Gif object.
`onStop` | `null` | `function` | The function is called when the gif is stopped. It is passed a Gif object.
`onReady` | `null` | `function` | The function is called when the gif is loaded and ready to be stopped. It is passed a Gif object.


## Contributing

- The tests must pass
- Run `gulp` before publishing to npm so the CoffeeScript will be compiled
