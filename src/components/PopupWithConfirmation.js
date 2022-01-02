import Popup from './Popup.js';

class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector('.popup__form');
    this._submitButton = this._popupForm.querySelector('.submit-button');
    this._handleFormSubmit = handleFormSubmit;
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Deleting...';
    } else {
      this._submitButton.textContent = 'Yes';
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.renderLoading(true);
      this._handleFormSubmit();
    })
  }
}

export default PopupWithConfirmation;
