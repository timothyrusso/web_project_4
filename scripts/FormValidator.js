class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = formElement;
  }

  // Private method to show an error
  _showInputError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    // Add error message and class
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._inputErrorClass);
  };

  // Private method to hide an error
  _hideInputError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._inputErrorClass);
  }


  _toggleButton() {
    if (this._hasValidInput()) {
      // make the button enabled
      this._submitButton.disabled = false;
      // remove the disabled class for the button
      this._submitButton.classList.remove(this._inactiveButtonClass);
    } else {
      // make the button disabled
      this._submitButton.disabled = true;
      // add the disabled class for the button
      this._submitButton.classList.add(this._inactiveButtonClass);
    }
  };

  _hasValidInput() {
    return this._inputList.every((input) => input.validity.valid === true);
  };

  _checkInputValidity(input) {
    if (input.validity.valid) {  // If the condition is true, hide the error, if it is false, show the error
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }
  }

  _setEventListeners() {
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    // grab each one of the inputs
    this._inputList = [...this._form.querySelectorAll(this._inputSelector)];
    // Toggle the button before we start listening to the input even, otherwise the button will be active when we load the page even if the input fields are invalid
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        // Check validity of the input
        this._checkInputValidity(input);
        this._toggleButton();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => evt.preventDefault());  // Prevent the default behavior of the form when we are submitting something, then we can loop our input elements
    this._setEventListeners();  // Implementation of the listener
  };
}

export default FormValidator;
