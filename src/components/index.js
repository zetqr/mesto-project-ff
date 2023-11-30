import '../pages/index.css';
import {createCard, deleteCard, initialCards, likeCard, imagePopup} from '../components/cards.js';
import {openModal, closeModal} from './modal.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const places = document.querySelector('.places__list');



initialCards.forEach((cardElement) => {
    const card = createCard(cardElement, deleteCard, likeCard, imagePopup, popupTypeImage);
    places.append(card);
});

const cardImage = document.querySelectorAll('.card__image');
cardImage.forEach((image) => {
    openModal(image, popupTypeImage, closeModal);
});

openModal(editButton, popupTypeEdit, closeModal);
openModal(addButton, popupTypeNewCard, closeModal);

const profileName = document.querySelector('.profile__title').textContent;
const jobDescription = document.querySelector('.profile__description').textContent;

const inputName = document.querySelector('.popup__input_type_name');
inputName.placeholder = profileName;

const inputDescription = document.querySelector('.popup__input_type_description');
inputDescription.placeholder = jobDescription;


// Находим форму в DOM
const profileFormElement = document.querySelector('.popup_type_edit .popup__form[name="edit-profile"]');
const cardFormElement = document.querySelector('.popup_type_new-card .popup__form[name="new-place"]');

// Находим поля формы в DOM
const profileNameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardFormElement.querySelector('.popup__input_type_url');

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const profileNameValue = profileNameInput.value;
    const jobTextValue = jobInput.value;

    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    profileTitle.textContent = profileNameValue;
    profileDescription.textContent = jobTextValue;

    closeModal(popupTypeEdit);
    profileFormElement.reset();
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const cardNameValue = cardNameInput.value;
    const cardUrlValue = cardUrlInput.value;
    console.log(cardNameValue, cardUrlValue);

    const cardData = {
        name: cardNameValue,
        link: cardUrlValue,
    };

    const cardElement = createCard(cardData, deleteCard, likeCard, imagePopup, popupTypeImage);
    places.prepend(cardElement);

    const cardImage = cardElement.querySelector('.card__image');
    openModal(cardImage, popupTypeImage, closeModal);

    closeModal(popupTypeNewCard);
    cardFormElement.reset();
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);