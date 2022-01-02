/**
 * Class that handle the creation of the card element
 * @param {Object} data - Object containing all the information of the card
 * @param {Function} handleCardClick - Function that handle the click of the image card
 * @param {Function} handleDeleteCard - Function that handle the cancellation of the card
 * @param {Function} handleLikeIcon - Function that handle the behavior of the like button
 * @param {String} cardSelector - Card id template
 * @param {String} ownerId - Card id template
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
   * Private method that handle the event listeners of the class
   */
  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => this._handleCardClick({ link: this._link, name: this._name }))
    this._likeElement.addEventListener('click', () => this._handleLikeIcon(this))
    this._element.querySelector('.card__delete').addEventListener('click', () => this._handleDeleteCard(this))
  }

  /**
   * Private method that handle the visualization of the delete button on the card
   */
  _setDeleteButton() {
    if (this._userId !== this._ownerId) {
      this._element.querySelector('.card__delete').style.display = 'none';
    }
  }

  /**
   * Private method that handle the visualization of the likes on the cards
   */
  _updateLikes() {
    this._element.querySelector('.card__like-counter').textContent = this._likes.length;
    if (this._likes.filter(item => item._id === this._ownerId).length > 0) {
      this._likeElement.classList.add('card__like_active')
    }
  }

  /**
   * Private method that clone the card template
   * @returns {Element} New cloned card element from the HTML template
   */
  _getTemplate() {
    return document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true)
  }

  /**
   * Public method that handle the card creation
   * @returns {Element} Cloned card element generated from the _getTemplate() method
   */
  generateCard() {
    this._element = this._getTemplate()
    this._likeElement = this._element.querySelector('.card__like')
    this._setEventListeners()
    this._setDeleteButton()
    this._updateLikes()
    this._element.querySelector('.card__image').style.backgroundImage = `url(${this._link})`
    this._element.querySelector('.card__title').textContent = this._name
    return this._element
  }

  /**
   * Public method that handle the card cancellation from the DOM
   */
  removeCard() {
    this._element.remove()
    this._element = null
  }

  /**
   * Public method that set the information of the card's likes on the page
   * @param {Object} data - Object containing the array with the likes object
   */
  setLikesInfo(data) {
    this._likeElement.classList.toggle('card__like_active');
    this._likes = data.likes;
    this._updateLikes();
  }
}

export default Card;
