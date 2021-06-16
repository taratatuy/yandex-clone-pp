"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var API = /*#__PURE__*/function () {
  function API() {
    _classCallCheck(this, API);
  }

  _createClass(API, [{
    key: "getDataFromServer",
    value: function getDataFromServer() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return fetch('https://jsonplaceholder.typicode.com/todos/' + id);
    }
  }, {
    key: "getFakeData",
    value: function getFakeData() {
      var latency = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 200;
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve('Some Fake Data!');
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
      Promise.all([this.API.getFakeData(), this.API.getFakeData(), this.API.getDataFromServer()]).then(function (res) {
        _this.block.addElement(res[0], 3);

        _this.block.addElement(res[1], 2);

        _this.block.addElement(res[2], 5);

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

var ScrollListener = /*#__PURE__*/function () {
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
  }, {
    key: "addCallback",
    value: function addCallback(callback) {
      this.callbacks.push(callback);
    }
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
var Zen = /*#__PURE__*/function () {
  function Zen() {
    _classCallCheck(this, Zen);

    this.zenAreaElem = document.querySelector('.dzen__area');
  }

  _createClass(Zen, [{
    key: "addElement",
    value: function addElement(content) {
      var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      var div = document.createElement('div');
      div.className = 'dzen__card _span_' + size;

      this._appendContent(div, content);

      this.zenAreaElem.appendChild(div);
    }
  }, {
    key: "_appendContent",
    value: function _appendContent(div, content) {
      // TODO: refactor the function to append concrete structur of the card content
      // as header, image, text and author. Mb there are some parser so content should be
      // responce from the server.
      div.innerHTML = content;
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