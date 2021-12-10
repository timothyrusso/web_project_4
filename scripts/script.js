import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import { initialCards, selectors } from "./constants.js"


const cardSection = new Section({
  items: initialCards,
  renderer: (data) => {
    const cardElement = new Card({
      data, handleCardClick: (imageData) => {
        imagePreviewPopup.open(imageData);
      }
    }, selectors.cardTemplate);
    cardSection.addItem(cardElement.generateCard());
  }
}, selectors.cardList)

cardSection.renderItems();


const imagePreviewPopup = new PopupWithImage(selectors.previewPopup);

imagePreviewPopup._setEventListeners();


const userInfo = new UserInfo({
  nameSelector: 'profile__name',
  jobSelector: 'profile__about-me'
})

const userInfoPopup = new PopupWithForm({
  popupSelector: 'popup_type_edit',
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data)
  }
});

userInfoPopup._setEventListeners();


const newCardPopup = new PopupWithForm({
  popupSelector: 'popup_type_add',
  handleFormSubmit: (data) => {
    const card = new Card({
      data,
      handleCardClick: () => {
        imagePopup.open(data);
      }
    }, cardSelector);
    cardList.addItem(card.generateCard())
  }
});

newCardPopup._setEventListeners();




// Il resto delle cose, dovrebbero essere solamente gli eventListeners per aprire i due popup

const editButton = document.querySelector('.edit-button');
editButton.addEventListener('click', () => userInfoPopup.open());

const addModalBtn = document.querySelector('.add-button');
addModalBtn.addEventListener('click', () => {
  newCardPopup.open();
  addFormValidator.toggleButton();
}
);



/**************
 * VALIDATION *
 **************/

 const validationSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
}

const editModalWindow = document.querySelector('.popup_type_edit');
const addModalWindow = document.querySelector('.popup_type_add');
const editFormElement = editModalWindow.querySelector('.popup__form');
const addFormElement = addModalWindow.querySelector('.popup__form');

// Creation of two instances of FormValidator
const editFormValidator = new FormValidator(validationSettings, editFormElement);
const addFormValidator = new FormValidator(validationSettings, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

