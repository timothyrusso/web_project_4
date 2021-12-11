export const initialCards = [
  {
    name: "Palouse Falls",
    link: "./images/palouse-falls.png"
  },
  {
    name: "Ghost town of Bodie",
    link: "./images/ghost-town-of-bodie.png"
  },
  {
    name: "Car Forest",
    link: "./images/car-forest.jpeg"
  },
  {
    name: "Byodo-In Temple",
    link: "./images/byodo-in-temple.png"
  },
  {
    name: "Fort Jefferson",
    link: "./images/fort-jefferson.png"
  },
  {
    name: "Garden of the Gods",
    link: "./images/garden-of-the-gods.png"
  }
];

export const selectors = {
  cardList: '.cards-grid',
  cardTemplate: '#card-template',
  previewPopup: 'popup_type_preview',
  profilePopup: 'popup_type_edit',
  cardPopup: 'popup_type_add',
  name: 'profile__name',
  job: 'profile__about-me',
  editButton: '.edit-button',
  addButton: '.add-button'
};

export const elements = {
  editFormElement: document.querySelector('.popup_type_edit').querySelector('.popup__form'),
  addFormElement: document.querySelector('.popup_type_add').querySelector('.popup__form'),
  profileNameElement: document.querySelector('.popup__input_field_name'),
  profileJobElement: document.querySelector('.popup__input_field_about-me')
};

export const validationSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};
