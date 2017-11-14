var dmsMenuButton = document.querySelector('.dms-nav__btn-menu');
var dmsSearchButton = document.querySelector('.dms-nav__btn-search');
var dmsOptionsButton = document.querySelector('.dms-nav__btn-options');
var dmsMenuList = document.querySelector('.dms-nav-menu');
var dmsSearch = document.querySelector('.dms-search');
var dmsOptions = document.querySelector('.dms-options');
dmsMenuList.classList.add('dms-nav-menu_hidden');
dmsMenuButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  dmsMenuList.classList.toggle('dms-nav-menu_hidden');
  dmsMenuButton.classList.toggle('dms-nav__btn-menu_active');
});

dmsSearch.classList.add('dms-search_hidden');
dmsSearchButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  dmsSearch.classList.toggle('dms-search_hidden');
  dmsSearchButton.classList.toggle('dms-nav__btn-search_active');
});
dmsOptions.classList.add('dms-options_hidden');
dmsOptionsButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  dmsOptions.classList.toggle('dms-options_hidden');
  dmsOptionsButton.classList.toggle('dms-nav__btn-options_active');
});

var dmsSearchDate = document.querySelector('.dms-search__date-open');
var dmsSearchForm = document.querySelector('.date-search');
dmsSearchForm.classList.add('dms-search__form_hidden');
dmsSearchDate.addEventListener('click', function (evt) {
  evt.preventDefault();
  dmsSearchForm.classList.toggle('dms-search__form_hidden');
});

var dmsSearchNumber = document.querySelector('.dms-search__number-open');
var dmsSearchFormNumber = document.querySelector('.number-search');
dmsSearchFormNumber.classList.add('dms-search__form_hidden');
dmsSearchNumber.addEventListener('click', function (evt) {
  evt.preventDefault();
  dmsSearchFormNumber.classList.toggle('dms-search__form_hidden');
});

var dmsDeliveryOptionsBtn = document.querySelector('.dms-delivery__options-btn');
var dmsDeliveryOptions = document.querySelector('.dms-delivery__options');

dmsDeliveryOptions.classList.add('dms-delivery__options_hidden');
dmsDeliveryOptionsBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  dmsDeliveryOptions.classList.toggle('dms-delivery__options_hidden');
  dmsDeliveryOptionsBtn.classList.toggle('dms-delivery__options-btn_active')
});
