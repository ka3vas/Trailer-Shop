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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Save promise???
var promiseProductList = [];

// FOCUS ON PRODUCT /////////////////////////////////////////////////////////////////////////////////////////////////////////

// Could live in another file, product "focus" page
function buildProductPage(productInfo) {

  // Grab .offer-panel
  var offerPanel = document.querySelector('.offer-panel');
  console.log(productInfo);
  var productTemplate = productInfo.body_html;

  offerPanel.innerHTML = productTemplate;
}

// END:FOCUS ON PRODUCT /////////////////////////////////////////////////////////////////////////////////////////////////////////

// Make a Promise
function getProductsList() {
  return new Promise(function (resolve, reject) {
    var data = fetch('https://www.everyonedoesit.ca/products.json');
    if (data) {
      resolve(data);
    } else {
      reject(Error('Nothing here!'));
    }
  });
}

// This could probably live in another file (?)
function buildProductCard(productInfo) {

  // Create Block
  var productCard = document.createElement('div');
  productCard.className = "offer-panel__product product-card";

  // Check if featured, set class for Block
  if (productInfo.variants[0].featured_image !== null) {
    productCard.className += " product-card_featured";
  }

  //Build Elements of .product-card Block
  var element = '';

  // Check if product have any image for it, if yes add it
  if (productInfo.images.length !== 0) {
    element += '<img class="product-card__image" src="' + productInfo.images[0].src + '">';
  }

  element += '\n                  <h2>' + productInfo.title + '</h2>\n                  <div class="product-card__info">';

  // Check for compare
  // Remove duplicate code!!! Only need to add one span or ignore it
  if (productInfo.variants[0].compare_at_price !== null) {
    element += '<div class="price">\n                                    Price: <span class="price_compare">C$' + productInfo.variants[0].compare_at_price + '</span>\n                                    <span>C$' + productInfo.variants[0].price + '</span>\n                                  </div> ';
  } else {
    element += '<div class="price">\n                                    Price: <span>C$' + productInfo.variants[0].price + '</span>\n                                  </div>';
  }

  // If featured highlight button
  if (productInfo.variants[0].featured_image !== null) {
    element += '<button class="button button_warning_yellow">More Info</button>';
  } else {
    element += '<button class="button">More Info</button>';
  }

  element += '</div>';

  productCard.innerHTML = element;

  // Add event to the button, that will build product 'page'
  productCard.querySelector('button').addEventListener('click', function () {
    buildProductPage(productInfo);
  });

  // Add Block to the Page
  document.querySelector('.offer-panel').insertAdjacentElement('beforeend', productCard);
}

getProductsList().then(function (productsStream) {
  return productsStream.json();
}).then(function (productsList) {

  // TEST VARIABLE
  promiseProductList = [].concat(_toConsumableArray(productsList.products));

  productsList.products.map(function (product) {
    return buildProductCard(product);
  });
});

document.querySelector('.alert__button_close').addEventListener('click', function (e) {
  // Should move it to separate function
  // Fade out the alert
  e.target.parentNode.style.opacity = '0';
  console.log(e.target.parentNode);
  // Remove it
  setTimeout(function () {
    var removeThis = e.target.parentNode;
    removeThis.parentNode.removeChild(removeThis);
  }, 2000);

  // ninja code at work (i know)
  var test = document.querySelector('h1');
  test.style.paddingTop = "16px";
});

/***/ })
/******/ ]);