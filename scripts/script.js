import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { openModalWindow, closeModalWindow } from "./utils.js";


/************
 * ELEMENTS *
 ************/

const editModalWindow = document.querySelector('.popup_type_edit'); // Let's find the edit modal in the DOM
const addModalWindow = document.querySelector('.popup_type_add'); // Let's find the add modal in the DOM
const previewImageModalWindow = document.querySelector('.popup_type_preview'); // Let's find the preview modal in the DOM
const placesList = document.querySelector('.cards-grid'); // Let's find the places list in the DOM
const addCardName = addModalWindow.querySelector('.popup__input_field_title');
const addCardLink = addModalWindow.querySelector('.popup__input_field_link');
const cardSelector = '#card-template';


/***********
 * BUTTONS *
 ***********/

const editButton = document.querySelector('.edit-button'); // Let's find the edit button in the DOM
const editModalCloseBtn = editModalWindow.querySelector('.close-button'); // Let's find the exit button in the DOM
const nameInput = document.querySelector('.popup__input_field_name'); // Let's find the form fields in the DOM
const jobInput = document.querySelector('.popup__input_field_about-me');
const addModalBtn = document.querySelector('.add-button'); // Let's find the add button in the DOM
const addModalCloseBtn = addModalWindow.querySelector('.close-button');
const imageModalCloseBtn = previewImageModalWindow.querySelector('.close-button');


/**********
 * INPUTS *
 **********/

const name = document.querySelector('.profile__name'); // Select elements where the field values will be entered in the edit form
const aboutMe = document.querySelector('.profile__about-me');


/**************
 * VALIDATION *
 **************/

const validationSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
}

const editFormElement = editModalWindow.querySelector('.popup__form');
const addFormElement = addModalWindow.querySelector('.popup__form');

// Creation of two instances of FormValidator
const editFormValidator = new FormValidator(validationSettings, editFormElement);
const addFormValidator = new FormValidator(validationSettings, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();


/*****************
 * CARD CREATION *
 *****************/

function cardFormSubmitHandler(evt) { //---ADD NEW CARD
  evt.preventDefault(); // This line stops the browser from submitting the form in the default way. Having done so, we can define our own way of submitting the form.
  createCard({
    name: addCardName.value,
    link: addCardLink.value
  }, placesList);

  closeModalWindow(addModalWindow); // Toggle the popup
}

const createCard = (data, placesList) => {
  const card = new Card(data, cardSelector);
  placesList.prepend(card.generateCard()); // Create the card with the new values || WHEN WE WILL USE CARD CLASS WE HAVE TU PUT card.generateCard()
  document.forms.myFormAdd.reset();
}

initialCards.forEach((data) => {
  createCard(data, placesList);
})


/************************
 * FORM SUBMIT HANDLERS *
 ************************/

function handleEditFormOpen(editModalWindow) { //---OPEN THE EDIT FORM
  nameInput.value = name.textContent; // Data adding from profile section to inputs
  jobInput.value = aboutMe.textContent;
  openModalWindow(editModalWindow); // Open the form
}

function handleEditFormSubmit(evt) { //---EDIT FORM SUBMIT HANDLER
  evt.preventDefault(); // This line stops the browser from submitting the form in the default way. Having done so, we can define our own way of submitting the form.
  const nameInputValue = nameInput.value; // Get the values of each field from the corresponding value property
  const jobInputValue = jobInput.value;
  name.textContent = nameInputValue; // Insert new values using the textContent property of the querySelector() method
  aboutMe.textContent = jobInputValue;
  closeModalWindow(editModalWindow); // Close the popup_opened class
}


/*******************
 * EVENT LISTENERS *
 *******************/

editButton.addEventListener('click', () => handleEditFormOpen(editModalWindow)); // Connect the handler to the editButton:
editModalCloseBtn.addEventListener('click', () => closeModalWindow(editModalWindow)); // Connect the handler to the closeButton:
editModalWindow.addEventListener('submit', handleEditFormSubmit); // Connect the handler to the form: it will watch the submit event
addModalBtn.addEventListener('click', () => {
  openModalWindow(addModalWindow);
  // const submitButton = addModalWindow.querySelector('.submit-button');
  // submitButton.disabled = true;
  // submitButton.classList.add('submit-button_disabled');
  addFormValidator.toggleButton();
}
);
addModalCloseBtn.addEventListener('click', () => closeModalWindow(addModalWindow));
imageModalCloseBtn.addEventListener('click', () => closeModalWindow(previewImageModalWindow));
addModalWindow.addEventListener('submit', cardFormSubmitHandler);
