// выбрать темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// выбрать элемент, в ктором будут находиться карточки
const places = document.querySelector('.places__list');

// Функция создания карточки
function createCard(card, deleteCardFunction) {

    // DOM узлы
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');

    deleteButton.addEventListener('click', function () {
        deleteCardFunction(cardElement);
    });

    return cardElement;
};

// Функция удаления карточки
function deleteCard(elem) {
    elem.remove();
};

// Вывод карточки на страницу
initialCards.forEach((cardElement) => {
    const card = createCard(cardElement, deleteCard);
    places.append(card);
});