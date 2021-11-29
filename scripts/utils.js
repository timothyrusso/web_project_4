/****************************
 * OPEN-CLOSE MODAL WINDOWS *
 ****************************/

/**
 * Close the popup with the escape button event.
 * @constructor
 * @param  {} evt
 */
const closeEscButton = (evt) => {
  const openedPopup = document.querySelector('.popup_opened')
  if (evt.key == 'Escape' && openedPopup) {
    closeModalWindow(openedPopup)
  }
}

/**
 * Open the forms.
 * @constructor
 * @param  {} modal - The modal DOM object.
 */
const openModalWindow = (modal) => {
  modal.classList.add('popup_opened')
  addEscapeListener()
}

/**
 * Close the forms.
 * @constructor
 * @param  {} modal - The modal DOM object.
 */
const closeModalWindow = (modal) => {
  modal.classList.remove('popup_opened')
  removeEscapeListener()
}

/**
 * Add the listener for the close esc button to the document object.
 */
const addEscapeListener = () => {
  document.addEventListener('keydown', closeEscButton)
}

/**
 * Remove the listener for the close esc button to the document object.
 */
const removeEscapeListener = () => {
  document.removeEventListener('keydown', closeEscButton)
}

/**
 * Close the popup clicking on the external overlay.
 * @constructor
 * @param  {} evt
 */
const closePopupOverlay = (evt) => {
  const openedPopup = document.querySelector('.popup_opened')
  if (openedPopup) {
    const popupContainer = openedPopup.querySelector('.popup__container')
    const isClickInside = popupContainer.contains(evt.target)
    if (!isClickInside) {
      closeModalWindow(openedPopup)
    }
  }
}

/**
 * Listener for the close popup overlay event.
 */
document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('click', closePopupOverlay)
})

export { openModalWindow, closeModalWindow };
