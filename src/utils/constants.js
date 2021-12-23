import palouseFalls from "../images/palouse-falls.png";
import ghostTown from "../images/ghost-town-of-bodie.png";
import carForest from "../images/car-forest.png";
import byodoTemple from "../images/byodo-in-temple.png";
import fortJefferson from "../images/fort-jefferson.png";
import garderGods from "../images/garden-of-the-gods.png";

export const initialCards = [
  {
    name: "Palouse Falls",
    link: palouseFalls
  },
  {
    name: "Ghost town of Bodie",
    link: ghostTown
  },
  {
    name: "Car Forest",
    link: carForest
  },
  {
    name: "Byodo-In Temple",
    link: byodoTemple
  },
  {
    name: "Fort Jefferson",
    link: fortJefferson
  },
  {
    name: "Garden of the Gods",
    link: garderGods
  }
];

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
  editButton: '.edit-button',
  addButton: '.add-button',
  profileImageButton: '.profile__image-wrapper',
  deleteCardButton: '.card__delete'
};

export const elements = {
  editFormElement: document.querySelector('.popup_type_edit').querySelector('.popup__form'),
  addFormElement: document.querySelector('.popup_type_add').querySelector('.popup__form'),
  editImageProfileFormElement: document.querySelector('.popup_type_profile-image').querySelector('.popup__form'),
  profileNameElement: document.querySelector('.popup__input_field_name'),
  profileJobElement: document.querySelector('.popup__input_field_about-me'),
  profileImageElement: document.querySelector('.profile__image')
};

export const validationSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

export const userConfig = {
  url: 'https://around.nomoreparties.co/v1/group-12/users/me',
  headers: {
    authorization: "d32f6df6-a478-44c7-98e2-39f20efb7fb4",
    "Content-Type": "application/json"
  }
}
