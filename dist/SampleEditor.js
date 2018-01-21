(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("SampleEditor", [], factory);
	else if(typeof exports === 'object')
		exports["SampleEditor"] = factory();
	else
		root["SampleEditor"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Base class for all ui
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Author: Rikard Lindstrom <hi@rikard.io>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Filename: CanvasUI.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

var _props = __webpack_require__(3);

var _props2 = _interopRequireDefault(_props);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultProperties = {
  width: 640,
  height: 320,
  hZoom: 1,
  visible: true,
  duration: 'auto',
  color: '#fff',
  background: '#333',
  buffer: null
};

var CanvasUI = function () {
  function CanvasUI(defaults, props) {
    var _this = this;

    _classCallCheck(this, CanvasUI);

    this.props = new _props2.default(defaultProperties, defaults, props);
    this.props.$on('change', function (_) {
      _this.dirty = true;
    });
    this.dirty = true;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
  }

  _createClass(CanvasUI, [{
    key: 'renderIfDirty',
    value: function renderIfDirty() {
      if (!this.dirty) return this;
      this.clear();
      if (!this.props.visible) return this;
      return this.render();
    }
  }, {
    key: 'clear',
    value: function clear() {
      // clear canvas and update width / height
      this.canvas.width = this.props.width;
      this.canvas.height = this.props.height;
    }
  }, {
    key: 'duration',
    get: function get() {
      return this.props.duration === 'auto' ? this.props.buffer ? this.props.buffer.duration : 0 : this.props.duration;
    }
  }, {
    key: 'displayDuration',
    get: function get() {
      return this.duration / this.props.hZoom;
    }
  }]);

  return CanvasUI;
}();

exports.default = CanvasUI;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @Author: Rikard Lindstrom <hi@rikard.io>
 * @Filename: index.js
 */



Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SampleEditor = __webpack_require__(2);

var _SampleEditor2 = _interopRequireDefault(_SampleEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// expose on window
if (undefined !== undefined) {
  undefined.SampleEditor = _SampleEditor2.default;
}
exports.default = _SampleEditor2.default;
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CanvasUI2 = __webpack_require__(0);

var _CanvasUI3 = _interopRequireDefault(_CanvasUI2);

var _Waveform = __webpack_require__(5);

var _Waveform2 = _interopRequireDefault(_Waveform);

var _Ruler = __webpack_require__(6);

var _Ruler2 = _interopRequireDefault(_Ruler);

var _LineMarker = __webpack_require__(7);

var _LineMarker2 = _interopRequireDefault(_LineMarker);

var _LoopMarker = __webpack_require__(8);

var _LoopMarker2 = _interopRequireDefault(_LoopMarker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Main program, compiles everything onto one canvas and handles interaction
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Author: Rikard Lindstrom <hi@rikard.io>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Filename: SampleEditor.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var defaultProperties = {
  hZoom: 1,
  vZoom: 2,
  offset: 0,
  background: '#ddd',
  color: '#222',
  width: 640,
  height: 320,
  channel: 0,
  resolution: 1,
  startPosition: 42.1,
  uiZoomStickiness: 0.1,
  duration: 'auto',
  visible: true,
  loop: true,
  loopStart: 0,
  loopEnd: 1,
  selectStart: 0,
  selectEnd: 0,
  quantize: 0.0125,
  buffer: null

};

var SampleEditor = function (_CanvasUI) {
  _inherits(SampleEditor, _CanvasUI);

  function SampleEditor(props) {
    _classCallCheck(this, SampleEditor);

    var _this = _possibleConstructorReturn(this, (SampleEditor.__proto__ || Object.getPrototypeOf(SampleEditor)).call(this, defaultProperties, props));

    _this.waveForm = new _Waveform2.default({});
    _this.ruler = new _Ruler2.default({});
    _this.startMarker = new _LineMarker2.default({});
    _this.zoomMarker = new _LineMarker2.default({ visible: false });
    _this.loopLengthMarker = new _LoopMarker2.default({ visible: true });
    _this.loopStartMarker = new _LineMarker2.default({ visible: true });
    _this.loopEndMarker = new _LineMarker2.default({ dir: -1, visible: true });

    _this.waveForm.props.$link(_this.props);
    _this.ruler.props.$link(_this.props, ['hZoom', 'width', 'offset', 'quantize', 'buffer']).$map(_this.props, { height: function height(v) {
        return v / 16;
      } });
    _this.zoomMarker.props.$link(_this.props, ['height']);
    _this.loopEndMarker.props.$link(_this.props, ['height']).$map(_this.props, { width: function width(v) {
        return v / 64;
      } });
    _this.loopStartMarker.props.$link(_this.props, ['height']).$map(_this.props, { width: function width(v) {
        return v / 64;
      } });
    _this.loopLengthMarker.props.$map(_this.props, {
      height: function height(v) {
        return v / 32;
      }
    });

    _this.startMarker.props.$link(_this.props, ['height']).$map(_this.props, { width: function width(v) {
        return v / 64;
      } });

    _this.render = _this.render.bind(_this);

    _this._setupUI();

    _this.props.$on('defered_change', _this.renderIfDirty, _this);

    _this.zoomMarker.props.$observe('visible', _this.renderIfDirty, _this);

    _this.canvas.classList.add('SampleEditor');
    return _this;
  }

  _createClass(SampleEditor, [{
    key: 'render',
    value: function render() {
      var ctx = this.ctx;

      ctx.drawImage(this.waveForm.renderIfDirty().canvas, 0, 0);
      ctx.drawImage(this.zoomMarker.renderIfDirty().canvas, this.zoomMarker.position, 0);

      ctx.drawImage(this.ruler.renderIfDirty().canvas, 0, 0);

      ctx.drawImage(this.startMarker.renderIfDirty().canvas, this._timeToPixel(this.props.startPosition), 10);

      this.loopLengthMarker.props.width = this._timeToPixel(this.props.loopEnd) - this._timeToPixel(this.props.loopStart);

      ctx.drawImage(this.loopLengthMarker.renderIfDirty().canvas, this._timeToPixel(this.props.loopStart), 20);
      ctx.drawImage(this.loopStartMarker.renderIfDirty().canvas, this._timeToPixel(this.props.loopStart), 20);
      ctx.drawImage(this.loopEndMarker.renderIfDirty().canvas, this._timeToPixel(this.props.loopEnd) - this.loopEndMarker.props.width, 20);
    }
  }, {
    key: '_timeToPixel',
    value: function _timeToPixel(time) {
      time -= this.props.offset;
      var px = time / this.displayDuration * this.props.width;

      return Math.round(px);
    }
  }, {
    key: '_pixelToTime',
    value: function _pixelToTime(pixel) {
      return pixel / this.props.width * this.displayDuration;
    }
  }, {
    key: '_getLoopRect',
    value: function _getLoopRect() {
      return {
        x1: this._timeToPixel(this.props.loopStart),
        y1: 20,
        x2: this._timeToPixel(this.props.loopEnd),
        y2: this.props.height - 20
      };
    }

    // a pretty crude hittest to find target from a relative mouse position

  }, {
    key: '_hitTest',
    value: function _hitTest(point) {

      if (point.y < this.ruler.props.height) {

        if (this.props.loop) {
          var loopRect = this._getLoopRect();

          if (point.y >= loopRect.y1 && point.y < loopRect.y2) {
            if (Math.abs(point.x - loopRect.x1) < 5) {
              return this.loopStartMarker;
            } else if (Math.abs(point.x - loopRect.x2) < 5) {
              return this.loopEndMarker;
            } else if (point.x >= loopRect.x1 && point.x < loopRect.x2) {
              return this.loopLengthMarker;
            }
          }
        }

        if (point.x) {
          return this.ruler;
        }
      }
      return this.waveForm;
    }

    // update mouse cursor to reflect active target

  }, {
    key: '_updateCursor',
    value: function _updateCursor(hitTarget, e) {
      if (hitTarget === this.ruler) {
        this.canvas.style.cursor = 'pointer';
      } else if (hitTarget === this.loopStartMarker) {
        this.canvas.style.cursor = 'e-resize';
      } else if (hitTarget === this.loopEndMarker) {
        this.canvas.style.cursor = 'w-resize';
      } else if (hitTarget === this.loopLengthMarker) {
        this.canvas.style.cursor = 'move';
      } else if (hitTarget === this.waveForm && e.altKey) {
        this.canvas.style.cursor = 'zoom-in';
      } else {
        this.canvas.style.cursor = 'auto';
      }
    }

    // almost fully self contained ui interaction

  }, {
    key: '_setupUI',
    value: function _setupUI() {
      var _this2 = this;

      var mouseDown = false;
      var lastY = 0;
      var zoomThresh = 0;
      var canvasTarget = null;
      var doZoom = false;
      var lastMousePos = { x: 0, y: 0 };
      var startXTime = 0;

      var toRelativeMovement = function toRelativeMovement(e) {
        var rect = _this2.canvas.getBoundingClientRect();
        var pixelRatio = _this2.pixelRatio;

        var x = (e.pageX - rect.left) * pixelRatio.x;
        var y = (e.pageY - rect.top) * pixelRatio.y;

        var movementX = e.movementX ? e.movementX * pixelRatio.x : 0;
        var movementY = e.movementY ? e.movementY * pixelRatio.y : 0;

        return {
          rect: rect,
          x: x,
          y: y,
          movementX: movementX,
          movementY: movementY
        };
      };

      var quantizePosition = function quantizePosition(_ref) {
        var x = _ref.x,
            y = _ref.y;


        if (!_this2.props.quantize) return { x: x, y: y };

        var offsetPx = _this2.props.offset / _this2.displayDuration * _this2.props.width;
        var pxQuant = _this2.props.quantize / _this2.displayDuration * _this2.props.width;

        x += offsetPx;
        x = Math.round(x / pxQuant) * pxQuant;
        x -= offsetPx;
        return { x: x, y: y };
      };

      this.canvas.addEventListener('mousedown', function (e) {
        mouseDown = true;
        lastY = null;
        zoomThresh = 0;
        doZoom = false;

        var pos = toRelativeMovement(e);

        canvasTarget = _this2._hitTest(pos);

        _this2._updateCursor(canvasTarget, e);

        if (canvasTarget === _this2.waveForm) {
          if (e.altKey) {
            doZoom = true;
            _this2.zoomMarker.position = pos.x;
            _this2.zoomMarker.props.visible = true;
            _this2.canvas.requestPointerLock();
          }
        }
        if (!doZoom) {
          pos = quantizePosition(pos);
        }
        startXTime = _this2._pixelToTime(pos.x) + _this2.props.offset;
        !doZoom && (_this2.props.selectEnd = _this2.props.selectStart = startXTime);
        lastMousePos = pos;
      });

      document.addEventListener('mouseup', function () {
        mouseDown = false;
        if (doZoom) {
          _this2.zoomMarker.props.visible = false;
          document.exitPointerLock();
          doZoom = false;
        }
      });

      document.addEventListener('mousemove', function (e) {

        if (mouseDown) {
          var _toRelativeMovement = toRelativeMovement(e),
              x = _toRelativeMovement.x,
              y = _toRelativeMovement.y,
              movementX = _toRelativeMovement.movementX,
              movementY = _toRelativeMovement.movementY,
              rect = _toRelativeMovement.rect;

          var p = { x: x, y: y };

          if (!doZoom) {

            // keep p within boarders of canvas
            p.x = Math.max(0, Math.min(_this2.props.width, p.x));
            p = quantizePosition(p);

            if (canvasTarget === _this2.ruler) {
              _this2.updateStartPos(p.x);
            }
          }

          var deltaX = (doZoom && movementX !== undefined ? movementX : p.x - lastMousePos.x) / rect.width;
          var deltaY = (doZoom && movementY !== undefined ? movementY : p.y - lastMousePos.y) / rect.height;

          var xTime = _this2._pixelToTime(p.x) + _this2.props.offset;
          var deltaTime = _this2._pixelToTime(deltaX) * _this2.props.width / _this2.pixelRatio.x;

          Object.assign(lastMousePos, p);

          if (doZoom) {

            if (lastY === null) lastY = p.y;

            lastY = p.y;

            zoomThresh += Math.abs(deltaY);
            var hZoom = Math.max(1, _this2.props.hZoom + deltaY * _this2.props.hZoom);

            if (zoomThresh > _this2.props.uiZoomStickiness) {

              var zoomDelta = hZoom - _this2.props.hZoom;

              if (zoomDelta !== 0 && hZoom >= 0.5) {

                var zoomPerc = zoomDelta / _this2.props.hZoom;
                var posRatio = p.x / (rect.width * _this2.pixelRatio.x);

                _this2.props.hZoom = hZoom;
                _this2.offset += zoomPerc * posRatio * _this2.displayDuration;
              }
            }

            _this2.offset -= deltaX * 10 / hZoom;
          } else if (canvasTarget === _this2.waveForm) {

            if (xTime < startXTime) {
              _this2.updateSelection(_this2.props.selectStart + deltaTime, startXTime);
            } else {
              _this2.updateSelection(startXTime, _this2.props.selectEnd + deltaTime);
            }
          } else if (canvasTarget === _this2.ruler) {
            if (p.x >= 0 && p.x < rect.width) {
              _this2.updateStartPos(p.x);
            } else {
              if (p.x < 0) {
                _this2.offset = Math.max(0, _this2.props.offset - Math.abs(p.x * 0.1));
              } else {
                _this2.offset = Math.min(_this2.duration, _this2.props.offset + (p.x - rect.width) * 0.1);
              }
            }
          } else if (canvasTarget === _this2.loopLengthMarker) {

            _this2.updateLoopPos(_this2.props.loopStart + deltaTime, _this2.props.loopEnd + deltaTime);
          } else if (canvasTarget === _this2.loopStartMarker) {

            if (xTime <= _this2.props.loopEnd) {
              _this2.updateLoopPos(_this2.props.loopStart + deltaTime, _this2.props.loopEnd);
            } else {
              _this2.updateLoopPos(_this2.props.loopEnd, _this2.props.loopEnd);
            }
          } else if (canvasTarget === _this2.loopEndMarker) {

            if (xTime >= _this2.props.loopStart) {
              _this2.updateLoopPos(_this2.props.loopStart, _this2.props.loopEnd + deltaTime);
            } else {
              _this2.updateLoopPos(_this2.props.loopStart, _this2.props.loopStart);
            }
          }
        } else {
          _this2._updateCursor(_this2._hitTest(toRelativeMovement(e)), e);
        }
      });
    }
  }, {
    key: 'updateSelection',
    value: function updateSelection(start, end) {

      start = Math.max(0, start);
      end = Math.min(this.duration, end);

      this.props.selectStart = start;
      this.props.selectEnd = end;
    }
  }, {
    key: 'updateLoopPos',
    value: function updateLoopPos(start, end) {

      if (start < 0) {
        var d = Math.abs(start);

        end = Math.min(this.duration, end + d);
        start += d;
      }
      if (end > this.duration) {
        var _d = this.duration - end;

        start = Math.max(0, start + _d);
        end += _d;
      }

      if (start > end) {
        start = end;
      }

      if (start >= 0 && end <= this.duration) {
        this.props.loopStart = start;
        this.props.loopEnd = end;
      }
    }
  }, {
    key: 'updateStartPos',
    value: function updateStartPos(px) {
      var startPos = px / this.canvas.width * this.duration / this.props.hZoom + this.props.offset;

      this.props.startPosition = startPos;
    }
  }, {
    key: 'offset',
    get: function get() {
      return this.props.offset;
    },
    set: function set(v) {
      this.props.offset = Math.max(0, Math.min(this.duration - this.displayDuration, v));
    }
  }, {
    key: 'buffer',
    get: function get() {
      return this.props.buffer;
    },
    set: function set(buffer) {
      this.props.buffer = buffer;
    }
  }, {
    key: 'pixelRatio',
    get: function get() {

      var rect = this.canvas.getBoundingClientRect();
      var pixelRatio = { x: this.props.width / rect.width, y: this.props.height / rect.height };

      return pixelRatio;
    }
  }]);

  return SampleEditor;
}(_CanvasUI3.default);

exports.default = SampleEditor;
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * "Magic" Properties with bindings to react to changes
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @Author: Rikard Lindstrom <hi@rikard.io>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @Filename: Props.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _eventMixin = __webpack_require__(4);

var _eventMixin2 = _interopRequireDefault(_eventMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Props = function () {
  function Props() {
    var _this = this;

    for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
      props[_key] = arguments[_key];
    }

    _classCallCheck(this, Props);

    props = props.filter(function (p) {
      return !!p;
    });

    var propsObject = props.reduce(function (a, p) {
      return Object.assign(a, p);
    }, {});

    Object.keys(propsObject).forEach(function (k) {
      Object.defineProperty(_this, k, {
        get: function get() {
          return propsObject[k];
        },
        set: function set(v) {
          var oldV = propsObject[k];

          propsObject[k] = v;
          this.$triggerDeferedChange();
          this.$trigger('change', k, v);
          this.$trigger('change:' + k, v, oldV);
        }
      });
    });
    this.$changeBatchTimer = null;
    this.$privateProps = propsObject;
    this.$keys = Object.keys(propsObject);
  }

  _createClass(Props, [{
    key: '$triggerDeferedChange',
    value: function $triggerDeferedChange() {
      var _this2 = this;

      // change is triggered on the next heartbeat to avoid mass triggering
      // when changing multiple props at once
      if (this.$changeBatchTimer === null) {
        this.$changeBatchTimer = setTimeout(function () {
          _this2.$trigger('defered_change');
          _this2.$changeBatchTimer = null;
        }, 50);
      }
    }
  }, {
    key: '$observe',
    value: function $observe(key, cb) {
      var _this3 = this;

      var ctx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

      if (Array.isArray(key)) {
        key.forEach(function (k) {
          return _this3.$observe(k, cb, ctx);
        });
        return this;
      }
      if (this.$privateProps[key] === undefined) throw new Error('Can\' observe undefined prop ' + key);
      cb.call(ctx, this.$privateProps[key]);
      this.$on('change:' + key, cb, ctx);
      return this;
    }
  }, {
    key: '$unobserve',
    value: function $unobserve(key, cb, ctx) {
      var _this4 = this;

      if (Array.isArray(key)) {
        key.forEach(function (k) {
          return _this4.$unobserve(k, cb, ctx);
        });
        return this;
      }
      this.$off('change:' + key, cb, ctx);
      return this;
    }
  }, {
    key: '$bind',
    value: function $bind(ctx) {
      var _this5 = this;

      for (var _len2 = arguments.length, keys = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        keys[_key2 - 1] = arguments[_key2];
      }

      keys.forEach(function (k) {
        _this5.$observe(k, function (v) {
          ctx[k] = v;
        });
      });

      return this;
    }
  }, {
    key: '$unbind',
    value: function $unbind(ctx) {
      var _this6 = this;

      for (var _len3 = arguments.length, keys = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        keys[_key3 - 1] = arguments[_key3];
      }

      if (keys && keys.length) {
        keys.forEach(function (k) {
          _this6.$unobserve(k, null, ctx);
        });
      } else {
        this.$off(null, null, ctx);
      }

      return this;
    }
  }, {
    key: '$map',
    value: function $map(otherProps, map) {
      var _this7 = this;

      Object.keys(map).forEach(function (k) {
        otherProps.$observe(k, function (v) {
          _this7[k] = map[k](v);
        });
      });

      return this;
    }
  }, {
    key: '$link',
    value: function $link(otherProps) {
      var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      keys = keys || Object.keys(this.$privateProps).filter(function (k) {
        return otherProps.$privateProps[k] !== undefined;
      });
      otherProps.$bind.apply(otherProps, [this].concat(_toConsumableArray(keys)));
      return this;
    }
  }, {
    key: '$unlink',
    value: function $unlink(otherProps) {
      var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      keys = keys || Object.keys(this.$privateProps).filter(function (k) {
        return otherProps.$privateProps[k] !== undefined;
      });
      otherProps.$unbind.apply(otherProps, [this].concat(_toConsumableArray(Object.keys(this.$privateProps))));
      return this;
    }
  }]);

  return Props;
}();

Object.assign(Props.prototype, _eventMixin2.default);

exports.default = Props;
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
*   Simple event $triggering and listening mixin, somewhat borrowed from Backbone
*   @author Rikard Lindstrom
*   @mixin
*/


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {

  /**
  *   Register a listener
  */
  $on: function $on(name, callback, context) {
    /** @member */
    this._events = this._events || {};

    var events = this._events[name] || (this._events[name] = []);

    events.push({
      callback: callback,
      ctxArg: context,
      context: context || this
    });

    return this;
  },

  /**
  *   Unregister a listener
  */
  $off: function $off(name, callback, context) {
    var _this = this;

    var i = void 0,
        len = void 0,
        listener = void 0,
        retain = void 0;

    if (!this._events || !this._events[name]) {
      return this;
    }

    if (!name && !callback && !context) {
      this._events = {};
    }

    var eventListeners = this._events[name];

    if (eventListeners) {
      retain = [];
      // silly redundancy optimization, might be better to keep it DRY
      if (callback && context) {
        for (i = 0, len = eventListeners.length; i < len; i++) {
          listener = eventListeners[i];
          if (callback !== listener.callback && context !== listener.ctxArg) {
            retain.push(eventListeners[i]);
          }
        }
      } else if (callback) {
        for (i = 0, len = eventListeners.length; i < len; i++) {
          listener = eventListeners[i];
          if (callback !== listener.callback) {
            retain.push(eventListeners[i]);
          }
        }
      } else if (context) {
        for (i = 0, len = eventListeners.length; i < len; i++) {
          listener = eventListeners[i];
          if (context !== listener.ctxArg) {
            retain.push(eventListeners[i]);
          }
        }
      }

      this._events[name] = retain;
    } else if (context || callback) {
      Object.keys(this._events).forEach(function (k) {
        _this.$off(k, callback, context);
      });
    }

    if (!this._events[name].length) {
      delete this._events[name];
    }

    return this;
  },

  /**
  *   $trigger an event
  */
  $trigger: function $trigger(name) {
    if (!this._events || !this._events[name]) {
      return this;
    }

    var i = void 0,
        args = void 0,
        binding = void 0,
        listeners = void 0;

    listeners = this._events[name];

    args = [].splice.call(arguments, 1);
    for (i = listeners.length - 1; i >= 0; i--) {
      binding = listeners[i];
      binding.callback.apply(binding.context, args);
    }

    return this;
  }

};
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CanvasUI2 = __webpack_require__(0);

var _CanvasUI3 = _interopRequireDefault(_CanvasUI2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Author: Rikard Lindstrom <hi@rikard.io>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Filename: Waveform.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var defaultProperties = {
  vZoom: 1,
  offset: 0,
  background: '#ddd',
  color: '#222',
  selectColor: '#ddd',
  selectBackground: '#222',
  width: 640,
  height: 320,
  selectStart: 0,
  selectEnd: 0,
  channel: 0,
  resolution: 1
};

function avarage(data, from, to) {
  var interval = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var abs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var q = arguments[5];


  interval = Math.max(1, interval);
  to = Math.min(data.length, to);
  to = Math.min(from + 100, to);

  var tot = 0;

  for (var i = from; i < to; i += interval) {
    tot += abs ? Math.abs(data[i]) : data[i];
  }
  var len = to - from;
  var avg = tot / len * interval;

  return avg;
}

var Waveform = function (_CanvasUI) {
  _inherits(Waveform, _CanvasUI);

  function Waveform(props) {
    _classCallCheck(this, Waveform);

    return _possibleConstructorReturn(this, (Waveform.__proto__ || Object.getPrototypeOf(Waveform)).call(this, defaultProperties, props));
  }

  _createClass(Waveform, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var buffer = this.props.buffer;

      if (!buffer) return this;

      var w = this.props.width;
      var h = this.props.height;

      var ctx = this.ctx;

      ctx.fillStyle = this.props.background;
      ctx.fillRect(0, 0, w, h);

      var data = buffer.getChannelData(this.props.channel);
      var displayLength = data.length / this.props.hZoom;
      var pointsToDraw = Math.min(w / this.props.resolution, displayLength);
      var bufferStepLen = displayLength / pointsToDraw;
      var pointDistance = w / pointsToDraw;

      var halfHeight = h / 2;

      var offsetSamples = this.props.offset * buffer.sampleRate;

      ctx.fillStyle = this.props.color;

      var drawSymetric = bufferStepLen > pointDistance;

      ctx.beginPath();
      ctx.moveTo(0, halfHeight);
      ctx.lineTo(w, halfHeight);
      ctx.stroke();

      ctx.moveTo(0, halfHeight);

      // internal render function to be able to divide the rendering on selection
      var draw = function draw(from, to, color, background) {

        from = Math.max(0, Math.min(from, pointsToDraw));
        to = Math.max(0, Math.min(to, pointsToDraw));

        var lastDataIndex = 0;
        var pointsDrawn = [];

        ctx.beginPath();

        var x = from * pointDistance;

        if (background) {
          var len = (to - from) * pointDistance;

          ctx.fillStyle = background;
          ctx.fillRect(x, 0, len, h);
        }

        for (var i = from; i < to; i++) {

          var j = Math.floor((i + 1) * bufferStepLen + offsetSamples);

          if (drawSymetric) {
            // avarage with abs
            var v = j >= 0 ? avarage(data, lastDataIndex, j, 1, true) : 0;

            if (v >= 0) {
              var y = v * _this2.props.vZoom * halfHeight;

              if (i === from) {
                ctx.moveTo(x, halfHeight - y);
              }
              ctx.lineTo(x, halfHeight - y);
              pointsDrawn.push(x, y);
            }
          } else {
            // avarage without abs
            var _v = j >= 0 ? avarage(data, lastDataIndex, j, 1, false) : 0;
            var _y = _v * _this2.props.vZoom * halfHeight;

            if (i === from) {
              ctx.moveTo(0, halfHeight - _y);
            }
            ctx.lineTo(x, halfHeight - _y);
          }

          x += pointDistance;

          lastDataIndex = j;
        }

        // fill in the flip side if we should do a symetrical waveform
        if (drawSymetric) {
          for (var _i = pointsDrawn.length - 1; _i > 0; _i -= 2) {
            var _x3 = pointsDrawn[_i - 1];
            var _y2 = pointsDrawn[_i];

            ctx.lineTo(_x3, halfHeight + _y2);
          }

          ctx.fillStyle = color;
          ctx.fill();
        } else {
          ctx.strokeStyle = color;
          ctx.stroke();
        }
      };

      if (this.props.selectStart !== this.props.selectEnd) {
        var timePerPoint = this.duration / this.props.hZoom / pointsToDraw;
        var relStartTime = this.props.selectStart - this.props.offset;
        var startPoint = Math.floor(relStartTime / timePerPoint);
        var relEndtTime = this.props.selectEnd - this.props.offset;
        var endPoint = Math.floor(relEndtTime / timePerPoint);

        if (endPoint > 0 && startPoint < pointsToDraw) {
          if (startPoint > 0) {
            draw(0, startPoint, this.props.color, this.props.background);
          }

          draw(Math.max(0, startPoint), Math.min(pointsToDraw, endPoint), this.props.selectColor, this.props.selectBackground);

          if (endPoint < pointsToDraw) {
            draw(endPoint, pointsToDraw, this.props.color, this.props.background);
          }
        } else {
          draw(0, pointsToDraw, this.props.color, this.props.background);
        }
      } else {
        draw(0, pointsToDraw, this.props.color, this.props.background);
      }

      return this;
    }
  }]);

  return Waveform;
}(_CanvasUI3.default);

exports.default = Waveform;
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CanvasUI2 = __webpack_require__(0);

var _CanvasUI3 = _interopRequireDefault(_CanvasUI2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Author: Rikard Lindstrom <hi@rikard.io>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Filename: Ruler.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var defaultProperties = {
  vZoom: 1,
  offset: 0,
  background: '#AAA',
  color: '#222',
  interval: 'auto',
  unit: 's',
  duration: 'auto',
  quantize: 0,
  height: 40
};

var Ruler = function (_CanvasUI) {
  _inherits(Ruler, _CanvasUI);

  function Ruler(props) {
    _classCallCheck(this, Ruler);

    return _possibleConstructorReturn(this, (Ruler.__proto__ || Object.getPrototypeOf(Ruler)).call(this, defaultProperties, props));
  }

  _createClass(Ruler, [{
    key: 'render',
    value: function render() {

      var ctx = this.ctx;

      var w = this.props.width;
      var h = this.props.height;

      ctx.fillStyle = this.props.background;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = ctx.fillStyle = this.props.color;
      ctx.lineWidth = 0.5;

      var displayDuration = this.displayDuration;
      var secondsPerPixel = displayDuration / w;

      var interval = this.props.interval;

      if (interval === 'auto') {
        interval = this.quantizeRuler(displayDuration);
      }

      interval = Math.max(0.001, interval);

      var precision = Math.max(2, Math.min(3, Math.round(1 / interval)));
      var pixelsPerInterval = 1 / secondsPerPixel * interval;
      var drawPoints = w / pixelsPerInterval;

      var markerInterval = 5; // Math.max(1, Math.round(interval * 4));

      var x = -(this.props.offset / interval % markerInterval) * pixelsPerInterval;

      var startTime = this.props.offset;

      for (var i = 0; i < drawPoints + markerInterval; i++) {
        var isMarker = i % markerInterval === 0;

        ctx.beginPath();
        if (isMarker) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
        } else {
          ctx.moveTo(x, h);
          ctx.lineTo(x, h * 0.63);
        }
        ctx.stroke();

        if (isMarker) {
          var fontSize = this.props.width / 71;

          ctx.font = fontSize + 'px Arial';
          ctx.fillText((startTime + x / pixelsPerInterval * interval).toFixed(precision) + this.props.unit, x + 5, fontSize);
        }

        x += pixelsPerInterval;
      }

      return this;
    }
  }, {
    key: 'quantizeRuler',
    value: function quantizeRuler(d) {
      var MAX_PIXEL_W = 20;
      var MIN_PIXEL_W = 60;

      var pixelsPerSecond = this.props.width / d;
      var r = 5 / pixelsPerSecond;
      var oct = -Math.floor(Math.log(r) / Math.log(10) + 1);
      var dec = Math.pow(10, oct);

      var q = void 0;

      if (!this.props.quantize) {
        var c = [1, 2, 5][Math.round(r * dec * 2)];

        q = c / dec;
      } else {
        q = this.props.quantize;
        while (q * pixelsPerSecond < MAX_PIXEL_W) {
          q += this.props.quantize;
        }while (q * pixelsPerSecond > MIN_PIXEL_W) {
          q /= 5;
        }
      }
      return q;
    }
  }]);

  return Ruler;
}(_CanvasUI3.default);

exports.default = Ruler;
module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CanvasUI2 = __webpack_require__(0);

var _CanvasUI3 = _interopRequireDefault(_CanvasUI2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Author: Rikard Lindstrom <hi@rikard.io>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Filename: LineMarker.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var defaultProperties = {
  background: '#999',
  color: '#222',
  width: 10,
  dir: 1
};

var LineMarker = function (_CanvasUI) {
  _inherits(LineMarker, _CanvasUI);

  function LineMarker(props) {
    _classCallCheck(this, LineMarker);

    return _possibleConstructorReturn(this, (LineMarker.__proto__ || Object.getPrototypeOf(LineMarker)).call(this, defaultProperties, props));
  }

  _createClass(LineMarker, [{
    key: 'render',
    value: function render() {

      var ctx = this.ctx;

      // full clear and width / height set
      var w = this.props.width;
      var h = this.props.height;

      ctx.fillStyle = this.props.background;
      ctx.strokeStyle = this.props.color;

      ctx.beginPath();

      var triH = h / 64;
      var triH2 = triH * 2;

      if (this.props.dir === 1) {
        ctx.lineTo(w, triH);
        ctx.lineTo(0, triH2);
        ctx.lineTo(0, 0);
        ctx.lineTo(w, triH);
        ctx.fill();
        ctx.stroke();
        ctx.strokeRect(0, 0, 1, h);
      } else {
        ctx.moveTo(w, 0);
        ctx.lineTo(0, triH);
        ctx.lineTo(w, triH2);
        ctx.lineTo(w, 0);
        ctx.lineTo(0, triH);
        ctx.fill();
        ctx.stroke();
        ctx.strokeRect(w, 0, 1, h);
      }

      return this;
    }
  }]);

  return LineMarker;
}(_CanvasUI3.default);

exports.default = LineMarker;
module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CanvasUI2 = __webpack_require__(0);

var _CanvasUI3 = _interopRequireDefault(_CanvasUI2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Author: Rikard Lindstrom <hi@rikard.io>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Filename: LoopMarker.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var defaultProperties = {
  height: 10,
  color: '#222'
};

var LoopMarker = function (_CanvasUI) {
  _inherits(LoopMarker, _CanvasUI);

  function LoopMarker(props) {
    _classCallCheck(this, LoopMarker);

    return _possibleConstructorReturn(this, (LoopMarker.__proto__ || Object.getPrototypeOf(LoopMarker)).call(this, defaultProperties, props));
  }

  _createClass(LoopMarker, [{
    key: 'render',
    value: function render() {
      var ctx = this.ctx;

      // full clear and width / height set
      var w = this.props.width;
      var h = this.props.height;

      ctx.fillStyle = this.props.color;
      ctx.fillRect(0, 0, w, h);

      return this;
    }
  }]);

  return LoopMarker;
}(_CanvasUI3.default);

exports.default = LoopMarker;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=SampleEditor.js.map