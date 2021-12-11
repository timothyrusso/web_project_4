import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(data) {
    // puts 'name' from args to the '.popup__caption' selector
    // find image by the 'popup__image' selector, set 'src' and 'alt' for it
    // call super.open(), it will call the orginal method from the original Popup class
    this._popupElement.querySelector('.popup__caption').textContent = data.name;
    const image = this._popupElement.querySelector('.popup__preview-image');
    image.src = data.link;
    image.alt = `Preview of ${data.name}`;
    super.open();
  }
}

export default PopupWithImage;
