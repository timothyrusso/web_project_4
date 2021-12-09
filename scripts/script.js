import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import {initialCards, selectors} from "./constants.js"

const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = new Card(item, selectors.cardTemplate);
    console.log(cardElement);
    cardSection.addItem(cardElement.generateCard());
  }
}, selectors.cardList)

cardSection.renderItems();
