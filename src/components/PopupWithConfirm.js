import Popup from './Popup.js';

class PopupWithConfirm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._popupForm.querySelector('.submit-button').textContent = 'Deleting...';
    } else {
      this._popupForm.querySelector('.submit-button').textContent = 'Yes';
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.renderLoading(true);
      this._handleFormSubmit();
      this.close();
    })
  }

  close() {
    super.close();
  }
}

export default PopupWithConfirm;
