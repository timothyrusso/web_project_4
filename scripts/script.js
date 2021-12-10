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
