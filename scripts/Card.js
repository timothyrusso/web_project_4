import { openModalWindow } from './utils.js';

const previewImageModalWindow = document.querySelector('.popup_type_preview'); // Let's find the preview modal in the DOM
const previewImageElement = document.querySelector('.popup__preview-image');
const captionImageElement = document.querySelector('.popup__caption');

class Card {

  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;  // Template of our card
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => this._handlePreviewPicture())
    this._element.querySelector('.card__like').addEventListener('click', (evt) => this._handleLikeIcon(evt));
    this._element.querySelector('.card__delete').addEventListener('click', () => this._handleDeleteCard());
  }

  _handlePreviewPicture() {
    captionImageElement.textContent = this._name;
    previewImageElement.src = this._link;
    previewImageElement.alt = `Preview of ${this._name}`; // Add the alt attribute to the images
    openModalWindow(previewImageModalWindow);
  }

  _handleLikeIcon(evt) {
    evt.target.classList.toggle('card__like_active');
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__image').style.backgroundImage = `url(${this._link})`;
    this._element.querySelector('.card__title').textContent = this._name;
    return this._element;
  }
}

export default Card;
