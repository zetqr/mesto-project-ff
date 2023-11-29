// выбрать темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

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

// MAKE AN EXPORT OF CARDS
export {createCard, deleteCard}
// also create like and delete functions in here and export them


// в файле card.js описаны функции для работы с карточками: 
//функция создания карточки, 
//функции-обработчики событий удаления и лайка карточки;
//описан массив карточек, отображаемых на странице;
