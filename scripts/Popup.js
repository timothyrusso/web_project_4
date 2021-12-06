class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(`.${popupSelector}`);
    this._handleEscUp = this._handleEscUp.bind(this);
  }

  _handleEscUp(evt) {
    // Prevent default and if event was on ESC button -> call "close" method
    evt.preventDefault();
    if (evt.key == 'Escape') {
      this.close()
    }
  }

  _setEventListeners() {
    // Create an event listener for click on the CLOSE button or pupup half-trasparent background
    this._popupElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('close-button')) {
        this.close();
      }
    })
  }

  open() {
    // adds a new class and an event listener, to listen the ESC button
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscUp);
  }

  close() {
    // removes a new class we added and removes an event listener for the ESC button
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscUp);
  }
}

export default Popup;
