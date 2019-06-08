// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/style.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/modifiers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  // Gros texte
  condition: function condition(word) {
    return word[0] === '*';
  },
  modify: function modify(word) {
    return {
      class: 'hero',
      text: word.substr(1)
    };
  }
}, {
  // Gros texte en outline
  condition: function condition(word) {
    return word[0] === '@';
  },
  modify: function modify(word) {
    return {
      class: 'outline',
      text: word.substr(1)
    };
  }
}, {
  // Petit texte
  condition: function condition(word) {
    return word[0] === '-';
  },
  modify: function modify(word) {
    return {
      class: 'small',
      text: word.substr(1)
    };
  }
}, {
  // Texte barré
  condition: function condition(word) {
    return word[0] === '~';
  },
  modify: function modify(word) {
    return {
      class: 'nope',
      text: word.substr(1)
    };
  }
}, {
  // Pour faire des slides vides ou échapper un des caractères précédents
  condition: function condition(word) {
    return word[0] === '.';
  },
  modify: function modify(word) {
    return {
      class: '',
      text: word.substr(1)
    };
  }
}, {
  // Par défaut
  condition: function condition(word) {
    return true;
  },
  modify: function modify(word) {
    return {
      class: '',
      text: word
    };
  }
}];
exports.default = _default;
},{}],"src/Sentence.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _modifiers = _interopRequireDefault(require("./modifiers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Word =
/*#__PURE__*/
function () {
  function Word(raw) {
    _classCallCheck(this, Word);

    this.raw = raw;
  }

  _createClass(Word, [{
    key: "parse",
    value: function parse() {
      var raw = this.raw;
      var url; // check if has url

      var hasUrl = this.raw.match(/\((.*)\)(.+)/i);

      if (hasUrl) {
        url = hasUrl[1];
        raw = hasUrl[2];
      }

      var withSpaces = raw.replace(/_/g, ' ').trim();
      var slide = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _modifiers.default[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var modifier = _step.value;

          if (modifier.condition(withSpaces)) {
            slide = modifier.modify(withSpaces); // apply a class

            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (hasUrl) slide.url = url;
      return slide;
    }
  }]);

  return Word;
}();

var Sentence =
/*#__PURE__*/
function () {
  function Sentence(sentence) {
    _classCallCheck(this, Sentence);

    this.sentence = sentence;
  }

  _createClass(Sentence, [{
    key: "parse",
    value: function parse() {
      var words = this.sentence.split(' ').map(function (word) {
        return new Word(word);
      }); // sépare les mots

      var slides = words.map(function (word) {
        return word.parse();
      });
      return slides;
    }
  }]);

  return Sentence;
}();

exports.default = Sentence;
},{"./modifiers":"src/modifiers.js"}],"src/check.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = check;
var relScrollLerp = 0;
var oldCharging = 0;
var oldScroll = 0;
var colors = {
  bg: [{
    r: 60,
    g: 0,
    b: 200
  }, {
    r: 200,
    g: 0,
    b: 60
  }],
  fg: [{
    r: 255,
    g: 100,
    b: 160
  }, {
    r: 255,
    g: 260,
    b: 0
  }]
};

function check(config, elems, currentSlideIndex) {
  updateDom(currentSlideIndex, elems, config);
  var oldRelScrollLerp = relScrollLerp;
  var relScroll = window.scrollY / (elems.length * config.threshold);
  relScrollLerp = lerp(oldRelScrollLerp, currentSlideIndex === 0 || currentSlideIndex === elems.length - 1 ? .5 : relScroll, .1);
  config.el.style.transform = "translate3d(0, ".concat(relScrollLerp - (relScrollLerp - 0.5) * window.innerHeight * 0.7, "px, 0)");
  var charging = lerp(oldCharging, relScroll, .1);
  document.querySelector('#charging').style.width = "".concat(charging * 100, "vw");
  oldCharging = charging;
  var bg = lerpColor(colors.bg[0], colors.bg[1], charging);
  var fg = lerpColor(colors.fg[0], colors.fg[1], charging);
  document.body.style.backgroundColor = "rgb(".concat(bg.r, ", ").concat(bg.g, ", ").concat(bg.b, ")");
  document.querySelector('#charging').style.backgroundColor = "rgb(".concat(fg.r, ", ").concat(fg.g, ", ").concat(fg.b, ")");
  config.el.style.color = "rgb(".concat(fg.r, ", ").concat(fg.g, ", ").concat(fg.b, ")");

  if (window.scrollY > (currentSlideIndex + 1) * config.threshold) {
    currentSlideIndex++;
    updateDom(currentSlideIndex, elems, config);
  } else if (window.scrollY < currentSlideIndex * config.threshold) {
    currentSlideIndex--;
    updateDom(currentSlideIndex, elems, config);
  }

  window.requestAnimationFrame(function () {
    return check(config, elems, currentSlideIndex);
  });
}

function updateDom(slideIndex, elems, config) {
  if (oldScroll !== window.scrollY) {
    var elem = elems[slideIndex];
    if (!elem) return;

    if (elem.url) {
      var a = document.createElement('a');
      a.setAttribute('href', elem.url);
      a.setAttribute('target', '_blank');
      a.textContent = elem.text;
      config.el.textContent = '';
      config.el.append(a);
    } else {
      config.el.textContent = elem.text;
    }

    if (elem.class) config.el.className = elem.class;else config.el.className = '';
  }

  oldScroll = window.scrollY;
}

function lerp(val1, val2, t) {
  return val1 + (val2 - val1) * t;
}

function lerpColor(color1, color2, t) {
  var color = {};
  color.r = lerp(color1.r, color2.r, t);
  color.g = lerp(color1.g, color2.g, t);
  color.b = lerp(color1.b, color2.b, t);
  return color;
}
},{}],"src/scripts.js":[function(require,module,exports) {
"use strict";

require("./style.scss");

var _Sentence = _interopRequireDefault(require("./Sentence"));

var _check = _interopRequireDefault(require("./check.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  threshold: 400,
  el: document.querySelector('#slide')
};
var sentence = new _Sentence.default('-Scroll_now *Malo *Widerspach is a young @creative @developer from Lyon, France, currently having fun (https://achos.xxx)@at_achos! in_Barcelona. .:) You can check out his design work on (https://behance.net/mowh)Behance, and discover his past and current dev projects on (https://github.com/m0wh)GitHub. .... Feel free to *(https://twitter.com/mowhtr)say_hello.');
var elems = sentence.parse();
document.body.style.height = "".concat(elems.length * config.threshold, "px");
var currentSlideIndex = 0;
(0, _check.default)(config, elems, currentSlideIndex);
},{"./style.scss":"src/style.scss","./Sentence":"src/Sentence.js","./check.js":"src/check.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50107" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/scripts.js"], null)
//# sourceMappingURL=/scripts.13aae5c5.js.map