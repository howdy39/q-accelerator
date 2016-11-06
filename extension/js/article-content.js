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

	const ArticleContent = __webpack_require__(1);
	const articleContent = new ArticleContent();

	articleContent.run();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	class ArticleContent {
	  run() {
	    const url = this.getLocationHref();
	    this.saveUrl(url);
	  }

	  getLocationHref() {
	    return window.location.href;
	  }

	  saveUrl(url) {
	    const Util = __webpack_require__(2);
	    Util.saveUrl(url);
	  }
	}

	module.exports = ArticleContent;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class Util {
	  static parseUrl(url) {
	    const ITEM_MATCH = 'https?://qiita.com/([^/]+)/items/([^/?]+).*';
	    const [ , userId, itemId] = url.match(ITEM_MATCH);
	    return {userId, itemId};
	  }

	  static getItemKey(url) {
	    const {userId, itemId} = Util.parseUrl(url);
	    return `${userId}.${itemId}`;
	  }

	  static createItemEntity(url) {
	    const itemKey = Util.getItemKey(url);
	    const entity = {};
	    entity[itemKey] = itemKey;
	    return entity;
	  }

	  static saveUrl(url, cb = function() {} ) {
	    const entity = this.createItemEntity(url);

	    chrome.storage.local.set(entity, function() {
	      let itemKey;
	      for (let key in entity) {
	        itemKey = key;
	      }
	      console.info('stored', itemKey);
	      cb();
	    });
	  }
	}
	module.exports = Util;

/***/ }
/******/ ]);