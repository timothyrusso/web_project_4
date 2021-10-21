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
const editModalWindow = document.querySelector('.popup_type_edit'); // Let's find the edit modal in the DOM
const addModalWindow = document.querySelector('.popup_type_add'); // Let's find the add modal in the DOM
const previewImageModalWindow = document.querySelector('.popup_type_preview'); // Let's find the preview modal in the DOM
const placesList = document.querySelector('.cards-grid'); // Let's find the places list in the DOM
const previewImageElement = document.querySelector('.popup__preview-image');
const captionImageElement = document.querySelector('.popup__caption');
const addCardName = addModalWindow.querySelector('.popup__input_field_title');
const addCardLink = addModalWindow.querySelector('.popup__input_field_link');


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


/**********
 * INPUTS *
 **********/

const name = document.querySelector('.profile__name'); // Select elements where the field values will be entered in the edit form
const aboutMe = document.querySelector('.profile__about-me');


/*************
 * TEMPLATES *
 *************/

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card'); // Select the card template with his content


/*************
 * FUNCTIONS *
 *************/

function handleFormOpen(editModalWindow) { //---OPEN THE EDIT FORM
  nameInput.value = name.textContent; // Data adding from profile section to inputs
  jobInput.value = aboutMe.textContent;
  toggleModalWindow(editModalWindow); // Toggle the form
}

function toggleModalWindow(modal) { //---TOGGLE THE FORMS
  modal.classList.toggle('popup_opened');
}

function handleFormSubmit(evt) { //---EDIT FORM SUBMIT HANDLER
  evt.preventDefault(); // This line stops the browser from submitting the form in the default way. Having done so, we can define our own way of submitting the form.
  nameInputValue = nameInput.value; // Get the values of each field from the corresponding value property
  jobInputValue = jobInput.value;
  name.textContent = nameInputValue; // Insert new values using the textContent property of the querySelector() method
  aboutMe.textContent = jobInputValue;
  toggleModalWindow(editModalWindow); // Toggle the popup_opened class
}

function generateCard(card) { //---GENERATE CARDS
  const cardElement = cardTemplate.cloneNode(true); // Clone template card
  const cardDeleteButton = cardElement.querySelector('.card__delete'); // Query delete button
  const captionEl = cardElement.querySelector('.card__title'); // Query image caption element
  const imageEl = cardElement.querySelector('.card__image'); // Query image link element
  const likeButton = cardElement.querySelector('.card__like'); // Query the like button
  cardElement.querySelector('.card__title').textContent = card.name; // Query title element
  captionEl.textContent = card.name;
  imageEl.title = `Beautiful picture of ${card.name}`; // Add the title attribute to the images
  imageEl.style.backgroundImage = `url('${card.link}')`;
  imageEl.addEventListener('click', function () { // Add event listeners
    captionImageElement.textContent = card.name;
    previewImageElement.src = card.link;
    previewImageElement.alt = `Preview of ${card.name}`; // Add the alt attribute to the images
    toggleModalWindow(previewImageModalWindow);
  })
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  });
  cardDeleteButton.addEventListener('click', () => onDeleteClick(cardElement));
  return cardElement;
}

function renderCard(card, container) { //---APPEND THE CARD TO THE DOM
  placesList.append(card);
}

const onDeleteClick = card => { //---REMOVE CARD ELEMENTS
  placesList.removeChild(card);
}

function addNewCard(evt) { //---ADD NEW CARD
  evt.preventDefault(); // This line stops the browser from submitting the form in the default way. Having done so, we can define our own way of submitting the form.
  const newCard = {
      name: addCardName.value,
      link: addCardLink.value
  };
  placesList.prepend(generateCard(newCard)); // Create the card with the new values
  addCardName.value = "";
  addCardLink.value = "";
  toggleModalWindow(addModalWindow); // Toggle the popup
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
addModalWindow.addEventListener('submit', addNewCard);


/*****************
 * CARDS CREATION *
 *****************/

initialCards.forEach(function (card) {
  const newCard = generateCard(card);
  renderCard(newCard, placesList);
})
