import '../pages/index.css';
import {createCard, deleteCard, initialCards} from '../components/cards.js';
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

// make popup image showup
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
const profileFormElement = document.querySelector('.popup_type_edit .popup__form[name="edit-profile"]'); // Воспользуйтесь методом querySelector()
const cardFormElement = document.querySelector('.popup_type_new-card .popup__form[name="new-place"]');

// Находим поля формы в DOM
const profileNameInput = profileFormElement.querySelector('.popup__input_type_name'); // Воспользуйтесь инструментом .querySelector()
const jobInput = profileFormElement.querySelector('.popup__input_type_description'); // Воспользуйтесь инструментом .querySelector()
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardFormElement.querySelector('.popup__input_type_url');


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    const profileNameValue = profileNameInput.value; // Получите значение полей jobInput и nameInput из свойства value
    const jobTextValue = jobInput.value;

    const cardNameValue = cardNameInput.value;
    const cardUrlValue = cardUrlInput.value;
    console.log(cardNameValue, cardUrlValue);


    // Выберите элементы, куда должны быть вставлены значения полей
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    const cardData = {
      name: cardNameValue,
      link: cardUrlValue,
  };


    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = profileNameValue;
    profileDescription.textContent = jobTextValue;

    // create card on submit
    const cardElement = createCard(cardData, deleteCard);
    places.append(cardElement);

    // make it so newly added image popsup on click
    const cardImage = cardElement.querySelector('.card__image');
    openModal(cardImage, popupTypeImage, closeModal);

    closeModal(popupTypeNewCard);
    cardFormElement.reset();
    closeModal(popupTypeEdit);
    profileFormElement.reset();

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileFormElement.addEventListener('submit', handleFormSubmit);
cardFormElement.addEventListener('submit', handleFormSubmit);







/* в файле index.js описана инициализация приложения и 
основная логика страницы: поиск DOM-элементов на странице 
и навешивание на них обработчиков событий; обработчики отправки форм, 
функция-обработчик события открытия модального окна для редактирования 
профиля; функция открытия модального окна изображения карточки. 
Также в index.js находится код, который отвечает 
за отображение шести карточек при открытии страницы.*/