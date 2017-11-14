var modallink = document.querySelector('.address-block__button');
var modalwindow = document.querySelector('.modal-feedback');
var modalclose = document.querySelector('.modal-feedback__close-button');
var modalname = modalwindow.querySelector('[name=feedback-name]');
var modalemail = modalwindow.querySelector('[name=feedback-email]');
var modaltext = modalwindow.querySelector('[name=feedback-text]');
var modalform = modalwindow.querySelector('form');
var storagemodalemail = localStorage.getItem('feedback-email');
var storagemodalname = localStorage.getItem('feedback-name');
var textlabel = modalwindow.querySelector('.textarea-placeholder');
var modallabelname = modalwindow.querySelector('.modal__label_name');
var modallabelmail = modalwindow.querySelector('.modal__label_mail');

modallink.addEventListener('click', function (evt) {
  evt.preventDefault();
  modalwindow.classList.toggle('modal-open');
  if (storagemodalname && storagemodalemail) {
    modalname.value = storagemodalname;
    modalemail.value = storagemodalemail;
  }
  else {
    modalname.focus();
  }
});
modalclose.addEventListener('click', function (evt) {
  evt.preventDefault();
  modalwindow.classList.remove('modal-open');
  modalwindow.classList.remove('modal-error');
});
modalform.addEventListener('submit', function (evt) {
  if (!modalname.value || !modalemail.value || !modaltext.value) {
    evt.preventDefault();
    modalwindow.classList.remove("modal-error");
    modalwindow.offsetWidth = modalwindow.offsetWidth;
    modalwindow.classList.add('modal-error');
  }
  else {
    localStorage.setItem('feedback-name', modalname.value);
    localStorage.setItem('feedback-email', modalemail.value);
  }
});
window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    if (modalwindow.classList.contains('modal-open')) {
      modalwindow.classList.remove('modal-open');
    }
  }
});
modaltext.addEventListener('blur', function () {
  if (modaltext.value) {
    textlabel.classList.add('textarea-placeholder_active');
  } else {
    textlabel.classList.remove('textarea-placeholder_active');
  }
});
modalname.addEventListener('blur', function () {
  if (modalname.value) {
    modallabelname.classList.add('text-input_active');
  } else {
    modallabelname.classList.remove('text-input_active');
  }
});
modalemail.addEventListener('blur', function () {
  if (modalemail.value) {
    modallabelmail.classList.add('text-input_active');
  } else {
    modallabelmail.classList.remove('text-input_active');
  }
});
