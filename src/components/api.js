const cohortId = 'cohort-magistr-2';
const token = 'e7197b85-e9f2-4f73-a9cc-2709e19cf375';
const appJson = 'application/json';

const config = {
    baseUrl: `https://mesto.nomoreparties.co/v1/${cohortId}`,
    headers: {
        authorization: token,
        'Content-Type': appJson
    }
};

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    }).then(getResponseData);
  }
  
  export const setUserInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(getResponseData);
  }
  
  export const getCardsDefault = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    }).then(getResponseData)
  }
  
  export const setCard = ({name, link}) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })
    }).then(getResponseData);
  }
  
  export const removeCardApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    }).then(getResponseData);
  }
  
  export const likeCardApi = (cardId, like) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: `${like ? 'PUT' : 'DELETE'}`,
      headers: config.headers
    }).then(getResponseData);
  }
  
  export const setAvatar = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: link,
      })
    }).then(getResponseData);
  }
  
  
  function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }