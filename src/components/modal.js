
function openModal (domElement, popupElement, closePopupFunction) {

    domElement.addEventListener('click', function () {

    popupElement.classList.add('popup_is-opened');

  });

  const saveEditProfileButton = popupElement.querySelector('.popup__button');
  if (saveEditProfileButton) {
      saveEditProfileButton.addEventListener('click', function () {
          closePopupFunction(popupElement);
      });
  }
  
  const pressEscKey = function (event) {
    if (event.key === 'Escape') {
      closePopupFunction(popupElement);
    }
    document.removeEventListener('keydown', pressEscKey);
  };
  document.addEventListener('keydown', pressEscKey); //

  const pressOverlayClick = function (event) {
    if (event.target === popupElement) {
        closePopupFunction(popupElement);
    }
    popupElement.removeEventListener('click', pressOverlayClick);
  };

  
  const closePopupButton = popupElement.querySelector('.popup__close');
  if (closePopupButton) {
      closePopupButton.addEventListener('click', function () {
          closePopupFunction(popupElement);
      });
  }
  
  popupElement.addEventListener('click', pressOverlayClick);
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