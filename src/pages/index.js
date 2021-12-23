import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, selectors, elements, validationSettings, userConfig } from "../utils/constants.js";
import Api from "../components/Api.js"


/**********************
 * INSTANCES CREATION *
 **********************/

const cardSection = new Section({
  items: initialCards,
  renderer: (data) => {
    createCard(data)
  }
}, selectors.cardList)

const imagePreviewPopup = new PopupWithImage(selectors.previewPopup);

const userInfo = new UserInfo({
  nameSelector: selectors.name,
  jobSelector: selectors.job
})

const userInfoPopup = new PopupWithForm({
  popupSelector: selectors.profilePopup,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  }
});

const newCardPopup = new PopupWithForm({
  popupSelector: selectors.cardPopup,
  handleFormSubmit: (rawData) => {
    const data = {
      name: rawData.title,
      link: rawData.link
    };
    createCard(data);
  }
});

const editProfileImagePopup = new PopupWithForm({
  popupSelector: selectors.editImagePopup,
  handleFormSubmit: (data) => {
    elements.profileImageElement.src = data.link;
  }
});

const deleteCardPopup = new PopupWithForm({
  popupSelector: selectors.deleteCardPopup,
  handleFormSubmit: () => {
    handleDeleteCard();
  }
});

const editFormValidator = new FormValidator(validationSettings, elements.editFormElement);

const addFormValidator = new FormValidator(validationSettings, elements.addFormElement);

const editImageProfileFormValidator = new FormValidator(validationSettings, elements.editImageProfileFormElement);


/************************
 * CREATE CARD FUNCTION *
 ************************/

const createCard = (data) => {
  const cardElement = new Card({
    data, handleCardClick: (imageData) => {
      imagePreviewPopup.open(imageData);
    }, handleDeleteClick: () => {
      deleteCardPopup.open();
    }
  }, selectors.cardTemplate)
  cardSection.addItem(cardElement.generateCard())
  return cardElement
};


/****************************
 * INSTANCES INIZIALIZATION *
 ****************************/

editFormValidator.enableValidation();
addFormValidator.enableValidation();
editImageProfileFormValidator.enableValidation();
cardSection.renderItems();
imagePreviewPopup.setEventListeners();
userInfoPopup.setEventListeners();
newCardPopup.setEventListeners();
editProfileImagePopup.setEventListeners();
deleteCardPopup.setEventListeners();


/************************
 * OPEN BUTTON HANDLERS *
 ************************/

const editButton = document.querySelector(selectors.editButton);
editButton.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo();
  elements.profileNameElement.value = name;
  elements.profileJobElement.value = job;
  userInfoPopup.open();
})

const addModalBtn = document.querySelector(selectors.addButton);
addModalBtn.addEventListener('click', () => {
  newCardPopup.open();
  addFormValidator.toggleButton();
})

const profileImageButton = document.querySelector(selectors.profileImageButton);
profileImageButton.addEventListener('click', () => {
  editProfileImagePopup.open();
  editImageProfileFormValidator.toggleButton();
})


// ELIMINARE LE COSTANTI INUTILI

// const deleteCardButton = document.querySelector(selectors.deleteCardButton);
// deleteCardButton.addEventListener('click', () => {
//   deleteCardPopup.open();
// })


/*******
 * API *
 *******/


