/************
 * ELEMENTS *
 ************/

const editModalWindow = document.querySelector('.popup_type_edit'); // Let's find the edit modal in the DOM
const addModalWindow = document.querySelector('.popup_type_add'); // Let's find the add modal in the DOM
const previewImageModalWindow = document.querySelector('.popup_type_preview'); // Let's find the preview modal in the DOM
const placesList = document.querySelector('.cards-grid'); // Let's find the places list in the DOM
const previewImageElement = document.querySelector('.popup__preview-image');
const captionImageElement = document.querySelector('.popup__caption');
const addCardName = addModalWindow.querySelector('.popup__input_field_title');
const addCardLink = addModalWindow.querySelector('.popup__input_field_link');
const popupElement = document.querySelectorAll('.popup');


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


/*************
 * TEMPLATES *
 *************/

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card'); // Select the card template with his content


/*************
 * FUNCTIONS *
 *************/

function handleEditFormOpen(editModalWindow) { //---OPEN THE EDIT FORM
  nameInput.value = name.textContent; // Data adding from profile section to inputs
  jobInput.value = aboutMe.textContent;
  openModalWindow(editModalWindow); // Open the form
}

function disableModalButton(modal) { //---TOGGLE THE DISABLED BUTTON
  if (modal.classList.contains('popup_type_add')) {
    const submitButton = modal.querySelector('.submit-button')
    submitButton.disabled = true;
    submitButton.classList.add('submit-button_disabled')
  }
}

function openModalWindow(modal) { //---OPEN THE FORMS
  disableModalButton(modal);
  modal.classList.add('popup_opened');
  addEscapeListener();
}

function closeModalWindow(modal) { //---CLOSE THE FORMS
  modal.classList.remove('popup_opened');
  removeEscapeListener();
}

function handleEditFormSubmit(evt) { //---EDIT FORM SUBMIT HANDLER
  evt.preventDefault(); // This line stops the browser from submitting the form in the default way. Having done so, we can define our own way of submitting the form.
  const nameInputValue = nameInput.value; // Get the values of each field from the corresponding value property
  const jobInputValue = jobInput.value;
  name.textContent = nameInputValue; // Insert new values using the textContent property of the querySelector() method
  aboutMe.textContent = jobInputValue;
  closeModalWindow(editModalWindow); // Close the popup_opened class
}

function generateCard(card) { //---GENERATE CARDS
  const cardElement = cardTemplate.cloneNode(true); // Clone template card
  const cardDeleteButton = cardElement.querySelector('.card__delete'); // Query delete button
  const captionEl = cardElement.querySelector('.card__title'); // Query image caption element
  const imageEl = cardElement.querySelector('.card__image'); // Query image link element
  const likeButton = cardElement.querySelector('.card__like'); // Query the like button
  cardElement.querySelector('.card__title').textContent = card.name; // Query title element
  captionEl.textContent = card.name;
  imageEl.alt = `Beautiful picture of ${card.name}`; // Add the alt attribute to the images
  imageEl.style.backgroundImage = `url('${card.link}')`;
  imageEl.addEventListener('click', function () { // Add event listeners
    captionImageElement.textContent = card.name;
    previewImageElement.src = card.link;
    previewImageElement.alt = `Preview of ${card.name}`; // Add the alt attribute to the images
    openModalWindow(previewImageModalWindow);
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
  document.forms.myFormAdd.reset();
  closeModalWindow(addModalWindow); // Toggle the popup
}

function addEscapeListener() { //---ADD THE LISTENER FOR THE CLOSEESCBUTTON
  document.addEventListener('keydown', closeEscButton);
}

function removeEscapeListener() { //REMOVE THE LISTENER FOR THE CLOSEESCBUTTON
  document.removeEventListener('keydown', closeEscButton);
}

function closeEscButton(evt) { //---CLOSE THE POPUP WITH THE ESCAPE
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key == 'Escape' && openedPopup) {
    closeModalWindow(openedPopup);
  }
}

function closePopupOverlay(evt) { //---CLOSE THE POPUP CLICKING ON THE OVERLAY
  const openedPopup = document.querySelector('.popup_opened');
  if (openedPopup) {
    const popupContainer = openedPopup.querySelector('.popup__container');
    const isClickInside = popupContainer.contains(evt.target);
    if (!isClickInside) {
      closeModalWindow(openedPopup);
    }
  }
}

popupElement.forEach(popup => { // Listener for the close popup overlay event
    popup.addEventListener('click', closePopupOverlay);
});


/*******************
 * EVENT LISTENERS *
 *******************/

editButton.addEventListener('click', () => handleEditFormOpen(editModalWindow)); // Connect the handler to the editButton:
editModalCloseBtn.addEventListener('click', () => closeModalWindow(editModalWindow)); // Connect the handler to the closeButton:
editModalWindow.addEventListener('submit', handleEditFormSubmit); // Connect the handler to the form: it will watch the submit event
addModalBtn.addEventListener('click', () => openModalWindow(addModalWindow));
addModalCloseBtn.addEventListener('click', () => closeModalWindow(addModalWindow));
imageModalCloseBtn.addEventListener('click', () => closeModalWindow(previewImageModalWindow));
addModalWindow.addEventListener('submit', addNewCard);


/*****************
 * CARDS CREATION *
 *****************/

initialCards.forEach(function (card) {
  const newCard = generateCard(card);
  renderCard(newCard, placesList);
})
