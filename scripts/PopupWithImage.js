import Popup from './Popup.js';

class PopupWithImage extends Popup {
  open({ link, name }) {
    // puts 'name' from args to the '.popup__caption' selector
    // find image by the 'popup__image' selector, set 'src' and 'alt' for it
    // call super.open(), it will call the orgina method from the original Popup class
  }
}

export default PopupWithImage;
