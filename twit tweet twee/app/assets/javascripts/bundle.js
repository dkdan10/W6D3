/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const APIUtil = {
  followUser: id => {
    // ...
    return $.ajax({
      method: 'POST',
      url: `/users/${id}/follow`,
      dataType: "json"
    });

  },

  unfollowUser: id => {
    // ...
    return $.ajax({
      method: 'DELETE',
      url: `/users/${id}/follow`,
      dataType: "json"
    });
  },

  searchUsers: (queryVal, sucCB) => {
    return $.ajax({
      method: 'GET',
      url: "/users/search",
      data: {
        'query': queryVal
      },
      success: sucCB,
      dataType: 'json'
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (APIUtil);


/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FollowToggle; });
/* harmony import */ var _api_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");


class FollowToggle {
  constructor(el, options) {
    this.$el = $(el);
    this.userId = this.$el.data("user-id") || options.userId;
    this.followState = this.$el.data("initial-follow-state") || options.followState;
    this.render();
    this.$el.on('click', this.handleClick.bind(this));
  }

  render () {
    if (this.followState === 'followed') this.$el.html('Unfollow');
    else this.$el.html('Follow');
  }


  handleClick(event) {
    event.preventDefault();
    $(event.target).prop('disabled', true)
    const erCB = (e) => {console.log(e); $(event.target).prop('disabled', false);}
    const sucCB = () => {
      this.followState = (this.followState === 'unfollowed' ? 'followed' : 'unfollowed');
      this.render();
      $(event.target).prop('disabled', false)
    }
    if (this.followState === 'unfollowed') {
      _api_util__WEBPACK_IMPORTED_MODULE_0__["default"].followUser(this.userId)
        .then(sucCB)
        .fail(erCB);
    } else {
      _api_util__WEBPACK_IMPORTED_MODULE_0__["default"].unfollowUser(this.userId)
        .then(sucCB)
        .fail(erCB);
    }
  }
}

/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _follow_toggle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");
/* harmony import */ var _users_search_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./users_search.js */ "./frontend/users_search.js");



$(() => {
  $("button.follow-toggle").each((idx, el) => {
    new _follow_toggle_js__WEBPACK_IMPORTED_MODULE_0__["default"](el);
  });

  $("nav.users-search").each((idx, el) => {
    new _users_search_js__WEBPACK_IMPORTED_MODULE_1__["default"](el);
  });
})

/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UsersSearch; });
/* harmony import */ var _api_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");
/* harmony import */ var _follow_toggle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");



class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.$input = $("#username");
    this.$ul = this.$el.find(".users");
    this.handleInput()
  }
  renderResults(results) {
    this.$ul.empty();
    results.forEach(user => {
        const userLi = $('<li>');
        const userLink = $('<a>');
        userLink.attr("href", `/users/${user.id}`);
        userLink.text(user.username);
        userLi.append(userLink);
        const followButtown = $('<button>');
        followButtown.addClass('follow-toggle');
        new _follow_toggle__WEBPACK_IMPORTED_MODULE_1__["default"](followButtown, {
          'userId': user.id,
          'followState': (user.followed ? 'followed' : 'unfollowed')
        });
        userLi.append(followButtown);
        this.$ul.append(userLi);
    });
  }
  
  handleInput() {
    const sucCB = (resp) => {
      this.renderResults(resp)
    };
    this.$input.on('change keyup', (e) => {
      _api_util__WEBPACK_IMPORTED_MODULE_0__["default"].searchUsers(this.$input.val(), sucCB)
    });
  }

}

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map