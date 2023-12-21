import '../pages/index.css';
import {createCard, likeCard, cardToDelete} from './card.js';
import {openModal, closeModal} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {
    getCardsDefault,
    getUserInfo,
    setUserInfo,
    setCard,
    setAvatar,
    removeCardApi } from './api';

let userId;

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const placesContainer = document.querySelector('.places__list');
const avatar = document.querySelector('.profile__image');
const changeAvatar = document.querySelector('.popup_type_avatar');
const profileForm = changeAvatar.querySelector('form');
const profileLink = profileForm.querySelector('.popup__input_type_url');
const profilePopupButton = profileForm.querySelector('.popup__button');
const editProfileButton = document.querySelector('.profile__edit-button');
const profileFormElement = document.querySelector('.popup.popup_type_edit');
const formElement = profileFormElement .querySelector('form');
const profileNameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const popupProfileButton = formElement.querySelector('.popup__button');
const addCardButton = document.querySelector('.profile__add-button');

const cardFormElement = document.querySelector('.popup.popup_type_new-card');
const newCardElement = cardFormElement.querySelector('form');
const cardNameInput = newCardElement.querySelector('.popup__input_type_card-name');
const cardLinkInput = newCardElement.querySelector('.popup__input_type_url');
const formCardButton = newCardElement.querySelector('.popup__button');
const popupTypeImage = document.querySelector('.popup.popup_type_image');
const image = popupTypeImage.querySelector('.popup__image');
const imageDescription = popupTypeImage.querySelector('.popup__caption');
const deleteCardElement = document.querySelector('.popup.popup_type_delete-card');

function renderCards(userId, initialCards) {
  initialCards.forEach(card => {
    placesContainer.append(createCard(card, deleteHandler, likeCard, onOpenImagePopup, userId));
  });
}

function submitChangeAvatarForm(evt) {
  evt.preventDefault();

  profilePopupButton.textContent = 'Сохранение...';

  setAvatar(profileLink.value)
    .then(avatarUploaded => {
      closeModal(changeAvatar);

      avatar.style.backgroundImage = `url(${avatarUploaded.avatar})`;

      profileForm.reset();
    })
    .catch(() => {
      profilePopupButton.textContent = 'Сохранить';
    });
}

function submitEditProfileForm(evt) {
  evt.preventDefault();
  popupProfileButton.textContent = 'Сохранение...';

  setUserInfo(profileNameInput.value, jobInput.value)
    .then(() => {

      profileTitle.textContent = profileNameInput.value;
      profileDescription.textContent = jobInput.value;

      closeModal(profileFormElement );
    })
    .catch((err) => console.log(`Ошибка сохранения данных профиля ${err}`))
    .finally(() => {
      popupProfileButton.textContent = 'Сохранить';
    });

}

function submitAddCardForm(evt) {
  evt.preventDefault();

  formCardButton.textContent = 'Сохранение...';

  const card = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  }

  setCard(card)
    .then(cardUploaded => {
      closeModal(cardFormElement);

      placesContainer.prepend(
        createCard(
          cardUploaded,
          deleteHandler,
          likeCard,
          onOpenImagePopup,
          userId
        )
      );

      newCardElement.reset();
    })
    .catch((err) => console.log(`Ошибка сохранения карточки${err}`))
    .finally(() => {
      formCardButton.textContent = 'Сохранить';
    })
}

function deleteHandler(evt) {
  evt.preventDefault();

  openModal(deleteCardElement);
}

function submitDeleteCard(evt) {
  evt.preventDefault();

  removeCardApi(cardToDelete.id)
  .then(() => {
      cardToDelete.nodeDeleteBtn.closest('.card').remove();
      closeModal(deleteCardElement);
    })
    .catch(err => {
      console.log(`Ошибка удаления карточки: ${err}`);
    })
}


function handleCloseModalByCross(modalWindow) {
  const popupCloseButton = modalWindow.querySelector('.popup__close');

  popupCloseButton.addEventListener('click', function() {
    closeModal(modalWindow);
  })
}

addCardButton.addEventListener('click', function () {
  cardNameInput.value = '';
  cardLinkInput.value = '';

  openModal(cardFormElement);

  clearValidation(cardFormElement, validationConfig);
});

deleteCardElement.addEventListener('submit', submitDeleteCard);

function onOpenImagePopup(cardData) {

  image.src = cardData.link;
  image.alt = cardData.name;

  imageDescription.textContent = cardData.name;

  openModal(popupTypeImage);
}

avatar.addEventListener('click', function () {
  openModal(changeAvatar);

  clearValidation(changeAvatar, validationConfig);
});

editProfileButton.addEventListener('click', function () {
  openModal(profileFormElement );

  profileNameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  clearValidation(profileFormElement ,validationConfig);
});

formElement.addEventListener('submit', submitEditProfileForm);
newCardElement.addEventListener('submit', submitAddCardForm);
profileForm.addEventListener('submit', submitChangeAvatarForm);


Promise.all([getUserInfo(), getCardsDefault()])
.then(res => {
  profileImage.style.backgroundImage = `url(${res[0].avatar})`;

  profileTitle.textContent = res[0].name;
  profileDescription.textContent = res[0].about;

  userId = res[0]._id;

  renderCards(userId, res[1]);
})
.catch(err => console.log(`Ошибка загрузки данных ${err}`)

);


handleCloseModalByCross(profileFormElement );
handleCloseModalByCross(changeAvatar);
handleCloseModalByCross(cardFormElement);
handleCloseModalByCross(popupTypeImage);
handleCloseModalByCross(deleteCardElement);

enableValidation(validationConfig);
