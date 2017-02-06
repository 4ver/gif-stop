(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["gifStop"] = factory();
	else
		root["gifStop"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Gif, GifStop, defaultConfig, gifStop;

	GifStop = __webpack_require__(1);

	Gif = __webpack_require__(2);

	defaultConfig = {
	  playOn: 'hover',
	  className: 'gif-playing',
	  onPlay: null,
	  onPause: null,
	  onReady: null
	};

	gifStop = (function(_this) {
	  return function(nodeList, options) {
	    if (options == null) {
	      options = {};
	    }
	    return new GifStop(nodeList, options, defaultConfig);
	  };
	})(this);

	gifStop.prototype.setConfig = (function(_this) {
	  return function(options) {
	    if (options == null) {
	      options = {};
	    }
	    if (options.playOn != null) {
	      defaultConfig.playOn = options.playOn;
	    }
	    if (options.className != null) {
	      defaultConfig.className = options.className;
	    }
	    defaultConfig.onPlay = options.onPlay;
	    defaultConfig.onPause = options.onPause;
	  };
	})(this);

	gifStop.prototype.gif = (function(_this) {
	  return function(node, options) {
	    return new Gif(node, options, defaultConfig);
	  };
	})(this);

	module.exports = gifStop;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Gif, GifStop;

	Gif = __webpack_require__(2);

	module.exports = GifStop = (function() {
	  var attachEvents, detachEvents, getConfig, getNodeList, gifs, isImgAlreadySetup;

	  gifs = null;

	  getConfig = null;

	  getNodeList = null;

	  attachEvents = null;

	  detachEvents = null;

	  function GifStop(nodeList, options, defaults) {
	    var config, gif, node, _i, _len;
	    config = {
	      playOn: options.playOn || defaults.playOn,
	      className: options.className || defaults.className,
	      onPlay: options.onPlay || defaults.onPlay,
	      onStop: options.onStop || defaults.onStop,
	      onReady: options.onReady || defaults.onReady
	    };
	    gifs = [];
	    this.getConfig = function() {
	      return config;
	    };
	    getNodeList = function() {
	      return nodeList;
	    };
	    if (!(nodeList instanceof NodeList)) {
	      nodeList = [nodeList];
	    }
	    for (_i = 0, _len = nodeList.length; _i < _len; _i++) {
	      node = nodeList[_i];
	      if (node.tagName !== 'IMG' && isImgAlreadySetup(node)) {
	        continue;
	      }
	      gif = new Gif(node, config);
	      gifs.push(gif);
	      attachEvents.apply(this, [gif]);
	    }
	  }

	  GifStop.prototype.play = function() {
	    var gif, _i, _len, _results;
	    _results = [];
	    for (_i = 0, _len = gifs.length; _i < _len; _i++) {
	      gif = gifs[_i];
	      _results.push(gif.play());
	    }
	    return _results;
	  };

	  GifStop.prototype.stop = function() {
	    var gif, _i, _len, _results;
	    _results = [];
	    for (_i = 0, _len = gifs.length; _i < _len; _i++) {
	      gif = gifs[_i];
	      _results.push(gif.stop());
	    }
	    return _results;
	  };

	  GifStop.prototype.destroy = function() {
	    var gif, _i, _len, _results;
	    _results = [];
	    for (_i = 0, _len = gifs.length; _i < _len; _i++) {
	      gif = gifs[_i];
	      _results.push(detachEvents(gif));
	    }
	    return _results;
	  };

	  isImgAlreadySetup = function(img) {
	    return img.classList.contains('gifStop');
	  };

	  attachEvents = function(gif) {
	    var config;
	    config = this.getConfig();
	    if (config.playOn == null) {
	      return;
	    }
	    if (config.playOn === 'hover') {
	      gif.img.addEventListener('mouseenter', gif, false);
	      return gif.img.addEventListener('mouseleave', gif, false);
	    } else if (config.playOn === 'click') {
	      return gif.img.addEventListener('click', gif, false);
	    }
	  };

	  detachEvents = function(gif) {
	    var config;
	    config = this.getConfig();
	    if (config.playOn == null) {
	      return;
	    }
	    if (config.playOn === 'hover') {
	      gif.img.removeEventListener('mouseenter', gif, false);
	      return gif.img.removeEventListener('mouseleave', gif, false);
	    } else if (config.playOn === 'click') {
	      return gif.img.removeEventListener('click', gif, false);
	    }
	  };

	  return GifStop;

	})();


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Gif,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	module.exports = Gif = (function() {
	  var eventHandlers;

	  Gif.prototype.isStopped = null;

	  Gif.prototype.img = null;

	  Gif.prototype.animatedSource = null;

	  Gif.prototype.stoppedSource = null;

	  Gif.prototype.ready = null;

	  Gif.prototype.onPlay = null;

	  Gif.prototype.onStop = null;

	  function Gif(img, options) {
	    var canvas, canvasContext, canvasImage, checkIsLoaded, config, errorLoadingImage, onErrorLoading, onLoaded;
	    this.img = img;
	    this.stop = __bind(this.stop, this);
	    this.play = __bind(this.play, this);
	    config = options;
	    this.getConfig = function() {
	      return config;
	    };
	    this.isStopped = true;
	    this.ready = false;
	    this.animatedSource = this.img.src;
	    this.img.classList.add('gifStop');
	    canvas = document.createElement('canvas');
	    canvasContext = canvas.getContext('2d');
	    canvasImage = new Image();
	    canvasImage.crossOrigin = "anonymous";
	    errorLoadingImage = false;
	    this.isLoaded = false;
	    onLoaded = (function(_this) {
	      return function() {
	        if (_this.isLoaded) {
	          return;
	        }
	        canvas.width = _this.img.naturalWidth;
	        canvas.height = _this.img.naturalHeight;
	        canvasContext.drawImage(canvasImage, 0, 0);
	        _this.stoppedSource = canvas.toDataURL();
	        if (_this.isStopped) {
	          _this.stop(true);
	        } else {
	          _this.play(true);
	        }
	        _this.ready = true;
	        _this.isLoaded = true;
	        if (config.onReady != null) {
	          return config.onReady(_this);
	        }
	      };
	    })(this);
	    checkIsLoaded = function() {
	      if (errorLoadingImage) {
	        return;
	      }
	      if (canvasImage.naturalWidth === 0) {
	        return setTimeout(checkIsLoaded, 10);
	      }
	      return setTimeout(onLoaded, 50);
	    };
	    onErrorLoading = function() {
	      return errorLoadingImage = true;
	    };
	    canvasImage.onload = checkIsLoaded;
	    canvasImage.onerror = onErrorLoading;
	    canvasImage.src = this.animatedSource;
	  }

	  Gif.prototype.play = function(force) {
	    var config;
	    if (force == null) {
	      force = false;
	    }
	    if (!(this.isStopped || force)) {
	      return;
	    }
	    config = this.getConfig();
	    this.img.src = this.animatedSource;
	    this.img.classList.add(config.className);
	    this.isStopped = false;
	    if (config.onPlay != null) {
	      return config.onPlay(this);
	    }
	  };

	  Gif.prototype.stop = function(force) {
	    var config;
	    if (force == null) {
	      force = false;
	    }
	    if (this.isStopped && !force) {
	      return;
	    }
	    config = this.getConfig();
	    this.img.src = this.stoppedSource;
	    this.img.classList.remove(config.className);
	    this.isStopped = true;
	    if (config.onStop != null) {
	      return config.onStop(this);
	    }
	  };

	  Gif.prototype.handleEvent = function(event) {
	    var method;
	    method = "on" + event.type;
	    if (eventHandlers[method] != null) {
	      return eventHandlers[method].apply(this, [event]);
	    }
	  };

	  eventHandlers = {
	    onclick: function() {
	      if (!this.ready) {
	        return;
	      }
	      if (this.isStopped) {
	        return this.play();
	      } else {
	        return this.stop();
	      }
	    },
	    onmouseenter: function() {
	      if (!this.ready) {
	        return;
	      }
	      return this.play();
	    },
	    onmouseleave: function() {
	      if (!this.ready) {
	        return;
	      }
	      return this.stop();
	    }
	  };

	  return Gif;

	})();


/***/ }
/******/ ])
});
