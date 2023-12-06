import '../pages/index.css';
import {createCard, deleteCard, likeCard} from './card.js';
import { initialCards } from './cardsData.js';
import {openModal, closeModal, setCloseModalWindowEventListeners} from './modal.js';

/** profile editor popup dom elements */
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileCloseButton = popupTypeEdit.querySelector('.popup__close');

/** card creation popup dom elements */
const addNewCardButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const cardCloseButton = popupTypeNewCard.querySelector('.popup__close');

/** images dom elements */
const popupTypeImage = document.querySelector('.popup_type_image');
const cardImageCloseButton = popupTypeImage.querySelector('.popup__close');

const placesContainer = document.querySelector('.places__list');

/** popup image dom elements */
const imageElement = popupTypeImage.querySelector('.popup__image'); 
const imageElementTitle = popupTypeImage.querySelector('.popup__caption');

/** image popup function declaration */
/**
 * function to open image popup and path the image data to dom element.
 * @constructor
 * @param {string} imageSrc - Image link.
 * @param {string} imageTitle - Image name.
 */
export function openPopupTypeImage(imageSrc, imageTitle) {
    imageElement.src = imageSrc;
    imageElement.alt = imageTitle;
    imageElementTitle.textContent = imageTitle;
    openModal(popupTypeImage);
};

/** initilize placeholder cards with create card function and add them to the dom */
initialCards.forEach((cardElement) => { 
    const card = createCard(cardElement, deleteCard, likeCard, openPopupTypeImage); 
    placesContainer.append(card); 
}); 

/** EVENT OPEN for button to edit profile */
profileEditButton.addEventListener('click', () => {
    openModal(popupTypeEdit);

    // make sure profile date stays in the form on every click
});

/** EVENT OPEN for button to create new card */
addNewCardButton.addEventListener('click', () => {
    openModal(popupTypeNewCard);
});

/** EVENT CLOSE for edit profile */
profileCloseButton.addEventListener('click', () => {
    closeModal(popupTypeEdit);
});

/** EVENT CLOSE for create new card */
cardCloseButton.addEventListener('click', () => {
    closeModal(popupTypeNewCard);
});

/** EVENT CLOSE for image card popup */
cardImageCloseButton.addEventListener('click', () => {
    closeModal(popupTypeImage);
});

setCloseModalWindowEventListeners(popupTypeImage);

const profileName = document.querySelector('.profile__title').textContent;
const jobDescription = document.querySelector('.profile__description').textContent;

/** make sure placeholder is updated after new values */
const inputName = document.querySelector('.popup__input_type_name');
inputName.value = profileName;

const inputDescription = document.querySelector('.popup__input_type_description');
inputDescription.value = jobDescription;

const profileFormElement = document.querySelector('.popup_type_edit .popup__form[name="edit-profile"]');
const cardFormElement = document.querySelector('.popup_type_new-card .popup__form[name="new-place"]');

const profileNameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardFormElement.querySelector('.popup__input_type_url');

/** submit for profile edit button */
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const profileNameValue = profileNameInput.value;
    const jobTextValue = jobInput.value;
    profileTitle.textContent = profileNameValue;
    profileDescription.textContent = jobTextValue;

    closeModal(popupTypeEdit);
}

/** submit for card form edit button */
function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const cardNameValue = cardNameInput.value;
    const cardUrlValue = cardUrlInput.value;

    const cardData = {
        name: cardNameValue,
        link: cardUrlValue,
    };

    const cardElement = createCard(cardData, deleteCard, likeCard, openPopupTypeImage);
    placesContainer.prepend(cardElement);

    closeModal(popupTypeNewCard);
    cardFormElement.reset();
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);