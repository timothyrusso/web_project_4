import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.data] = input.value);  // DA RIVEDERE, I LINK?
    return this._formValues;
  }

  setEventListeners() {
    super._setEventListeners();
    this._popupForm.addEventListener('submit', handleFormSubmit);
    this.close();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}

export default PopupWithForm;
