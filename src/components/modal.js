
function openModal (domElement, popupElement, closePopupFunction) {

    domElement.addEventListener('click', function () {
      popupElement.classList.add('popup_is-opened');
    });

  const saveEditProfileButton = popupElement.querySelector('.popup__button');
  
  // if save button exists make popup
  if (saveEditProfileButton) {
      saveEditProfileButton.addEventListener('click', function () {
          closePopupFunction(popupElement);
      });
  }
  
  // slose by pressing ESC then remove the event
  const pressEscKey = function (event) {
    if (event.key === 'Escape') { // check event for key press
      closePopupFunction(popupElement);
    }
    document.removeEventListener('keydown', pressEscKey);
  };
  document.addEventListener('keydown', pressEscKey); //

  // same for overlay click
  const pressOverlayClick = function (event) {
    if (event.target === popupElement) { // check event for click on the target
        closePopupFunction(popupElement);
    }
  };
  popupElement.addEventListener('click', pressOverlayClick);


  const closePopupButton = popupElement.querySelector('.popup__close');
  if (closePopupButton) { // check if  the button is availible 
      closePopupButton.addEventListener('click', function () {
          closePopupFunction(popupElement);
      });
  }
   
  // make sure that popup image has data in it
  if (domElement.classList.contains('card__image')) {
    const imageLink = domElement.src;
    const imageName = domElement.alt;
    const imageElement = popupElement.querySelector('.popup__image');
    const imageCaption = popupElement.querySelector('.popup__caption');
    imageElement.src = imageLink;
    imageCaption.textContent = imageName;
    popupElement.classList.add('popup__image');
  }

  popupElement.classList.add('popup_is-animated');

}

function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
}

export {openModal, closeModal};