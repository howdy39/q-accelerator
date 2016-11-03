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

	const Util = __webpack_require__(1);

	const url = window.location.href;
	console.info(url);
	Util.saveUrl(url);

/***/ },
/* 1 */
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

	  static saveUrl(url, cb = function(){} ) {
	    const itemKey = Util.getItemKey(url);
	    const entity = {itemKey};

	    chrome.storage.local.set(entity, function() {
	      console.info('stored', itemKey);
	      cb();
	    });
	  } 
	}
	module.exports = Util;

/***/ }
/******/ ]);