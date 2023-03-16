class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(
      this._url + '/cards', {
      method: 'GET',
      headers: this._headers
    }).then(res => this._checkStatus(res));
  }

  getUserProfileData() {
    return fetch(
      this._url + '/users/me', {
        method: 'GET',
        headers: this._headers
      }).then(res => this._checkStatus(res));
  }

  updateUserProfileData(userData) {
    return fetch(
      this._url + '/users/me', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: userData.name,
          about: userData.about
        })
      }).then(res => this._checkStatus(res));
  }

  changeUserProfileAvatar(avatarData){
    return fetch(
      this._url + '/users/me/avatar', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatarData.avatar,
        })
      }).then(res => this._checkStatus(res));
  }

  addCard(cardData){
    return fetch(
      this._url + '/cards', {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: cardData.name,
          link: cardData.link
        })
      }).then(res => this._checkStatus(res));
  }

  removeCard(cardId){
    return fetch(
      this._url + `/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      }).then(res => this._checkStatus(res));
  }

  likeCard(cardId){
    return fetch(
      this._url + `/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      }).then(res => this._checkStatus(res));
  }

  dislikeCard(cardId){
    return fetch(
      this._url + `/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      }).then(res => this._checkStatus(res));
  }

  changeLikeCardStatus(cardId, isLiked){
    if (isLiked) {
      return this.dislikeCard(cardId);
    } else {
      return this.likeCard(cardId);
    }
  }

  _checkStatus(res) {
    if (res.ok)
      return res.json();

    return Promise.reject(`Ошибка ${res.status}`);
  }

}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: '9a4e62b7-8432-431f-95d5-19aef3b64d66',
    'Content-Type': 'application/json'
  }
});
export default api;
