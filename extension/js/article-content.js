/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _articleContent = __webpack_require__(1);

	var _articleContent2 = _interopRequireDefault(_articleContent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var articleContent = new _articleContent2.default();
	articleContent.run();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ArticleContent = function () {
	  function ArticleContent() {
	    _classCallCheck(this, ArticleContent);
	  }

	  _createClass(ArticleContent, [{
	    key: 'run',
	    value: function run() {
	      var url = this.getLocationHref();
	      this.saveUrl(url);
	    }
	  }, {
	    key: 'getLocationHref',
	    value: function getLocationHref() {
	      return window.location.href;
	    }
	  }, {
	    key: 'saveUrl',
	    value: function saveUrl(url) {
	      _util2.default.saveUrl(url);
	    }
	  }]);

	  return ArticleContent;
	}();

	module.exports = ArticleContent;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Util = function () {
	  function Util() {
	    _classCallCheck(this, Util);
	  }

	  _createClass(Util, null, [{
	    key: 'parseUrl',
	    value: function parseUrl(url) {
	      var ITEM_MATCH = 'https?://qiita.com/([^/]+)/items/([^/#?]+).*';

	      var _url$match = url.match(ITEM_MATCH),
	          _url$match2 = _slicedToArray(_url$match, 3),
	          userId = _url$match2[1],
	          itemId = _url$match2[2];

	      return { userId: userId, itemId: itemId };
	    }
	  }, {
	    key: 'getItemKey',
	    value: function getItemKey(url) {
	      var _Util$parseUrl = Util.parseUrl(url),
	          userId = _Util$parseUrl.userId,
	          itemId = _Util$parseUrl.itemId;

	      return userId + '.' + itemId;
	    }
	  }, {
	    key: 'createItemEntity',
	    value: function createItemEntity(url) {
	      var itemKey = Util.getItemKey(url);
	      var entity = {};
	      entity[itemKey] = itemKey;
	      return entity;
	    }
	  }, {
	    key: 'saveUrl',
	    value: function saveUrl(url) {
	      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

	      var entity = this.createItemEntity(url);

	      chrome.storage.local.set(entity, function () {
	        var itemKey = void 0;
	        for (var key in entity) {
	          itemKey = key;
	        }
	        console.info('stored', itemKey);
	        cb();
	      });
	    }
	  }]);

	  return Util;
	}();

	exports.default = Util;

/***/ }
/******/ ]);