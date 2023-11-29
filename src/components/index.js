/* в файле index.js описана инициализация приложения и 
основная логика страницы: поиск DOM-элементов на странице 
и навешивание на них обработчиков событий; обработчики отправки форм, 
функция-обработчик события открытия модального окна для редактирования 
профиля; функция открытия модального окна изображения карточки. 
Также в index.js находится код, который отвечает 
за отображение шести карточек при открытии страницы.*/
import '../pages/index.css';
import {createCard, deleteCard} from '../components/cards.js';
import initialCards from './imageData.js';
import {openModal, closeModal} from './modal.js';


// dom elements
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// popup elements
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupCloseButton = document.querySelector('.popup__close');


// выбрать элемент, в ктором будут находиться карточки
const places = document.querySelector('.places__list');

// Вывод карточки на страницу
initialCards.forEach((cardElement) => {
    const card = createCard(cardElement, deleteCard);
    places.append(card);
});

const cardImage = document.querySelectorAll('.card__image');
cardImage.forEach((image) => {
    openModal(image, popupTypeImage, closeModal);
});

openModal(editButton, popupTypeEdit, closeModal);
openModal(addButton, popupTypeNewCard, closeModal);
