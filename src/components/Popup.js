/**
 * Class for the popup creation
 * @param {String} popupSelector - Class selector for the popup
 */
class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(`.${popupSelector}`);
    this._handleEscUp = this._handleEscUp.bind(this);
  }

  /**
   * Private method that handle the closure of the popup with the escape button
   * @param {Event} evt - Event which takes place in the DOM
   */
  _handleEscUp(evt) {
    if (evt.key == 'Escape') {
      this.close()
    }
  }

  /**
   * Public method that handle event listeners for the popup. Create an event listener for click on the CLOSE button or pupup half-trasparent background
   */
  setEventListeners() {
    this._popupElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('close-button')) {
        this.close();
      }
    })
  }

  /**
   * Public method that handle the opening of the popup, adds a new class and an event listener, to listen the ESC button
   */
  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscUp);
  }

  /**
   * Public method that handle the closure of the popup, removes the class which manages the opening of the popup and removes an event listener for the ESC button
   */
  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscUp);
  }
}

export default Popup;
