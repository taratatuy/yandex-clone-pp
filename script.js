"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * An API to fake data.
 * @class
 */
var API = /*#__PURE__*/function () {
  function API() {
    _classCallCheck(this, API);
  }

  _createClass(API, [{
    key: "getDataFromServer",
    value:
    /**
     * Real fetch to the server.
     * @returns {Promise}
     */
    function getDataFromServer() {
      return fetch('https://yandex-homepage-clone.herokuapp.com/fakeData').then(function (data) {
        return data.json();
      });
    }
    /**
     * Fake request emulation based on timeout.
     * @param {number} latency - Emulate ping latency.
     * @returns {Promise}
     */

  }, {
    key: "getFakeData",
    value: function getFakeData() {
      var latency = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 200;
      return new Promise(function (resolve) {
        setTimeout(function () {
          var fakeResponce = {
            avatarLink: 'https://avatars.mds.yandex.net/get-zen-logos/212539/pub_59354892e3cda85cf4157022_5b339863b5782000a9bb3bcc/36x36_2x',
            cardName: 'Some Fake Name',
            imgLink: 'https://avatars.mds.yandex.net/get-zen_doc/4355093/pub_60a58ab9ece43e0c8e0c162a_60a5f8902b5fbd2cdf669802/scale_1200',
            cardTitle: 'Some Fake Title',
            cardText: 'В России заработали новые правила для перевозчиков: теперь неоплативших штрафы ГИБДД иностранных водителей не выпустят из России до погашения долгов',
            cardTimepast: '9 дней назад'
          };
          resolve(fakeResponce);
        }, latency);
      });
    }
  }]);

  return API;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * A class that contain logic for request and append content to the page.
 * @class
 */
var ContentLoader = /*#__PURE__*/function () {
  /**
   * @param {IBlock} block - Class with addElement function.
   */
  function ContentLoader(block) {
    _classCallCheck(this, ContentLoader);

    this.loadingFlag = false;
    this.block = block;
    this.API = new API();

    this._loadContent();
  }
  /**
   * Check if we need to load additional cards for infinite scroll.
   * @param {number} edgeGap - Pixels from top to start loading new content.
   */


  _createClass(ContentLoader, [{
    key: "checkEdge",
    value: function checkEdge() {
      var edgeGap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1500;
      var scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);

      if (scrollHeight - window.pageYOffset < edgeGap) {
        this._loadContent();
      }
    }
  }, {
    key: "_loadContent",
    value: function _loadContent() {
      var _this = this;

      if (this.loadingFlag) return;
      this.loadingFlag = true;
      this.block.setSpinner();
      Promise.all([this.API.getFakeData(), this.API.getFakeData(), this.API.getDataFromServer()]).then(function (res) {
        _this.block.addElement(res[0], 3);

        _this.block.addElement(res[1], 2);

        _this.block.addElement(res[2], 5);

        _this.block.deleteSpinner();

        _this.loadingFlag = false;
      });
    }
  }]);

  return ContentLoader;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Page scroll listener. Observerable pattern but collect not objects
 * implements IObserver but callback functions.
 * @class
 */
var ScrollListener = /*#__PURE__*/function () {
  /**
   * Add scroll listener to the page.
   * @param {number} timeout - Minimal time between events (ms).
   */
  function ScrollListener() {
    var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    _classCallCheck(this, ScrollListener);

    this.timeout = timeout;
    this.passFlag = true;
    this.callbacks = [];

    this._setListener();
  }

  _createClass(ScrollListener, [{
    key: "_setListener",
    value: function _setListener() {
      var _this = this;

      window.addEventListener('scroll', function () {
        if (!_this.passFlag) return;
        _this.passFlag = false;

        _this.callbacks.forEach(function (callback) {
          callback();
        });

        setTimeout(function () {
          _this.passFlag = true;
        }, _this.timeout);
      });
    }
    /**
     * Subscribe a function.
     * @param {function} callback -  Function to be called.
     */

  }, {
    key: "addCallback",
    value: function addCallback(callback) {
      this.callbacks.push(callback);
    }
    /**
     * Unsubscribe a function.
     * @param {function} callback - Function previously added.
     */

  }, {
    key: "deleteCallback",
    value: function deleteCallback(callback) {
      this.callbacks = this.callbacks.filter(function (active) {
        return active != callback;
      });
    }
  }]);

  return ScrollListener;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
  interface IBlock {
    addElement(): void;
  }
*/

/**
 * Functional logic of Zen component on the page. Implements IBlock interface.
 * @calss
 */
var Zen = /*#__PURE__*/function () {
  function Zen() {
    _classCallCheck(this, Zen);

    this.zenAreaElem = document.querySelector('.dzen__area');
  }
  /**
   * Set spinner while loading data from server.
   */


  _createClass(Zen, [{
    key: "setSpinner",
    value: function setSpinner() {
      var spinner = document.createElement('div');
      spinner.className = 'dzen__spinner';
      this.zenAreaElem.appendChild(spinner);
    }
    /**
     * Delete spinner when got response from server.
     */

  }, {
    key: "deleteSpinner",
    value: function deleteSpinner() {
      var spinner = document.querySelector('.dzen__spinner');
      this.zenAreaElem.removeChild(spinner);
    }
    /**
     * Add card element to the page.
     * @param {object} content - Response from the server.
     * @param {number} size - Css class defining cols span of the element.
     */

  }, {
    key: "addElement",
    value: function addElement(content) {
      var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      var div = document.createElement('div');
      div.className = "dzen__card _span_".concat(size, " zen-card");

      this._appendContent(div, content);

      this.zenAreaElem.appendChild(div);
    }
  }, {
    key: "_appendContent",
    value: function _appendContent(div, content) {
      // TODO: refactor the function to append concrete structur of the card content
      // as header, image, text and author. Mb there are some parser so content should be
      // responce from the server.
      // For example:
      var template = "\n      <div class=\"zen-card__header\">\n          <img src=".concat(content.avatarLink, " class=\"zen-card__avatar\"></img>\n          <div class=\"zen-card__name\">").concat(content.cardName, "</div>\n      </div>\n      <a href=\"#\" class=\"zen-card__main\">\n          <img src=").concat(content.imgLink, " class=\"zen-card__img\"></img>\n          <div class=\"zen-card__title\">").concat(content.cardTitle, "</div>\n          <div class=\"zen-card__text\">").concat(content.cardText, "</div>\n      </a>\n      <div class=\"zen-card__timepast\">").concat(content.cardTimepast, "</div>\n      <div class=\"zen-card__footer\"></div>\n    ");
      div.insertAdjacentHTML('afterBegin', template);
    }
  }]);

  return Zen;
}();
"use strict";

function init() {
  var zen = new Zen();
  var contentLoader = new ContentLoader(zen);
  var listener = new ScrollListener(50);
  listener.addCallback(contentLoader.checkEdge.bind(contentLoader));
}

init();