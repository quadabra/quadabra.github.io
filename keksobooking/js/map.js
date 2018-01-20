'use strict';

window.map = (function () {
  var OFFERS_SHOW = 5;
  var mapBlock = document.querySelector('.map');
  var mapPins = mapBlock.querySelector('.map__pins');
  var myPin = mapBlock.querySelector('.map__pin--main');

  var loadedHotels;

  var onLoad = function (hotels) {
    loadedHotels = hotels;
    return loadedHotels;
  };

  var onError = function (errorMessage) {
    var fragment = document.createElement('div');
    var errorImage = document.createElement('img');
    var errorText = document.createElement('p');
    fragment.appendChild(errorImage);
    fragment.appendChild(errorText);
    errorImage.src = 'img/error.jpg';
    errorImage.width = 360;
    errorImage.height = 240;
    errorImage.style = 'display: block; margin: 10px auto; border: 1px solid white;';
    errorText.textContent = 'Насяльника!!!11, ' + errorMessage;
    errorText.style = 'color: white; font-size: 18px;';
    fragment.style = 'width: 400px; text-align: center; z-index: 10; margin: 0; padding: 0; margin-right: auto; ' +
      'background-color : black; top: 30%; left: 50%; transform: translateX(-50%);';
    fragment.style.position = 'fixed';
    document.body.insertAdjacentElement('afterbegin', fragment);
  };

  window.backend.load(onLoad, onError);

  var onMapClick = function (evt) {
    window.pins.pinSwitch(evt);
  };

  var onCardClick = function (evt) {
    if (evt.target.classList.contains('popup__close')) {
      window.cards.popupClose(evt);
    }
  };

  var onPinSet = function () {
    window.pins.render(loadedHotels);
    window.cards.render(loadedHotels);
    window.form.enable();
    window.pins.filtrate(loadedHotels);
    mapBlock.classList.remove('map--faded');
    mapBlock.addEventListener('click', onCardClick);
    mapPins.addEventListener('click', onMapClick);
    document.addEventListener('keydown', window.cards.popupEsc);
    myPin.removeEventListener('mouseup', onPinSet);
  };

  myPin.addEventListener('mousedown', window.pins.move);
  myPin.addEventListener('mouseup', onPinSet);

  return {
    offersToLoad: function (hotels) {
      return hotels.filter(function (item, i) {
        return i < OFFERS_SHOW;
      });
    }
  };
})();
