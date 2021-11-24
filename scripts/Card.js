const previewImageModalWindow = document.querySelector('.popup_type_preview'); // Let's find the preview modal in the DOM
const previewImageElement = document.querySelector('.popup__preview-image');
const captionImageElement = document.querySelector('.popup__caption');

function closeEscButton(evt) { //---CLOSE THE POPUP WITH THE ESCAPE
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key == 'Escape' && openedPopup) {
    closeModalWindow(openedPopup);
  }
}

function openModalWindow(modal) { //---OPEN THE FORMS
  disableModalButton(modal);
  modal.classList.add('popup_opened');
  addEscapeListener();
}

function closeModalWindow(modal) { //---CLOSE THE FORMS
  modal.classList.remove('popup_opened');
  removeEscapeListener();
}

function addEscapeListener() { //---ADD THE LISTENER FOR THE CLOSEESCBUTTON
  document.addEventListener('keydown', closeEscButton);
}

function removeEscapeListener() { //REMOVE THE LISTENER FOR THE CLOSEESCBUTTON
  document.removeEventListener('keydown', closeEscButton);
}

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

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').style.backgroundImage = `url(${this._link})`;
    this._element.querySelector('.card__title').textContent = this._text;
  }
}


export default Card;
