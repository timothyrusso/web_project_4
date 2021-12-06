class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(`.${popupSelector}`);
  }

  _handleEscUp(evt) {
    // Prevent default and if event was on ESC button -> call "close" method
  }

  _setEventListeners() {
    // Create an event listener for click on the CLOSE button or pupup half-trasparent background
  }

  open() {
    // adds a new class and an event listener, to listen the ESC button
  }

  close() {
    // removes a new class we added and removes an event listener for the ESC button
  }
}

export default Popup;
