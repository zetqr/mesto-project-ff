import { openModal, closeModal } from './modal.js';
import { initialCards } from './cardsData.js';

// выбрать темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
function createCard(card, deleteCardFunction, likeCardFunction, imagePopupFunction, popupTypeImage) {

    // DOM узлы
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');

    deleteButton.addEventListener('click', function () {
        deleteCardFunction(cardElement);
    });

    likeButton.addEventListener('click', function () {
      likeCardFunction(likeButton);
    });

    
    cardImage.addEventListener('click', function () {
      imagePopupFunction(cardImage, popupTypeImage);
    });
    

    return cardElement;
};

// Функция удаления карточки
function deleteCard(elem) {
    elem.remove();
}

function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

function imagePopup(cardImage, popupTypeImage) {
  openModal(cardImage, popupTypeImage, closeModal);
}

// MAKE AN EXPORT OF CARDS
export {createCard, deleteCard, initialCards, likeCard, imagePopup};
// also create like and delete functions in here and export them


// в файле card.js описаны функции для работы с карточками: 
//функция создания карточки, 
//функции-обработчики событий удаления и лайка карточки;
//описан массив карточек, отображаемых на странице;
