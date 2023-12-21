
import { likeCardApi } from './api';

const cardTemplate = document.querySelector('#card-template').content;
const cardToDelete = {}


function createCard(cardData, deleteHandler, likeCardHandler, onOpenImagePopup, userId) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const card = cardElement.querySelector('.card');
  const likeCardButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__like-counter').textContent = cardData.likes.length;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  if (cardData.likes.some(card => card._id === userId)) {
    card.querySelector('.card__like-button').classList.add('card__like-button_is-active');
  }

  if (cardData.owner._id === userId) {
    cardDeleteButton.addEventListener('click', (evt) => {
      cardToDelete.id = cardData._id;
      cardToDelete.nodeDeleteBtn = cardDeleteButton;
      deleteHandler(evt)});
  } else {
    cardDeleteButton.classList.add('card__delete-button_inactive');
  }

  likeCardButton.addEventListener('click', () => likeCardHandler(cardData._id, likeCardButton));
  cardElement.querySelector('.card__image').addEventListener('click', () => onOpenImagePopup(cardData));

  return cardElement;
}


function likeCard(cardDataId, likeCardButton) {
  const card = likeCardButton.closest('.card');

  if (!likeCardButton.classList.contains('card__like-button_is-active')) {
    likeCardApi(cardDataId, true)
      .then(res => {
        card.querySelector('.card__like-counter')
            .textContent = res.likes.length;
        likeCardButton.classList.add('card__like-button_is-active');
      }).catch(err => {
        console.log(`Ошибка в добавлении лайка карточке: ${err}`);
      });
  } else {
    likeCardApi(cardDataId, false)
      .then(res => {
        card.querySelector('.card__like-counter')
            .textContent = res.likes.length;
        likeCardButton.classList.remove('card__like-button_is-active');
      }).catch(err => {
        console.log(`Ошибка в удалении лайка карточки: ${err}`);
      });
  }
}

export {createCard, likeCard, cardToDelete}