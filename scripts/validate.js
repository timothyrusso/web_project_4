const showInputError = (input, formEl, { errorClass, inputErrorClass }) => { // Object destructuring, instead of 'settings'
  const errorSpan = formEl.querySelector('#' + input.id + '-error');
  // Add error message and class
  errorSpan.textContent = input.validationMessage;
  errorSpan.classList.add(inputErrorClass);
  input.classList.add(errorClass); // with the object desctructuring we can put this instead of 'settings.errorClass'
};

const hideInputError = (input, formEl, { errorClass, inputErrorClass }) => { // Object destructuring, instead of 'settings'
  const errorSpan = formEl.querySelector('#' + input.id + '-error');
  // Add error message and class
  errorSpan.textContent = "";
  errorSpan.classList.add(inputErrorClass);
  input.classList.remove(errorClass); // with the object desctructuring we can put this instead of 'settings.errorClass'
};

const checkInputValidity = (formEl, input, settings) => {
  if (input.validity.valid) {  // If the condition is true, hide the error, if it is false, show the error
    hideInputError(input, formEl, settings);
  } else {
    showInputError(input, formEl, settings);
  }
};

const hasValidInput = (inputList) => {
  return inputList.every((input) => input.validity.valid === true);
};

const toggleButton = (inputList, button, settings) => {
  if(hasValidInput(inputList)) {
    // make the button enabled
    button.disabled = true;
  } else {
    // make the button disabled
    button.disabled = false;
    // add the disabled class for the button
    button.classList.add(settings.inactiveButtonClass);
  }
}

const setEventListeners = (formEl, settings) => {
  const submitButton = formEl.querySelector(settings.submitButtonSelector);
  // grab each one of the inputs
  const inputList = [...formEl.querySelectorAll(settings.inputSelector)];
  inputList.forEach((input) => {
    input.addEventListener('input', (evt) => {
      // Check validity of the input
      checkInputValidity(formEl, input, settings);
      // Toggle the button
      toggleButton(inputList, submitButton, settings)
    });
  });
};

const enableValidation = (settings) => {
  const formElements = [...(document.querySelectorAll(settings.formSelector))]; // Grab all the forms. We have to transform the nodelist in array, so we can use the forEach method to selects all the forms. It is the same as Array.from method. We are creating a shallow copy of the nodeList
  formElements.forEach((formEl) => {
    formEl.addEventListener('submit', (evt) => evt.preventDefault());  // Prevent the default behavior of the form when we are submitting something, then we can loop our input elements
    setEventListeners(formEl, settings);

  });
};

// Enabling validation by calling enableValidation()
// pass all the settings on call

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
});
