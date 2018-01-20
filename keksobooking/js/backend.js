'use strict';

window.backend = (function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      // и тут был бы тернарный оператор, если бы не esLint
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('произошла ошибка соединения ' + xhr.status);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения ' + xhr.status);
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 5000;

    return xhr;
  };
  return {
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    }
  };
})();
