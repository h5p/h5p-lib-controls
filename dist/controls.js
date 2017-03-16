// [AIV] Build version: 1.0.0 
 /******/ (function(modules) { // webpackBootstrap
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

	'use strict';
	
	// Load library
	H5P.Controls = __webpack_require__(1).default;
	H5P.Controls.UIKeyboard = __webpack_require__(5).default;
	H5P.Controls.UIMouse = __webpack_require__(6).default;
	H5P.Controls.AriaDrag = __webpack_require__(7).default;
	H5P.Controls.AriaDrop = __webpack_require__(8).default;
	H5P.Controls.AriaSelected = __webpack_require__(9).default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _elements = __webpack_require__(2);
	
	var _functional = __webpack_require__(3);
	
	var _events = __webpack_require__(4);
	
	var _events2 = _interopRequireDefault(_events);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Controls Event
	 * @typedef {Object} ControlsEvent
	 * @property {HTMLElement} element
	 * @property {number} index
	 * @property {HTMLElement[]} elements
	 * @property {HTMLElement} oldElement
	 */
	/**
	 * Add element event
	 * @event Controls#addElement
	 * @type ControlsEvent
	 */
	/**
	 * Remove element event
	 * @event Controls#removeElement
	 * @type ControlsEvent
	 */
	/**
	 * Previous element event
	 * @event Controls#previousElement
	 * @type ControlsEvent
	 */
	/**
	 * Next element event
	 * @event Controls#nextElement
	 * @type ControlsEvent
	 */
	/**
	 * Select option event
	 * @event Controls#select
	 * @type ControlsEvent
	 */
	/**
	 * Drag element event
	 * @event Controls#drag
	 * @type ControlsEvent
	 */
	
	/**
	 * @type {function} removeTabIndex
	 */
	var removeTabIndex = (0, _elements.removeAttribute)('tabindex');
	/**
	 * @type {function} removeTabIndexForAll
	 */
	var removeTabIndexForAll = (0, _functional.forEach)(removeTabIndex);
	/**
	 * @type {function} setTabIndexZero
	 */
	var setTabIndexZero = (0, _elements.setAttribute)('tabindex', '0');
	/**
	 * @type {function} hasTabIndex
	 */
	var hasTabIndex = (0, _elements.hasAttribute)('tabindex');
	
	/**
	 * @class
	 */
	
	var Controls = function (_Events) {
	  _inherits(Controls, _Events);
	
	  function Controls(plugins) {
	    _classCallCheck(this, Controls);
	
	    /**
	     *@property {HTMLElement} tabbableElement
	     */
	    /**
	     * @property {object[]} plugins
	     */
	    var _this = _possibleConstructorReturn(this, (Controls.__proto__ || Object.getPrototypeOf(Controls)).call(this));
	
	    _this.plugins = plugins || [];
	
	    /**
	     * @property {HTMLElement[]} elements
	     */
	    _this.elements = [];
	
	    // move tabindex to next element
	    _this.on('nextElement', _this.nextElement, _this);
	
	    // move tabindex to previous element
	    _this.on('previousElement', _this.previousElement, _this);
	
	    // init plugins
	    _this.initPlugins();
	    return _this;
	  }
	
	  /**
	   * Add controls to an element
	   *
	   * @param {HTMLElement} el
	   *
	   * @fires Controls#addElement
	   * @public
	   */
	
	
	  _createClass(Controls, [{
	    key: 'addElement',
	    value: function addElement(el) {
	      this.elements.push(el);
	
	      this.firesEvent('addElement', el);
	
	      if (this.elements.length === 1) {
	        // if first
	        this.setTabbable(el);
	      }
	    }
	  }, {
	    key: 'removeElement',
	
	
	    /**
	     * Add controls to an element
	     *
	     * @param {HTMLElement} el
	     *
	     * @fires Controls#addElement
	     * @public
	     */
	    value: function removeElement(el) {
	      this.elements = (0, _functional.without)([el], this.elements);
	
	      // if removed element was selected
	      if (hasTabIndex(el)) {
	        removeTabIndex(el);
	
	        // set first element selected if exists
	        if (this.elements[0]) {
	          this.setTabbable(this.elements[0]);
	        }
	      }
	
	      this.firesEvent('removeElement', el);
	    }
	  }, {
	    key: 'firesEvent',
	
	
	    /**
	     * Fire event
	     *
	     * @param {string} type
	     * @param {HTMLElement|EventTarget} el
	     *
	     * @public
	     */
	    value: function firesEvent(type, el) {
	      var index = this.elements.indexOf(el);
	
	      this.fire(type, {
	        element: el,
	        index: index,
	        elements: this.elements,
	        oldElement: this.tabbableElement
	      });
	    }
	
	    /**
	     * Sets tabindex on an element, remove it from all others
	     *
	     * @param {number} index
	     *
	     * @private
	     */
	
	  }, {
	    key: 'nextElement',
	    value: function nextElement(_ref) {
	      var index = _ref.index;
	
	      var isLastElement = index === this.elements.length - 1;
	      var nextEl = this.elements[isLastElement ? 0 : index + 1];
	
	      this.setTabbable(nextEl);
	      nextEl.focus();
	    }
	
	    /**
	     * Sets tabindex on an element, remove it from all others
	     *
	     * @param {HTMLElement} el
	     * @public
	     */
	
	  }, {
	    key: 'setTabbable',
	    value: function setTabbable(el) {
	      removeTabIndexForAll(this.elements);
	      setTabIndexZero(el);
	      this.tabbableElement = el;
	    }
	
	    /**
	     * Sets tabindex on an element, remove it from all others
	     *
	     * @param {number} index
	     *
	     * @private
	     */
	
	  }, {
	    key: 'previousElement',
	    value: function previousElement(_ref2) {
	      var index = _ref2.index;
	
	      var isFirstElement = index === 0;
	      var prevEl = this.elements[isFirstElement ? this.elements.length - 1 : index - 1];
	
	      this.setTabbable(prevEl);
	      prevEl.focus();
	    }
	
	    /**
	     * Initializes the plugins
	     *
	     * @private
	     */
	
	  }, {
	    key: 'initPlugins',
	    value: function initPlugins() {
	      this.plugins.forEach(function (plugin) {
	        if (plugin.init !== undefined) {
	          plugin.init(this);
	        }
	      }, this);
	    }
	  }]);
	
	  return Controls;
	}(_events2.default);
	
	exports.default = Controls;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.attributeEquals = exports.hasAttribute = exports.removeAttribute = exports.setAttribute = exports.getAttribute = undefined;
	
	var _functional = __webpack_require__(3);
	
	/**
	 * Get an attribute value from element
	 *
	 * @param {string} name
	 * @param {HTMLElement} el
	 *
	 * @function
	 * @return {string}
	 */
	var getAttribute = exports.getAttribute = (0, _functional.curry)(function (name, el) {
	  return el.getAttribute(name);
	});
	
	/**
	 * Set an attribute on a html element
	 *
	 * @param {string} name
	 * @param {string} value
	 * @param {HTMLElement} el
	 *
	 * @function
	 */
	var setAttribute = exports.setAttribute = (0, _functional.curry)(function (name, value, el) {
	  el.setAttribute(name, value);
	});
	
	/**
	 * Remove attribute from html element
	 *
	 * @param {string} name
	 * @param {HTMLElement} el
	 *
	 * @function
	 */
	var removeAttribute = exports.removeAttribute = (0, _functional.curry)(function (name, el) {
	  el.removeAttribute(name);
	});
	
	/**
	 * Check if element has an attribute
	 *
	 * @param {string} name
	 * @param {HTMLElement} el
	 *
	 * @function
	 * @return {boolean}
	 */
	var hasAttribute = exports.hasAttribute = (0, _functional.curry)(function (name, el) {
	  return el.hasAttribute(name);
	});
	
	/**
	 * Check if element has an attribute that equals
	 *
	 * @param {string} name
	 * @param {string} value
	 * @param {HTMLElement} el
	 *
	 * @function
	 * @return {boolean}
	 */
	var attributeEquals = exports.attributeEquals = (0, _functional.curry)(function (name, value, el) {
	  return el.getAttribute(name) === value;
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Returns a curried version of a function
	 *
	 * @param {function} fn
	 *
	 * @public
	 *
	 * @return {function}
	 */
	var curry = exports.curry = function curry(fn) {
	  var arity = fn.length;
	
	  return function f1() {
	    var args = Array.prototype.slice.call(arguments, 0);
	    if (args.length >= arity) {
	      return fn.apply(null, args);
	    } else {
	      return function f2() {
	        var args2 = Array.prototype.slice.call(arguments, 0);
	        return f1.apply(null, args.concat(args2));
	      };
	    }
	  };
	};
	
	/**
	 * Compose functions together, executing from right to left
	 *
	 * @param {function...} fns
	 *
	 * @function
	 * @public
	 *
	 * @return {function}
	 */
	var compose = exports.compose = function compose() {
	  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
	    fns[_key] = arguments[_key];
	  }
	
	  return fns.reduce(function (f, g) {
	    return function () {
	      return f(g.apply(undefined, arguments));
	    };
	  });
	};
	
	/**
	 * Applies a function to each element in an array
	 *
	 * @param {function} fn
	 * @param {Array} arr
	 *
	 * @function
	 * @public
	 *
	 * @return {function}
	 */
	var forEach = exports.forEach = curry(function (fn, arr) {
	  arr.forEach(fn);
	});
	
	/**
	 * Maps a function to an array
	 *
	 * @param {function} fn
	 * @param {Array} arr
	 *
	 * @function
	 * @public
	 *
	 * @return {function}
	 */
	var map = exports.map = curry(function (fn, arr) {
	  return arr.map(fn);
	});
	
	/**
	 * Applies a filter to an array
	 *
	 * @param {function} fn
	 * @param {Array} arr
	 *
	 * @function
	 * @public
	 *
	 * @return {function}
	 */
	var filter = exports.filter = curry(function (fn, arr) {
	  return arr.filter(fn);
	});
	
	/**
	 * Applies a some to an array
	 *
	 * @param {function} fn
	 * @param {Array} arr
	 *
	 * @function
	 * @public
	 *
	 * @return {function}
	 */
	var some = exports.some = curry(function (fn, arr) {
	  return arr.some(fn);
	});
	
	/**
	 * Returns true if an array contains a value
	 *
	 * @param {*} value
	 * @param {Array} arr
	 *
	 * @function
	 * @public
	 *
	 * @return {function}
	 */
	var contains = exports.contains = curry(function (value, arr) {
	  return arr.indexOf(value) != -1;
	});
	
	/**
	 * Returns an array without the supplied values
	 *
	 * @param {Array} values
	 * @param {Array} arr
	 *
	 * @function
	 * @public
	 *
	 * @return {function}
	 */
	var without = exports.without = curry(function (values, arr) {
	  return filter(function (value) {
	    return !contains(value, values);
	  }, arr);
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Events = function () {
	  function Events() {
	    _classCallCheck(this, Events);
	
	    /**
	     * @type {object}
	     * @private
	     */
	    this.listeners = {};
	  }
	
	  /**
	   * Listen to event
	   *
	   * @param {string} type
	   * @param {function} listener
	   * @param {object} [scope]
	   */
	
	
	  _createClass(Events, [{
	    key: 'on',
	    value: function on(type, listener, scope) {
	      /**
	       * @typedef {object} Trigger
	       * @property {function} listener
	       * @property {object} scope
	       */
	      var trigger = {
	        'listener': listener,
	        'scope': scope
	      };
	
	      this.listeners[type] = this.listeners[type] || [];
	      this.listeners[type].push(trigger);
	    }
	
	    /**
	     * Fire event. If any of the listeners returns false, return false
	     *
	     * @param {string} type
	     * @param {object} event
	     *
	     * @return {boolean}
	     */
	
	  }, {
	    key: 'fire',
	    value: function fire(type, event) {
	      var triggers = this.listeners[type] || [];
	
	      return triggers.every(function (trigger) {
	        return trigger.listener.call(trigger.scope || this, event) !== false;
	      });
	    }
	  }]);
	
	  return Events;
	}();
	
	exports.default = Events;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @class
	 * @classdesc Keyboard navigation for accessibility support
	 */
	var Keyboard = function () {
	  function Keyboard() {
	    _classCallCheck(this, Keyboard);
	
	    /**
	     * @property {boolean} selectability
	     */
	    this.selectability = true;
	  }
	
	  /**
	   * Inits this class
	   *
	   * @param {Controls} controls
	   */
	
	
	  _createClass(Keyboard, [{
	    key: 'init',
	    value: function init(controls) {
	      /**
	       * Need to have a common binding of handleKeyDown, so that it can be a
	       * common instance to be used for addEventListener and removeEventListener
	       * @type {function}
	       */
	      this.boundHandleKeyDown = this.handleKeyDown.bind(this);
	
	      /**
	       * @type {Controls}
	       */
	      this.controls = controls;
	      this.controls.on('addElement', this.listenForKeyDown, this);
	      this.controls.on('removeElement', this.removeKeyDownListener, this);
	    }
	  }, {
	    key: 'listenForKeyDown',
	
	
	    /**
	     * Listens for a keyboard press when element is focused
	     *
	     * @param {HTMLElement} element
	     * @private
	     */
	    value: function listenForKeyDown(_ref) {
	      var element = _ref.element;
	
	      element.addEventListener('keydown', this.boundHandleKeyDown);
	    }
	  }, {
	    key: 'removeKeyDownListener',
	
	
	    /**
	     * Remove a keyboard press listener
	     *
	     * @param {HTMLElement} element
	     * @private
	     */
	    value: function removeKeyDownListener(_ref2) {
	      var element = _ref2.element;
	
	      element.removeEventListener('keydown', this.boundHandleKeyDown);
	    }
	  }, {
	    key: 'handleKeyDown',
	
	
	    /**
	     * Handles key down
	     *
	     * @param {KeyboardEvent} event Keyboard event
	     * @private
	     */
	    value: function handleKeyDown(event) {
	      switch (event.which) {
	        case 13: // Enter
	        case 32:
	          // Space
	          this.select(event.target);
	          event.preventDefault();
	          break;
	
	        case 37: // Left Arrow
	        case 38:
	          // Up Arrow
	          this.previousElement(event.target);
	          event.preventDefault();
	          break;
	        case 39: // Right Arrow
	        case 40:
	          // Down Arrow
	          this.nextElement(event.target);
	          event.preventDefault();
	          break;
	      }
	    }
	  }, {
	    key: 'previousElement',
	
	
	    /**
	     * Fires the previous element event
	     *
	     * @param {HTMLElement|EventTarget} el
	     * @fires Controls#previousElement
	     */
	    value: function previousElement(el) {
	      this.controls.firesEvent('previousElement', el);
	    }
	  }, {
	    key: 'nextElement',
	
	
	    /**
	     * Fire the next element event
	     *
	     * @param {HTMLElement|EventTarget} el
	     * @fires Controls#nextElement
	     */
	    value: function nextElement(el) {
	      this.controls.firesEvent('nextElement', el);
	    }
	  }, {
	    key: 'select',
	
	
	    /**
	     * Fires the select event
	     *
	     * @param {EventTarget|HTMLElement} el
	     * @fires Controls#select
	     */
	    value: function select(el) {
	      if (this.selectability) {
	        if (this.controls.firesEvent('before-select', el) !== false) {
	          this.controls.firesEvent('select', el);
	          this.controls.firesEvent('after-select', el);
	        }
	      }
	    }
	  }, {
	    key: 'disableSelectability',
	
	
	    /**
	     * Disable possibility to select a word trough click and space or enter
	     *
	     * @public
	     */
	    value: function disableSelectability() {
	      this.selectability = false;
	    }
	  }, {
	    key: 'enableSelectability',
	
	
	    /**
	     * Enable possibility to select a word trough click and space or enter
	     *
	     * @public
	     */
	    value: function enableSelectability() {
	      this.selectability = true;
	    }
	  }]);
	
	  return Keyboard;
	}();
	
	exports.default = Keyboard;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @class
	 * @classdesc Keyboard navigation for accessibility support
	 */
	var Mouse = function () {
	  function Mouse() {
	    _classCallCheck(this, Mouse);
	
	    /**
	     * @property {boolean} selectability
	     */
	    this.selectability = true;
	  }
	
	  /**
	   * Inits this class
	   *
	   * @param {Controls} controls
	   */
	
	
	  _createClass(Mouse, [{
	    key: 'init',
	    value: function init(controls) {
	      /**
	       * @type {Controls}
	       */
	      this.controls = controls;
	      this.controls.on('addElement', this.listenForKeyDown, this);
	    }
	  }, {
	    key: 'listenForKeyDown',
	
	
	    /**
	     * Listens for a keyboard press when element is focused
	     *
	     * @param {HTMLElement} element
	     * @private
	     */
	    value: function listenForKeyDown(_ref) {
	      var element = _ref.element;
	
	      element.addEventListener('click', this.handleClick.bind(this));
	      element.addEventListener('drag', this.handleDrag.bind(this));
	    }
	  }, {
	    key: 'handleClick',
	
	
	    /**
	     * Handles mouseClick
	     *
	     * @param {MouseEvent} event Keyboard event
	     * @private
	     */
	    value: function handleClick(event) {
	      this.controls.firesEvent('select', event.currentTarget);
	    }
	  }, {
	    key: 'handleDrag',
	
	
	    /**
	     * Handles key down
	     *
	     * @param {MouseEvent} event Keyboard event
	     * @private
	     */
	    value: function handleDrag(event) {
	      this.controls.firesEvent('drag', event.currentTarget);
	    }
	  }, {
	    key: 'disableSelectability',
	
	
	    /**
	     * Disable possibility to select a word trough click and space or enter
	     *
	     * @public
	     */
	    value: function disableSelectability() {
	      this.selectability = false;
	    }
	  }, {
	    key: 'enableSelectability',
	
	
	    /**
	     * Enable possibility to select a word trough click and space or enter
	     *
	     * @public
	     */
	    value: function enableSelectability() {
	      this.selectability = true;
	    }
	  }]);
	
	  return Mouse;
	}();
	
	exports.default = Mouse;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _elements = __webpack_require__(2);
	
	var _functional = __webpack_require__(3);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @type {string}
	 * @readonly
	 */
	var ATTRIBUTE_ARIA_GRABBED = 'aria-grabbed';
	
	/**
	 * @type {function} setGrabbedTrue
	 * @param {HTMLElement} element
	 */
	var setGrabbed = (0, _elements.setAttribute)(ATTRIBUTE_ARIA_GRABBED);
	
	/**
	 * @type {function} isGrabbed
	 * @param {HTMLElement} element
	 */
	var isGrabbed = (0, _elements.attributeEquals)(ATTRIBUTE_ARIA_GRABBED, 'true');
	
	/**
	 * @type {function} filterHasAttributeDropEffect
	 */
	var filterHasAttributeGrabbed = (0, _functional.filter)((0, _elements.hasAttribute)(ATTRIBUTE_ARIA_GRABBED));
	
	/**
	 * Sets all aria-grabbed to 'false'
	 * @param {HTMLElement[]} elements
	 * @type {function} setAllGrabbedToFalse
	 */
	var _setAllGrabbedToFalse = (0, _functional.compose)((0, _functional.forEach)((0, _elements.setAttribute)(ATTRIBUTE_ARIA_GRABBED, 'false')), filterHasAttributeGrabbed);
	
	/**
	 * @type {function} hasGrabbed
	 * @param {HTMLElement[]} elements
	 */
	var hasGrabbed = (0, _functional.compose)((0, _functional.some)(isGrabbed), filterHasAttributeGrabbed);
	
	/**
	 * @class
	 */
	
	var Drag = function () {
	  function Drag() {
	    _classCallCheck(this, Drag);
	  }
	
	  _createClass(Drag, [{
	    key: 'init',
	
	    /**
	     * Inits this class
	     *
	     * @param {Controls} controls
	     */
	    value: function init(controls) {
	      /**
	       * @type {Controls}
	       */
	      this.controls = controls;
	
	      // handle select event
	      this.controls.on('select', this.select, this);
	    }
	  }, {
	    key: 'addElement',
	
	
	    /**
	     * Marks element as aria-grabbed = 'false' and adds to controller
	     *
	     * @param element
	     */
	    value: function addElement(element) {
	      setGrabbed('false', element);
	      this.controls.addElement(element);
	    }
	
	    /**
	     * Sets aria-grabbed to 'false' for all elements that has it
	     */
	
	  }, {
	    key: 'setAllGrabbedToFalse',
	    value: function setAllGrabbedToFalse() {
	      _setAllGrabbedToFalse(this.controls.elements);
	    }
	
	    /**
	     * Returns true if any of the elements are grabbed
	     *
	     * @return {boolean}
	     */
	
	  }, {
	    key: 'hasAnyGrabbed',
	    value: function hasAnyGrabbed() {
	      return hasGrabbed(this.controls.elements);
	    }
	
	    /**
	     * Un selects all, but selects new element if not already selected
	     *
	     * @param {HTMLElement} element
	     */
	
	  }, {
	    key: 'select',
	    value: function select(_ref) {
	      var element = _ref.element;
	
	      var alreadyGrabbed = isGrabbed(element);
	
	      this.setAllGrabbedToFalse();
	
	      if (!alreadyGrabbed) {
	        setGrabbed('true', element);
	      }
	    }
	  }]);
	
	  return Drag;
	}();
	
	exports.default = Drag;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _elements = __webpack_require__(2);
	
	var _functional = __webpack_require__(3);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @type {string}
	 * @readonly
	 */
	var ATTRIBUTE_ARIA_DROPEFFECT = 'aria-dropeffect';
	
	/**
	 * @type {function} setDropEffectNone
	 */
	var setDropEffectNone = (0, _elements.setAttribute)(ATTRIBUTE_ARIA_DROPEFFECT, 'none');
	
	/**
	 * @type {function} setDropEffectNone
	 */
	var setDropEffectMove = (0, _elements.setAttribute)(ATTRIBUTE_ARIA_DROPEFFECT, 'move');
	
	/**
	 * @type {function} filterHasAttributeDropEffect
	 */
	var filterHasAttributeDropEffect = (0, _functional.filter)((0, _elements.hasAttribute)(ATTRIBUTE_ARIA_DROPEFFECT));
	
	/**
	 * Sets all drop zones to move
	 * @param {HTMLElement[]} elements
	 * @type {function} setDropZoneEffectsToMove
	 */
	var setAllDropEffectsToMove = (0, _functional.compose)((0, _functional.forEach)(setDropEffectMove), filterHasAttributeDropEffect);
	
	/**
	 * Sets all drop zones to none
	 * @param {HTMLElement[]} elements
	 * @type {function} setAllDropEffectsToNone
	 */
	var setAllDropEffectsToNone = (0, _functional.compose)((0, _functional.forEach)(setDropEffectNone), filterHasAttributeDropEffect);
	
	/**
	 * Class for handling Drop Zones
	 *
	 * @class
	 */
	
	var Drop = function () {
	  function Drop() {
	    _classCallCheck(this, Drop);
	  }
	
	  _createClass(Drop, [{
	    key: 'init',
	
	    /**
	     * Inits this class
	     * @param {Controls} controls
	     */
	    value: function init(controls) {
	      /**
	       * @type {Controls}
	       */
	      this.controls = controls;
	    }
	  }, {
	    key: 'setAllToMove',
	
	
	    /**
	     * On elements with aria-dropeffect, set aria-dropeffect to 'move'
	     * @public
	     */
	    value: function setAllToMove() {
	      setAllDropEffectsToMove(this.controls.elements);
	    }
	
	    /**
	     * On elements with aria-dropeffect, set aria-dropeffect to 'none'
	     * @public
	     */
	
	  }, {
	    key: 'setAllToNone',
	    value: function setAllToNone() {
	      setAllDropEffectsToNone(this.controls.elements);
	    }
	  }]);
	
	  return Drop;
	}();
	
	/**
	 * Enum for ARIA drop effects
	 * @readonly
	 * @enum {string}
	 */
	
	
	exports.default = Drop;
	Drop.DropEffect = {
	  COPY: 'copy',
	  MOVE: 'move',
	  EXECUTE: 'execute',
	  POPUP: 'popup',
	  NONE: 'none'
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _elements = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Choice = function () {
	  function Choice() {
	    _classCallCheck(this, Choice);
	
	    /**
	     * @type {function}
	     * @param {HTMLElement} el
	     */
	    this.removeAriaSelected = (0, _elements.removeAttribute)('aria-selected');
	    /**
	     * @type {function}
	     * @param {HTMLElement} el
	     */
	    this.addAriaSelected = (0, _elements.setAttribute)('aria-selected', 'true');
	  }
	
	  /**
	   * Inits this class
	   *
	   * @param {Controls} controls
	   */
	
	
	  _createClass(Choice, [{
	    key: 'init',
	    value: function init(controls) {
	      /**
	       * @type {Controls}
	       */
	      this.controls = controls;
	      this.controls.on('select', this.select, this);
	    }
	  }, {
	    key: 'select',
	
	
	    /**
	     * Toggles aria-selected on element
	     *
	     * @param {HTMLElement} element
	     * @param {HTMLElement} element
	     */
	    value: function select(_ref) {
	      var element = _ref.element,
	          oldElement = _ref.oldElement;
	
	      if (element === oldElement) {
	        this.removeAriaSelected(element);
	      } else {
	        this.addAriaSelected(element);
	      }
	    }
	  }]);
	
	  return Choice;
	}();
	
	exports.default = Choice;

/***/ }
/******/ ]);
//# sourceMappingURL=controls.js.map 