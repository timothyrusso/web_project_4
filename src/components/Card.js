/**
 * Handle the creation of the card element.
 * @param  {} data - Card name and card link.
 * @param  {} cardSelector - Card id template.
 */
class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._name = data.name
    this._link = data.link
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector  // Template of our card
  }

  /**
   * Event listeners handler.
   */
  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => this._handleCardClick({ link: this._link, name: this._name }))
    this._element.querySelector('.card__like').addEventListener('click', (evt) => this._handleLikeIcon(evt))
    this._element.querySelector('.card__delete').addEventListener('click', () => this._handleDeleteCard())
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