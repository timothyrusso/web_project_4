

class Card {

  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;  // Template of our card
  }

  _setEventListeners() {
    imageEl.addEventListener('click', () => handlePreviewPicture(card))
    likeButton.addEventListener('click', (evt) => handleLikeIcon(evt));
    cardDeleteButton.addEventListener('click', () => handleDeleteCard(cardElement));
  }

  _handlePreviewPicture() {

  }

  _handleLikeIcon() {

  }

  _handleDeleteCard() {

  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    this._setEventListeners();
  }
}


export default Card;
