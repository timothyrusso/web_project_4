import { openModalWindow } from './utils.js';

const previewImageModalWindow = document.querySelector('.popup_type_preview');
const previewImageElement = document.querySelector('.popup__preview-image');
const captionImageElement = document.querySelector('.popup__caption');

/**
 * Handle the creation of the card element.
 * @param  {} data - Card name and card link.
 * @param  {} cardSelector - Card id template.
 */
class Card {
  constructor(data, cardSelector) {
    this._name = data.name
    this._link = data.link
    this._cardSelector = cardSelector  // Template of our card
  }

  /**
   * Event listeners handler.
   */
  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => this._handlePreviewPicture())
    this._element.querySelector('.card__like').addEventListener('click', (evt) => this._handleLikeIcon(evt))
    this._element.querySelector('.card__delete').addEventListener('click', () => this._handleDeleteCard())
  }

  /**
   * Handler for the image preview popup.
   */
  _handlePreviewPicture() {
    captionImageElement.textContent = this._name
    previewImageElement.src = this._link
    previewImageElement.alt = `Preview of ${this._name}` // Add the alt attribute to the images
    openModalWindow(previewImageModalWindow)
  }

  /**
   * Handle the like button.
   * @param  {} evt
   */
  _handleLikeIcon(evt) {
    evt.target.classList.toggle('card__like_active')
  }

  /**
   * Handle the delete button.
   */
  _handleDeleteCard() {
    this._element.remove()
    this._element = null
  }

  /**
   * Clone the card template.
   */
  _getTemplate() {
    return document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true)
  }

  /**
   * Handle the card generation.
   */
  generateCard() {
    this._element = this._getTemplate()
    this._setEventListeners()
    this._element.querySelector('.card__image').style.backgroundImage = `url(${this._link})`
    this._element.querySelector('.card__title').textContent = this._name
    return this._element
  }
}

export default Card;
