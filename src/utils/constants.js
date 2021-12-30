export const selectors = {
  cardList: '.cards-grid',
  cardTemplate: '#card-template',
  previewPopup: 'popup_type_preview',
  profilePopup: 'popup_type_edit',
  cardPopup: 'popup_type_add',
  editImagePopup: 'popup_type_profile-image',
  deleteCardPopup: 'popup_type_delete-card',
  name: 'profile__name',
  job: 'profile__about-me',
  image: 'profile__image',
  editButton: '.edit-button',
  addButton: '.add-button',
  profileImageButton: '.profile__image-wrapper'
};

export const elements = {
  editFormElement: document.querySelector('.popup_type_edit').querySelector('.popup__form'),
  addFormElement: document.querySelector('.popup_type_add').querySelector('.popup__form'),
  editImageProfileFormElement: document.querySelector('.popup_type_profile-image').querySelector('.popup__form'),
  profileNameElement: document.querySelector('.profile__name'),
  profileJobElement: document.querySelector('.profile__about-me'),
  profileImageElement: document.querySelector('.profile__image'),
  profileImagePopupElement: document.querySelector('.popup__input_image_link'),
  profileNamePopupElement: document.querySelector('.popup__input_field_name'),
  profileJobPopupElement: document.querySelector('.popup__input_field_about-me')
};

export const validationSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

export const apiConfig = {
  baseUrl: 'https://around.nomoreparties.co/v1/',
  token: 'd32f6df6-a478-44c7-98e2-39f20efb7fb4',
  groupId: 'group-12'
}
