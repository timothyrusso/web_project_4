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
  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    // Add error message and class
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };

  // Private method to hide an error
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }


  _toggleButton() {
    if (hasValidInput(this._inputList)) {
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

  _hasInvalidInput() {
    return this._inputList.every((input) => input.validity.valid === true);
  };

  _checkInputValidity() {
    if (input.validity.valid) {  // If the condition is true, hide the error, if it is false, show the error
      _hideInputError(input);
    } else {
      _showInputError(input);
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
        _checkInputValidity(this._form, input);
        _toggleButton(this._inputList, this._submitButton);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => evt.preventDefault());  // Prevent the default behavior of the form when we are submitting something, then we can loop our input elements
    this._setEventListeners();  // Implementation of the listener
  };
}

export default FormValidator;
