const initialCards = [
  {
    name: "Palouse Falls",
    link: "./images/palouse-falls.png"
  },
  {
    name: "Ghost town of Bodie",
    link: "./images/ghost-town-of-bodie.png"
  },
  {
    name: "Car Forest",
    link: "./images/car-forest.png"
  },
  {
    name: "Byodo-In Temple",
    link: "./images/byodo-in-temple.png"
  },
  {
    name: "Fort Jefferson",
    link: "./images/fort-jefferson.png"
  },
  {
    name: "Garden of the Gods",
    link: "./images/garden-of-the-gods.png"
  }
];


// Let's find the form in the DOM
const formElement = document.querySelector('.popup__form');
// Let's find the modal in the DOM
const modalElement = document.querySelector('.popup');
// Let's find the places list in the DOM
const placesList = document.querySelector('.cards-grid');


// Let's find the edit button in the DOM
let editButton = document.querySelector('.edit-button');
// Let's find the exit button in the DOM
let closeButton = document.querySelector('.close-button');
// Let's find the form fields in the DOM
let nameInput = document.querySelector('#name');
let jobInput = document.querySelector('#aboutMe');


/**********
 * INPUTS *
 **********/

// Select elements where the field values will be entered
let name = document.querySelector('.profile__name');
let aboutMe = document.querySelector('.profile__about-me');


/*************
 * TEMPLATES *
 *************/

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');


/*************
 * FUNCTIONS *
 *************/

// Function that open the form
function handleFormOpen() {
  modalElement.classList.add('popup_opened');
  //Data adding from profile section to inputs
  nameInput.value = name.textContent;
  jobInput.value = aboutMe.textContent;
}
// Function that close the form
function handleFormClose() {
  modalElement.classList.remove('popup_opened');
}
// Next is the form submit handler, though
// it won't submit anywhere just yet
function handleFormSubmit(evt) {
  evt.preventDefault(); // This line stops the browser from submitting the form in the default way.
  // Having done so, we can define our own way of submitting the form.
  // We'll explain it in more detail later.
  // Get the values of each field from the corresponding value property
  nameInputValue = nameInput.value;
  jobInputValue = jobInput.value;
  // Insert new values using the textContent property of the querySelector() method
  name.textContent = nameInputValue;
  aboutMe.textContent = jobInputValue;
  // Remove the popup_opened class
  handleFormClose();
}


function generateCard(card) {
  // Clone template card
  const cardElement = cardTemplate.cloneNode(true);
  // Query title element
  cardElement.querySelector('.card__title').textContent = card.name;
  // Query image link element
  cardElement.querySelector('.card__image').src = card.link;

  return cardElement;
}


function renderCard(card, container) {
  // Append it to the list
  placesList.append(card);
}

/*******************
 * EVENT LISTENERS *
 *******************/

// Connect the handler to the editButton:
editButton.addEventListener('click', handleFormOpen);
// Connect the handler to the closeButton:
closeButton.addEventListener('click', handleFormClose);
// Connect the handler to the form:
// it will watch the submit event
formElement.addEventListener('submit', handleFormSubmit);



initialCards.forEach(function(card) {
  const newCard = generateCard(card);
  renderCard(newCard, placesList);
})
