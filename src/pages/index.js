import './index.css';

import {Api} from "../utils/api";
import {Card} from "../components/Card.js";
import {PopupWithImage} from "../components/old/PopupWithImage.js";
import {PopupWithForm} from "../components/old/PopupWithForm.js";
import {PopupWithConfirmation} from "../components/old/PopupWithConfirmation";
import {UserInfo} from "../components/old/UserInfo.js";
import {Section} from "../components/old/Section.js";
import {FormValidator} from "../components/old/FormValidator.js";
import * as data from "../utils/constants.js";

//valid
const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(data.formSettings);

//init_classes
const profileForm = new PopupWithForm('.popup-profile', handleSubmitProfileForm);
const imagePopup = new PopupWithImage('.popup-card-open');
const imageForm = new PopupWithForm('.popup-card', handleSubmitCardForm);
const avatarForm = new PopupWithForm('.popup-avatar', handleSubmitAvatarForm);
const cardRemovePopup = new PopupWithConfirmation('.popup-card-remove');

const profileData = new UserInfo({
  name: '.profile__name',
  about: '.profile__job',
  avatar: '.profile__avatar'
});

const cardSection = new Section({
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    }
  },
  '.cards'
);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: '9a4e62b7-8432-431f-95d5-19aef3b64d66',
    'Content-Type': 'application/json'
  }
});

//загрузка карточек и данных пользователя
let userId;
Promise.all([api.getUserProfileData(), api.getInitialCards()])
  .then(([userData, cards]) => {
    profileData.setUserInfo(userData);
    profileData.setUserAvatar(userData.avatar);
    userId = userData._id;

    cardSection.render(cards);
  })
  .catch(err => {
    console.log(err);
  });


//listeners
profileForm.setEventListeners();
imageForm.setEventListeners();
avatarForm.setEventListeners();
imagePopup.setEventListeners();
cardRemovePopup.setEventListeners();

data.cardAddButton.addEventListener('click', () => {
  openCardPopup();
});

data.profileEditButton.addEventListener('click', () => {
  openProfilePopup();
});

data.editProfileAvatarButton.addEventListener('click', () => {
  openAvatarPopup();
});

//func
function openCardPopup() {
  formValidators['card'].resetValidation();
  imageForm.open();
}

function openProfilePopup() {
  const currentProfileData = profileData.getUserInfo();
  profileForm.setInputValues(currentProfileData);
  formValidators['profile'].resetValidation();
  profileForm.open();
}

function openAvatarPopup() {
  formValidators['avatar'].resetValidation();
  avatarForm.open();
}
function createCard(item) {
  const newCard = new Card({
    object: item,
    templateSelector: '#default-card',
    handleCardRemove: () => {
      cardRemovePopup.addEvent(() => {
        api.removeCard(item._id)
          .then(() => {
            newCard.removeCard();
            cardRemovePopup.close();
          })
          .catch((err) => {
            console.log(err);
          });
      });
      cardRemovePopup.open();
    }
  }, handleCardClick, userId, api.likeCard.bind(api), api.dislikeCard.bind(api));
  return newCard.generateCard();
}

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

function handleSubmitCardForm(cardData) {
  return api.addCard(cardData)
    .then((res) => {
      const cardElement = createCard(res);
      cardSection.addItem(cardElement);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleSubmitAvatarForm(userData) {
  return api.changeUserProfileAvatar(userData)
    .then((res) => {
      profileData.setUserAvatar(res.avatar);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleSubmitProfileForm(data) {
  return api.updateUserProfileData(data)
    .then((res) => {
      profileData.setUserInfo(res);
    })
    .catch((err) => {
      console.log(err);
    });
}














