'use strict';

window.pins = (function () {
  var ANY_VALUE = 'any';
  var PIN_OFFSET = {
    x: '20',
    y: '58'
  };

  var pricesData = {
    low: {
      NUMBER: 10000,
      VALUE: 'low'
    },
    high: {
      NUMBER: 50000,
      VALUE: 'high'
    }
  };

  var typeFilter = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');
  var featuresFilter = document.querySelector('#housing-features');
  var mapBlock = document.querySelector('.map');
  var mapPins = mapBlock.querySelector('.map__pins');
  var myPin = mapBlock.querySelector('.map__pin--main');
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  var filtrateFunctions = [
    function (hotel) {
      return (typeFilter.value === hotel.offer.type) || (typeFilter.value === ANY_VALUE);
    },

    function (hotel) {
      switch (priceFilter.value) {
        case pricesData.low.VALUE:
          return hotel.offer.price < pricesData.low.NUMBER;
        case pricesData.high.VALUE:
          return hotel.offer.price > pricesData.high.NUMBER;
        case ANY_VALUE:
          return true;
        default:
          return hotel.offer.price >= pricesData.low.NUMBER && hotel.offer.price <= pricesData.high.NUMBER;
      }
    },

    function (hotel) {
      return (roomsFilter.value === hotel.offer.rooms.toString()) || (roomsFilter.value === ANY_VALUE);
    },

    function (hotel) {
      return (guestsFilter.value === hotel.offer.guests.toString()) || (guestsFilter.value === ANY_VALUE);
    },

    function (hotel) {
      var checkedElements = featuresFilter.querySelectorAll('input[type="checkbox"]:checked');
      var selectedFeatures = [].map.call(checkedElements, function (item) {
        return item.value;
      });
      return selectedFeatures.every(function (currentFeature) {
        return hotel.offer.features.includes(currentFeature);
      });
    }
  ];

  var getFiltratedHotels = function (hotels) {
    return hotels.filter(function (hotel) {
      return filtrateFunctions.every(function (currentFunction) {
        return currentFunction(hotel);
      });
    });
  };

  var getPinList = function () {
    window.pins.list = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
  };

  return {
    filtrate: function (hotels) {
      var redrawPins = function () {
        window.pins.update(getFiltratedHotels(hotels));
        window.cards.update(getFiltratedHotels(hotels));
      };
      var onFilterChange = function () {
        window.debounce(redrawPins);
      };
      typeFilter.addEventListener('change', onFilterChange);
      priceFilter.addEventListener('change', onFilterChange);
      roomsFilter.addEventListener('change', onFilterChange);
      guestsFilter.addEventListener('change', onFilterChange);
      featuresFilter.addEventListener('change', onFilterChange, true);
    },

    create: function (hotel) {
      var mapPin = mapPinTemplate.cloneNode(true);
      mapPin.style.left = (hotel.location.x - PIN_OFFSET.x) + 'px';
      mapPin.style.top = (hotel.location.y - PIN_OFFSET.y) + 'px';
      mapPin.querySelector('img').src = hotel.author.avatar;
      return mapPin;
    },

    update: function (hotel) {
      [].forEach.call(window.pins.list, function (item) {
        mapPins.removeChild(item);
      });
      this.render(hotel);
    },

    render: function (hotels) {
      var fragment = document.createDocumentFragment();
      window.map.offersToLoad(hotels).forEach(function (item) {
        fragment.appendChild(window.pins.create(item));
      });
      mapPins.appendChild(fragment);
      getPinList();
    },
    pinSwitch: function (evt) {
      var target = evt.target;
      var active = mapPins.querySelector('.map__pin--active') || mapPins.querySelector('.map__pin');
      while (target !== mapPins) {
        if (target.className === 'map__pin' && target !== active) {
          target.classList.add('map__pin--active');
          active.classList.remove('map__pin--active');
          window.showCard(target);
        } else if (target.className === 'map__pin map__pin--active') {
          target.classList.remove('map__pin--active');
          window.showCard(target);
        }
        target = target.parentNode;
      }
    },
    move: function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var pinSizeShift = {
        x: 20,
        y: 66
      };

      var moveBox = {
        top: 100,
        bottom: 500
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        myPin.style.top = (myPin.offsetTop - shift.y) + 'px';
        myPin.style.left = (myPin.offsetLeft - shift.x) + 'px';
        if (myPin.offsetTop - shift.y < moveBox.top - pinSizeShift.y) {
          myPin.style.top = (moveBox.top - pinSizeShift.y) + 'px';
        }
        if (myPin.offsetTop - shift.y > moveBox.bottom - pinSizeShift.y) {
          myPin.style.top = (moveBox.bottom - pinSizeShift.y) + 'px';
        }

        window.form.getAddress((myPin.offsetLeft - shift.x + pinSizeShift.x), (myPin.offsetTop - shift.y + pinSizeShift.y));

      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },

    list: ''
  };
})();
