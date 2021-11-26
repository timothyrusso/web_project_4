/****************************
 * OPEN-CLOSE MODAL WINDOWS *
 ****************************/

function closeEscButton(evt) { //---CLOSE THE POPUP WITH THE ESCAPE
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key == 'Escape' && openedPopup) {
    closeModalWindow(openedPopup);
  }
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

function addEscapeListener() { //---ADD THE LISTENER FOR THE CLOSEESCBUTTON
  document.addEventListener('keydown', closeEscButton);
}

function removeEscapeListener() { //REMOVE THE LISTENER FOR THE CLOSEESCBUTTON
  document.removeEventListener('keydown', closeEscButton);
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

document.querySelectorAll('.popup').forEach(popup => { // Listener for the close popup overlay event
  popup.addEventListener('click', closePopupOverlay);
});

export { openModalWindow, closeModalWindow };
