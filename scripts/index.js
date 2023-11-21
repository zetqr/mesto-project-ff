// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const places = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(card, callBackFunction) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__image').src = card.link;

    const deleteButton = cardElement.querySelector('.card__delete-button');

    deleteButton.addEventListener('click', function () {
        callBackFunction(cardElement);
    });

    return cardElement;
};

// @todo: Функция удаления карточки
function deleteCard(elem) {
    elem.remove();
};

// @todo: Вывести карточки на страницу
const len = initialCards.length;

initialCards.forEach((cardElement) => {
    const card = createCard(cardElement, deleteCard);
    places.append(card);
});