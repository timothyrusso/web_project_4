import Popup from './Popup.js';

/**
 * Class for the confirmation popup, which appears when you try to delete a card
 * @param {String} popupSelector - Class selector for the popup
 * @param {Function} handleFormSubmit - Submit handler function
 */
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
