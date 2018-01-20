'use strict';

window.showCard = (function () {
  return function (target) {
    var current = document.querySelector('.popup:not(.hidden)');
    var index = [].findIndex.call(window.pins.list, function (it) {
      return it === target;
    });
    if (current && current !== window.cards.list[index]) {
      current.classList.add('hidden');
    }
    window.cards.list[index].classList.toggle('hidden');
  };
})();
