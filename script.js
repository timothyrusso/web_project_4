/************
 * ELEMENTS *
 ************/

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

const formElement = document.querySelector('.popup__form'); // Let's find the form in the DOM
const editModalWindow = document.querySelector('.js-edit-popup'); // Let's find the edit modal in the DOM
const addModalWindow = document.querySelector('.js-add-popup'); // Let's find the add modal in the DOM
const previewImageModalWindow = document.querySelector('.js-preview-popup');
const placesList = document.querySelector('.cards-grid'); // Let's find the places list in the DOM
const previewImageElement = document.querySelector('.popup__preview-image');
const captionImageElement = document.querySelector('.popup__caption');


/***********
 * BUTTONS *
 ***********/

const editButton = document.querySelector('.edit-button'); // Let's find the edit button in the DOM
const editModalCloseBtn = editModalWindow.querySelector('.close-button'); // Let's find the exit button in the DOM
const nameInput = document.querySelector('#name'); // Let's find the form fields in the DOM
const jobInput = document.querySelector('#aboutMe');
const addModalBtn = document.querySelector('.add-button'); // Let's find the add button in the DOM
const addModalCloseBtn = addModalWindow.querySelector('.close-button');
const imageModalCloseBtn = previewImageModalWindow.querySelector('.close-button');
const submitNewCard = addModalWindow.querySelector('.submit-button');


/**********
 * INPUTS *
 **********/

const name = document.querySelector('.profile__name'); // Select elements where the field values will be entered
const aboutMe = document.querySelector('.profile__about-me');


/*************
 * TEMPLATES *
 *************/

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card'); // Select the card template


/*************
 * FUNCTIONS *
 *************/

function handleFormOpen(editModalWindow) { // Function that open the edit form
  nameInput.value = name.textContent; //Data adding from profile section to inputs
  jobInput.value = aboutMe.textContent;
  toggleModalWindow(editModalWindow);
}

function toggleModalWindow(modal) { // Function that toggle the form
  modal.classList.toggle('popup_opened');
}


function handleFormSubmit(evt) { // Next is the form submit handler, though it won't submit anywhere just yet
  evt.preventDefault(); // This line stops the browser from submitting the form in the default way. Having done so, we can define our own way of submitting the form.
  nameInputValue = nameInput.value; // Get the values of each field from the corresponding value property
  jobInputValue = jobInput.value;
  name.textContent = nameInputValue; // Insert new values using the textContent property of the querySelector() method
  aboutMe.textContent = jobInputValue;
  toggleModalWindow(editModalWindow); // Remove the popup_opened class
}

function generateCard(card) {
  const cardElement = cardTemplate.cloneNode(true); // Clone template card
  const cardDeleteButton = cardElement.querySelector('.card__delete'); // Query delete button
  cardDeleteButton.addEventListener('click', () => onDeleteClick(cardElement));
  cardElement.querySelector('.card__title').textContent = card.name; // Query title element
  const captionEl = cardElement.querySelector('.card__title');
  captionEl.textContent = card.name;
  const imageEl = cardElement.querySelector('.card__image'); // Query image link element
  imageEl.src = card.link;
  imageEl.addEventListener('click', function () { //Add event listeners
    captionImageElement.textContent = card.name;
    previewImageElement.src = card.link;
    toggleModalWindow(previewImageModalWindow);
  })
  const likeButton = cardElement.querySelector('.card__like');
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  });
  return cardElement;
}
function renderCard(card, container) {
  placesList.append(card); // Append it to the list
}

const onDeleteClick = card => {
  placesList.removeChild(card); // Remove cards element function
}

function addNewCard(title, link) {
  initialCards.push({
    name: 'ciao',
    link: './images/garden-of-the-gods.png'
  });
  placesList.append(cardElement);
}


/*******************
 * EVENT LISTENERS *
 *******************/

editButton.addEventListener('click', () => handleFormOpen(editModalWindow)); // Connect the handler to the editButton:
editModalCloseBtn.addEventListener('click', () => toggleModalWindow(editModalWindow)); // Connect the handler to the closeButton:
formElement.addEventListener('submit', handleFormSubmit); // Connect the handler to the form: it will watch the submit event
addModalBtn.addEventListener('click', () => toggleModalWindow(addModalWindow));
addModalCloseBtn.addEventListener('click', () => toggleModalWindow(addModalWindow));
imageModalCloseBtn.addEventListener('click', () => toggleModalWindow(previewImageModalWindow));
submitNewCard.addEventListener('submit', function () {
  const title = addModalWindow.querySelector('.popup__input_field_title');
  const link = addModalWindow.querySelector('.popup__input_field_link');
  addNewCard(title.value, link.value);
})


/*****************
 * CARDS CREATION *
 *****************/

initialCards.forEach(function (card) {
  const newCard = generateCard(card);
  renderCard(newCard, placesList);
})
