/****************************
 * OPEN-CLOSE MODAL WINDOWS *
 ****************************/

const closeEscButton = (evt) => { //---CLOSE THE POPUP WITH THE ESCAPE
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key == 'Escape' && openedPopup) {
    closeModalWindow(openedPopup);
  }
}

const openModalWindow = (modal) => { //---OPEN THE FORMS
  modal.classList.add('popup_opened');
  addEscapeListener();
}

const closeModalWindow = (modal) => { //---CLOSE THE FORMS
  modal.classList.remove('popup_opened');
  removeEscapeListener();
}

const addEscapeListener = () => { //---ADD THE LISTENER FOR THE CLOSEESCBUTTON
  document.addEventListener('keydown', closeEscButton);
}

const removeEscapeListener = () => { //REMOVE THE LISTENER FOR THE CLOSEESCBUTTON
  document.removeEventListener('keydown', closeEscButton);
}

const closePopupOverlay = (evt) => { //---CLOSE THE POPUP CLICKING ON THE OVERLAY
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
