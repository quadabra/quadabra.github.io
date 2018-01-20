'use strict';

window.form = (function () {

  var MAX_PRICE = 10000000;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var TIME_IN = ['12:00', '13:00', '14:00'];
  var TIME_OUT = ['12:00', '13:00', '14:00'];
  var APARTMENT_TYPES = ['bungalo', 'flat', 'house', 'palace'];
  var APARTMENT_PRICES = ['0', '1000', '5000', '10000'];
  var ROOMS = ['1', '2', '3', '100'];
  var GUESTS = ['2', '1, 2', '0, 1, 2', '3'];

  var myForm = document.querySelector('.notice__form');
  var inputTitle = myForm.querySelector('#title');
  var inputAddress = myForm.querySelector('#address');
  var inputType = myForm.querySelector('#type');
  var inputPrice = myForm.querySelector('#price');
  var inputCheckIn = myForm.querySelector('#timein');
  var inputCheckOut = myForm.querySelector('#timeout');
  var roomsNumber = myForm.querySelector('#room_number');
  var guestCapacity = myForm.querySelector('#capacity');
  var formSubmit = myForm.querySelector('.form__submit');
  var myInputs = document.querySelectorAll('fieldset');
  var formReset = myForm.querySelector('.form__reset');
  var formAvatar = myForm.querySelector('#avatar');
  var noticePreview = myForm.querySelector('.notice__preview > img');
  var formPhotos = myForm.querySelector('#images');
  var formPhotosContainer = myForm.querySelector('.form__photo-container');
  var formPhotosUpload = myForm.querySelector('.form__photo-container > .upload');
  // перестилизация отображения фотографий
  formPhotosUpload.style = 'width: 140px;';
  formPhotosContainer.style = 'display: flex; flex-wrap: wrap; width: auto;';

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  var syncValueWithOption = function (element, value) {
    [].forEach.call(element.options, function (item, i) {
      item.hidden = (value.indexOf(i) === -1);
      item.selected = (value.indexOf(i) !== -1);
    });
  };

  var myInputsSwitch = function (inputFields, attribute) {
    inputFields.forEach(function (item) {
      item.disabled = attribute;
    });
  };

  var inputDisable = true;
  var inputEnable = false;

  myInputsSwitch(myInputs, inputDisable);

  inputTitle.required = true;
  inputAddress.setAttribute('readonly', 'readonly');
  inputAddress.required = true;
  var priceList = {
    '0': '1000',
    '1': '0',
    '2': '5000',
    '3': '10000'
  };
  var minPrice = priceList[inputType.selectedIndex];
  inputPrice.setAttribute('min', minPrice);
  inputPrice.setAttribute('max', MAX_PRICE);
  inputPrice.required = true;

  inputPrice.addEventListener('invalid', function (evt) {
    evt.target.setCustomValidity((!evt.target.value) ? 'Установите цену' : '');
  });

  inputTitle.addEventListener('input', function (evt) {
    evt.target.setCustomValidity((evt.target.value.length < 30 || evt.target.value.length > 100) ?
      'От 30 до 100 символов' : '');
  });

  inputAddress.addEventListener('invalid', function (evt) {
    evt.target.setCustomValidity((!evt.target.value) ? 'Установите пин' : '');
  });

  inputType.addEventListener('change', function () {
    window.synchronizeFields(inputType, inputPrice, APARTMENT_TYPES, APARTMENT_PRICES, syncValueWithMin);
  });

  inputPrice.addEventListener('invalid', function (evt) {
    evt.target.setCustomValidity((evt.target.value < priceList[inputType.selectedIndex]) ?
      ('Минимальное значение ' + priceList[inputType.selectedIndex]) : '');
  });

  inputCheckIn.addEventListener('change', function () {
    window.synchronizeFields(inputCheckIn, inputCheckOut, TIME_IN, TIME_OUT, syncValues);
  });

  inputCheckOut.addEventListener('change', function () {
    window.synchronizeFields(inputCheckOut, inputCheckIn, TIME_OUT, TIME_IN, syncValues);
  });

  roomsNumber.addEventListener('change', function () {
    window.synchronizeFields(roomsNumber, guestCapacity, ROOMS, GUESTS, syncValueWithOption);
  });

  var onSave = function () {
    formSubmit.style = 'background-color: green;';
    formSubmit.textContent = 'Отправлено';
  };

  var onError = function (message) {
    formSubmit.style = 'background-color: red;';
    formSubmit.textContent = message;
  };

  formSubmit.addEventListener('click', function (evt) {
    if (inputAddress.validity.valid && inputTitle.validity.valid && inputPrice.validity.valid) {
      var data = new FormData(myForm);
      evt.preventDefault();
      window.backend.save(data, onSave, onError);
      myForm.reset();
    }
  });

  formReset.addEventListener('click', function () {
    formSubmit.style = 'none';
    formSubmit.textContent = 'Опубликовать';
    myForm.reset();
  });

  var photoLoader = function (source, callback) {
    var file = source.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', function () {
        callback(reader);
      });
    }
  };

  var showAvatar = function (reader) {
    noticePreview.src = reader.result;
  };

  var showPhoto = function (reader) {
    var photo = document.createElement('img');
    photo.src = reader.result;
    photo.height = 70;
    photo.style = 'margin: 0 5px 5px';
    formPhotosContainer.appendChild(photo);
  };

  formAvatar.addEventListener('change', function () {
    photoLoader(formAvatar, showAvatar);
  });
  formPhotos.addEventListener('change', function () {
    photoLoader(formPhotos, showPhoto);
  });

  return {
    enable: function () {
      myInputsSwitch(myInputs, inputEnable);
      myForm.classList.remove('notice__form--disabled');
    },
    getAddress: function (x, y) {
      inputAddress.value = 'x: ' + x + ' y: ' + y;
    }
  };

})();
