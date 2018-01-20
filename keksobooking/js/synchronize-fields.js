'use strict';

window.synchronizeFields = (function () {
  return function (inputElement, outputElement, valuesIn, valuesOut, callback) {
    var valueIndex = valuesIn.indexOf(inputElement.value);
    callback(outputElement, valuesOut[valueIndex]);
  };
})();
