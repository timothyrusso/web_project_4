import Popup from './Popup.js';

class PopupWithImage extends Popup {
  open({ link, name }) {
    // puts 'name' from args to the '.popup__caption' selector
    // find image by the 'popup__image' selector, set 'src' and 'alt' for it
    // call super.open(), it will call the orginal method from the original Popup class
    this._popupElement.querySelector('.popup__caption').textContent = name;
    const image = this._popupElement.querySelector('.popup__preview-image');
    image.src = link;
    image.alt = `Preview of ${name}`;
    super.open();
  }
}

export default PopupWithImage;
