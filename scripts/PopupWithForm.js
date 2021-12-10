import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputList = this._popupElement.querySelectorAll('.popup__input');
    const formValues = {};
    inputList.forEach(input => {
      console.log('input.name', input.name);
      formValues[input.name] = input.value
    });
    console.log('test', formValues)
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}

export default PopupWithForm;
