class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = formElement;
  }

  _setEventListeners() {
    const submitButton = formEl.querySelector(settings.submitButtonSelector);
    // grab each one of the inputs
    const inputList = [...formEl.querySelectorAll(settings.inputSelector)];
    // Toggle the button before we start listening to the input even, otherwise the button will be active when we load the page even if the input fields are invalid
    toggleButton(inputList, submitButton, settings);
    inputList.forEach((input) => {
      input.addEventListener('input', (evt) => {
        // Check validity of the input
        checkInputValidity(formEl, input, settings);
        toggleButton(inputList, submitButton, settings);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => evt.preventDefault());  // Prevent the default behavior of the form when we are submitting something, then we can loop our input elements
    setEventListeners(formEl, settings);
    };
}

const editFormValidator = new FormValidator();
editFormValidator.enableValidation();
