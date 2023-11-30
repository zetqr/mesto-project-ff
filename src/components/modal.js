function openModal (domElement, popupElement, closePopupFunction) {

    // open image popup on image click
    domElement.addEventListener('click', function () {
      if (domElement.classList.contains('card__image')) {
        const imageLink = domElement.src;
        const imageName = domElement.alt;
        const imageElement = popupElement.querySelector('.popup__image');
        const imageCaption = popupElement.querySelector('.popup__caption');
        imageElement.src = imageLink;
        imageCaption.textContent = imageName;
        popupElement.classList.add('popup__image');
    }

      popupElement.classList.add('popup_is-opened');

      const closePopupButton = popupElement.querySelector('.popup__close');
      if (closePopupButton) {
          closePopupButton.addEventListener('click', function () {
              closePopupFunction(popupElement);
          });
      }

      // Check if .popup__button exists before adding event listener
      const saveEditProfileButton = popupElement.querySelector('.popup__button');
      if (saveEditProfileButton) {
          saveEditProfileButton.addEventListener('click', function () {
              closePopupFunction(popupElement);
          });
      }
      
      // escape closes popup
      const pressEscKey = function (event) {
        if (event.key === 'Escape') {
          closePopupFunction(popupElement);
        }
        document.removeEventListener('keydown', pressEscKey);
      };
      document.addEventListener('keydown', pressEscKey); //

      // overlay click closes popup
      const pressOverlayClick = function (event) {
        if (event.target === popupElement) {
            closePopupFunction(popupElement);
        }
        popupElement.removeEventListener('click', pressOverlayClick);
      };
      popupElement.addEventListener('click', pressOverlayClick);


  });
}

function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
}

export {openModal, closeModal};


//  отсюда экспортируйте функции openModal и closeModal, принимающие 
//в качестве аргумента 
//DOM-элемент модального окна, с которым нужно произвести действие.

/* в файле modal.js описаны функции для работы с модальными окнами: 
функция открытия модального окна, функция закрытия модального окна, 
функция-обработчик события нажатия Esc и функция-обработчик события 
клика по оверлею;*/




/* function popup openner
  1. get dom element
  2. get popup element
  3. on dom element click open popup element
*/