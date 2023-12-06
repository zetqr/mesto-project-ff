import { openModal, closeModal } from './modal.js';
import { initialCards } from './cardsData.js';
import { openPopupTypeImage } from './index.js';

/** creates card and handles like button and makes sure image popus up on click
 * function to open image popup and path the image data to dom element.
 * @constructor
 * @param {array} card - array of image and links.
 * @param {function} deleteHandler - delete card function.
 * @param {function} likeCardHandler - like card function.
 * @param {function} onOpenImagePopup - image popup function that activates at event.
 */
function createCard(card, deleteHandler, likeCardHandler, onOpenImagePopup) {

    // variable declarations
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitleElement = cardElement.querySelector('.card__title');
    const cardImageElement = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    
    cardTitleElement.textContent = card.name;
    cardImageElement.src = card.link;
    cardImageElement.alt = card.name;

    // event listeners
    deleteButton.addEventListener('click', function () {
      deleteHandler(cardElement);
    });

    likeButton.addEventListener('click', function () {
      likeCardHandler(likeButton);
    });

    cardImageElement.addEventListener('click', function () {
      onOpenImagePopup(card.link, card.name);
    });


    return cardElement;
};

/** remove card function
 * @constructor
 * @param elem - dom element to remove
 */
function deleteCard(elem) {
    elem.remove();
}

/** like card function
 * @constructor
 * @param elem - dom element to add css class to
 */
function likeCard(elem) {
    elem.classList.toggle('card__like-button_is-active');
}

export {createCard, deleteCard, likeCard};
