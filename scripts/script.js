import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import { initialCards, selectors, elements, validationSettings } from "./constants.js";


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
  nameSelector: selectors.name,
  jobSelector: selectors.job
})

const userInfoPopup = new PopupWithForm({
  popupSelector: selectors.profilePopup,
  handleFormSubmit: (event, data) => {
    event.preventDefault();
    userInfo.setUserInfo(data)
    userInfoPopup.close()
  }
});

userInfoPopup._setEventListeners();


const newCardPopup = new PopupWithForm({
  popupSelector: selectors.cardPopup,
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




/************************
 * OPEN BUTTON HANDLERS *
 ************************/

const editButton = document.querySelector(selectors.editButton);
editButton.addEventListener('click', () => {
  userInfo.getUserInfo();
  userInfoPopup.open();
})

const addModalBtn = document.querySelector(selectors.addButton);
addModalBtn.addEventListener('click', () => {
  newCardPopup.open();
  addFormValidator.toggleButton();
})


/**************
 * VALIDATION *
 **************/

const editFormValidator = new FormValidator(validationSettings, elements.editFormElement);
const addFormValidator = new FormValidator(validationSettings, elements.addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
