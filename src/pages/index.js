import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { selectors, elements, validationSettings, apiConfig } from "../utils/constants.js";
import Api from "../components/Api.js"
import PopupWithConfirmation from "../components/PopupWithConfirmation";


/**********************
 * INSTANCES CREATION *
 **********************/

const cardSection = new Section({
  renderer: (data) => {
    const card = createCard(data).generateCard();
    cardSection.appendItem(card);
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
    api.saveProfileInfo({ name: data.name, about: data.aboutMe })
      .then((user) => {
        userInfo.setUserInfo({ name: user.name, aboutMe: user.about, avatar: user.avatar })
        userInfoPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        userInfoPopup.renderLoading(false);
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
    api.saveCards({ name: data.name, imageLink: data.link })
      .then((card) => {
        const cardElement = createCard(card).generateCard();
        cardSection.prependItem(cardElement);
        newCardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        newCardPopup.renderLoading(false);
      })
  }
});

const editProfileImagePopup = new PopupWithForm({
  popupSelector: selectors.editImagePopup,
  handleFormSubmit: (data) => {
    api.saveProfileImage({ avatar: data.link })
      .then((user) => {
        userInfo.setUserAvatar({ link: user.avatar })
        editProfileImagePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editProfileImagePopup.renderLoading(false);
      })
  }
});

const deleteCardPopup = new PopupWithConfirmation({
  popupSelector: selectors.deleteCardPopup
});


/*******************
 * FORM VALIDATION *
 *******************/

const formValidators = {}

// enable validation
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    // here you get the name of the form
    const formName = formElement.getAttribute('name')
    // here you store a validator by the `name` of the form
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);


/************************
 * CREATE CARD FUNCTION *
 ************************/

const createCard = (data) => {
  const cardElement = new Card({
    data,
    handleCardClick: (imageData) => {
      imagePreviewPopup.open(imageData);
    },
    handleDeleteCard: ({ _cardId }) => {
      deleteCardPopup.open();
      deleteCardPopup.setSubmitAction(() => {
        api.deleteCards({ cardId: _cardId })
          .then(() => {
            cardElement.removeCard();
            deleteCardPopup.close();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            deleteCardPopup.renderLoading(false);
          })
      })
    },
    handleLikeIcon: (data) => {
      if (data._likes.some(item => item._id === userInfo._userId)) {
        api.dislikeCards({ cardId: data._cardId })
          .then((likes) => {
            cardElement.setLikesInfo(likes)
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        api.likeCards({ cardId: data._cardId })
          .then((likes) => {
            cardElement.setLikesInfo(likes)
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
  }, selectors.cardTemplate, userInfo._userId);
  return cardElement
};


/***********************
 * SET EVENT LISTENERS *
 ***********************/

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
  formValidators[ elements.editFormElement.getAttribute('name') ].resetValidation();
  userInfoPopup.open();
})

const addModalBtn = document.querySelector(selectors.addButton);
addModalBtn.addEventListener('click', () => {
  formValidators[ elements.addFormElement.getAttribute('name') ].resetValidation();
  newCardPopup.open();
})

const profileImageButton = document.querySelector(selectors.profileImageButton);
profileImageButton.addEventListener('click', () => {
  const { image } = userInfo.getUserInfo();
  elements.profileImagePopupElement.value = image;
  formValidators[ elements.editImageProfileFormElement.getAttribute('name') ].resetValidation();
  editProfileImagePopup.open();
})


/*******
 * API *
 *******/

const api = new Api(apiConfig);

Promise.all([api.getCards(), api.getProfileInfo()])
  .then(([cards, info]) => {
    const { name, about, avatar, _id } = info;
    userInfo.setUserInfo({ name, aboutMe: about, avatar, _id });
    cardSection.items = cards;
    cardSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  })
