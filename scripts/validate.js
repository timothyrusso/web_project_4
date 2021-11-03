const showInputError = (input, formEl, { errorClass, inputErrorClass }) => { // Object destructuring, instead of 'settings'
  const errorSpan = formEl.querySelector(`#${input.id}-error`);
  // Add error message and class
  errorSpan.textContent = input.validationMessage;
  errorSpan.classList.add(inputErrorClass);
  input.classList.add(errorClass); // with the object desctructuring we can put this instead of 'settings.errorClass'
};

const hideInputError = (input, formEl, { errorClass, inputErrorClass }) => { // Object destructuring, instead of 'settings'
  const errorSpan = formEl.querySelector(`#${input.id}-error`);
  // Add error message and class
  errorSpan.textContent = "";
  errorSpan.classList.remove(inputErrorClass);
  input.classList.remove(errorClass); // with the object desctructuring we can put this instead of 'settings.errorClass'
};

const checkInputValidity = (formEl, input, settings) => {
  if (input.validity.valid) {  // If the condition is true, hide the error, if it is false, show the error
    hideInputError(input, formEl, settings);
  } else {
    showInputError(input, formEl, settings);
  }
};

const hasValidInput = (inputList) => { //---CHECK THE VALIDITY OF EACH INPUT
  return inputList.every((input) => input.validity.valid === true);
};

const toggleButton = (inputList, submitButton, settings) => {
  if(hasValidInput(inputList)) {
    // make the button enabled
    submitButton.disabled = false;
    // remove the disabled class for the button
    submitButton.classList.remove(settings.inactiveButtonClass);
  } else {
    // make the button disabled
    submitButton.disabled = true;
    // add the disabled class for the button
    submitButton.classList.add(settings.inactiveButtonClass);
  }
}

const setEventListeners = (formEl, settings) => {
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
