/**
 * Handle the creation of the card element.
 * @param  {} data - Card name and card link.
 * @param  {} cardSelector - Card id template.
 */
class Card {
  constructor({ data, handleCardClick, handleDeleteCard, handleLikeIcon }, cardSelector, ownerId) {
    this._name = data.name;
    this._link = data.link;
    this._userId = data.owner._id;
    this._cardId = data._id;
    this._likes = data.likes;
    this._ownerId = ownerId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeIcon = handleLikeIcon;
    this._cardSelector = cardSelector;
  }

  /**
   * Event listeners handler.
   */
  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => this._handleCardClick({ link: this._link, name: this._name }))
    this._element.querySelector('.card__like').addEventListener('click', (evt) => this._handleLikeIcon(evt, this))
    this._element.querySelector('.card__delete').addEventListener('click', () => this._handleDeleteCard(this))
    this._setDeleteButton()
    this._setLikes()
  }

  /**
   * Handle the like button.
   * @param  {} evt
   */
  // _handleLikeIcon(evt) {
  //   evt.target.classList.toggle('card__like_active')
  // }

  _setDeleteButton() {
    if (this._userId !== this._ownerId) {
      this._element.querySelector('.card__delete').style.display = 'none';
    }
  }

  _setLikes() {
    if (this._likes.length > 0) {
      this._element.querySelector('.card__like-counter').textContent = this._likes.length;
    }
    if (this._likes.filter(item => item._id === this._ownerId).length > 0) {
      this._element.querySelector('.card__like').classList.add('card__like_active')
    }
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

  removeCard() {
    this._element.remove()
    this._element = null
  }
}

export default Card;
