/** open popup  function
 * @param popupElement - dom element to open as a popup
 */
function openModal(popupElement) {
  setTimeout(() => popupElement.classList.add('popup_is-opened'), 0);
  popupElement.classList.add('popup_is-animated');

  document.addEventListener('keydown', closeModalByEsc);
}

/** close popup function
 * @param popupElement - dom element to open as a popup
 */
function closeModal(popupElement) {
  document.removeEventListener('keydown', closeModalByEsc);
  popupElement.classList.remove('popup_is-opened');
}

/** close function by pressing ESC key*/
const closeModalByEsc = (event) => {
  if (event.key === "Escape") {
    const openedModal = document.querySelector('.popup_is-opened');
    closeModal(openedModal);
  }
};

/** close function by pressing on overlay*/
const pressOverlayClick = (event) => {
  const openedModal = document.querySelector('.popup_is-opened');
  if (event.target === openedModal) {
    closeModal(openedModal);
  }
};

/** event listeners function to catch click on overlay and click on close popup button
 * @param popupElement - dom element to activate an event on click
 */
function setCloseModalWindowEventListeners(popupElement) {
  const closeButton = popupElement.querySelector('.popup__close');
  
  closeButton.addEventListener('click', () => closeModal(popupElement));
  popupElement.addEventListener('click', pressOverlayClick);
  
}

export {openModal, closeModal, setCloseModalWindowEventListeners};