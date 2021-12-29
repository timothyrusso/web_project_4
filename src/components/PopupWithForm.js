import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = this._popupElement.querySelectorAll('.popup__input');
    this._values = {};
  }

  _getInputValues() {
    this._inputs.forEach(input => {
      this._values[input.name] = input.value
    });
    return this._values;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._popupForm.querySelector('.submit-button').textContent = 'Saving...';
    } else {
      this._popupForm.querySelector('.submit-button').textContent = 'Create';
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.renderLoading(true);
      this._handleFormSubmit(this._getInputValues());
    })
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

}

export default PopupWithForm;
