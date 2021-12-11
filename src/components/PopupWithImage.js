import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardImage = this._popupElement.querySelector('.popup__preview-image');
  }

  open(data) {
    // puts 'name' from args to the '.popup__caption' selector
    // find image by the 'popup__image' selector, set 'src' and 'alt' for it
    // call super.open(), it will call the orginal method from the original Popup class
    this._popupElement.querySelector('.popup__caption').textContent = data.name;
    this._cardImage.src = data.link;
    this._cardImage.alt = `Preview of ${data.name}`;
    super.open();
  }
}

export default PopupWithImage;
