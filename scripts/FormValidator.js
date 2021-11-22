class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = formElement;
  }

  _showInputError(input) { // Object destructuring, instead of 'settings'
    const errorSpan = this._form.querySelector(`#${input.id}-error`);
    // Add error message and class
    errorSpan.textContent = input.validationMessage;
    errorSpan.classList.add(this._inputErrorClass);
    input.classList.add(this._errorClass); // with the object desctructuring we can put this instead of 'settings.errorClass'
  };

  _toggleButton() {
    // DA SISTEMARE
  };

  _hasInvalidInput() {

  };

  _checkInputValidity() {

  }

  _setEventListeners() {
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    // grab each one of the inputs
    this._inputList = [...this._form.querySelectorAll(this._inputSelector)];
    // Toggle the button before we start listening to the input even, otherwise the button will be active when we load the page even if the input fields are invalid
    toggleButton(inputList, submitButton, rest);
    inputList.forEach((input) => {
      input.addEventListener('input', (evt) => {
        // Check validity of the input
        checkInputValidity(this.form, input, rest);
        toggleButton(inputList, submitButton, rest);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => evt.preventDefault());  // Prevent the default behavior of the form when we are submitting something, then we can loop our input elements
    setEventListeners(formEl, settings);
  };
}

// const editFormValidator = new FormValidator();
// editFormValidator.enableValidation();

export default FormValidator;
