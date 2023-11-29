/* в файле index.js описана инициализация приложения и 
основная логика страницы: поиск DOM-элементов на странице 
и навешивание на них обработчиков событий; обработчики отправки форм, 
функция-обработчик события открытия модального окна для редактирования 
профиля; функция открытия модального окна изображения карточки. 
Также в index.js находится код, который отвечает 
за отображение шести карточек при открытии страницы.*/
import '../pages/index.css';
import {createCard, deleteCard, initialCards} from '../components/cards.js';


// выбрать элемент, в ктором будут находиться карточки
const places = document.querySelector('.places__list');

// Вывод карточки на страницу
initialCards.forEach((cardElement) => {
    const card = createCard(cardElement, deleteCard);
    places.append(card);
});