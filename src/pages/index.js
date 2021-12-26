import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { selectors, elements, validationSettings, userConfig, initialCards } from "../utils/constants.js";
import Api from "../components/Api.js"


/*******
 * API *
 *******/

const api = new Api(userConfig);

Promise.all([api.getCards(), api.getProfileInfo()])
  .then(([cards, info]) => {
    cardSection.items = cards;
    cardSection.renderItems();
    const { name, about, avatar } = info;
    userInfo.setUserInfo({ name, aboutMe: about })
    userInfo.setUserAvatar({ link: avatar })
  })
  .catch((err) => {
    console.log(err);
  })


/**********************
 * INSTANCES CREATION *
 **********************/

const cardSection = new Section({
  renderer: (data) => {
    createCard(data)
  }
}, selectors.cardList)

const imagePreviewPopup = new PopupWithImage(selectors.previewPopup);

const userInfo = new UserInfo({
  nameSelector: selectors.name,
  jobSelector: selectors.job,
  imageSelector: selectors.image
})

const userInfoPopup = new PopupWithForm({
  popupSelector: selectors.profilePopup,
  handleFormSubmit: (data) => {
    api.saveProfileInfo({ name: data.name, about: data.aboutMe }).then((res) => {
      userInfo.setUserInfo({ name: res.name, aboutMe: res.about })
    })
  }
});

const newCardPopup = new PopupWithForm({
  popupSelector: selectors.cardPopup,
  handleFormSubmit: (rawData) => {
    const data = {
      name: rawData.title,
      link: rawData.link
    };
    api.saveCards({ name: data.name, link: data.link }).then((res) => {
      createCard(res);
    })
  }
});

const editProfileImagePopup = new PopupWithForm({
  popupSelector: selectors.editImagePopup,
  handleFormSubmit: (data) => {
    api.saveProfileImage({ avatar: data.link }).then((res) => {
      userInfo.setUserAvatar({ link: res.avatar })
    })
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
  elements.profileNamePopupElement.value = name;
  elements.profileJobPopupElement.value = job;
  userInfoPopup.open();
})

const addModalBtn = document.querySelector(selectors.addButton);
addModalBtn.addEventListener('click', () => {
  newCardPopup.open();
  addFormValidator.toggleButton();
})

const profileImageButton = document.querySelector(selectors.profileImageButton);
profileImageButton.addEventListener('click', () => {
  const { image } = userInfo.getUserInfo();
  elements.profileImagePopupElement.value = image;
  editProfileImagePopup.open();
  editImageProfileFormValidator.toggleButton();
})


// ELIMINARE LE COSTANTI INUTILI

// const deleteCardButton = document.querySelector(selectors.deleteCardButton);
// deleteCardButton.addEventListener('click', () => {
//   deleteCardPopup.open();
// })







