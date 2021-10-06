
// Let's find the form in the DOM
let formElement = document.querySelector('.form');

// Let's find the modal in the DOM
let modalElement = document.querySelector('.popup');

// Let's find the edit button in the DOM
let editButton = document.querySelector('.edit-button');

// Let's find the exit button in the DOM
let closeButton = document.querySelector('.close-button');

// Function that open the form
function handleFormOpen() {
  modalElement.classList.add('popup_opened');
}

// Connect the handler to the editButton:
editButton.addEventListener('click', handleFormOpen);

// Function that close the form
function handleFormClose() {
  modalElement.classList.remove('popup_opened');
}

// Connect the handler to the closeButton:
closeButton.addEventListener('click', handleFormClose);

// Next is the form submit handler, though
// it won't submit anywhere just yet
function handleFormSubmit(evt) {
  evt.preventDefault(); // This line stops the browser from submitting the form in the default way.
  // Having done so, we can define our own way of submitting the form.
  // We'll explain it in more detail later.

  // Let's find the form fields in the DOM
  let nameInput = document.querySelector('#name');
  let jobInput = document.querySelector('#aboutMe');


  // Get the values of each field from the corresponding value property
  nameInputValue = nameInput.value;
  jobInputValue = jobInput.value;
  // Select elements where the field values will be entered
  let name = document.querySelector('.profile__name');
  let aboutMe = document.querySelector('.profile__about-me');
  // Insert new values using the textContent property of the querySelector() method
  name.textContent = nameInputValue;
  aboutMe.textContent = jobInputValue;

  // Remove the popup_opened class
  modalElement.classList.remove('popup_opened');
}

// Connect the handler to the form:
// it will watch the submit event
formElement.addEventListener('submit', handleFormSubmit);
