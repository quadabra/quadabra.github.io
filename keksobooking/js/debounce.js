'use strict';

window.debounce = (function () {
  var INTERVAL = 500;
  var lastTimeout;

  return function (func) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(func, INTERVAL);
  };
})();
