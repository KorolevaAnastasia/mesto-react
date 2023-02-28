import React, {useEffect, useState} from 'react';

import api from "../utils/api";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEscClose(evt) {
    if (evt.code === 'Escape')
      closeAllPopups();
  }

  function handleOverlayClose() {
      closeAllPopups();
  }

  useEffect(() => {
    if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || selectedCard) {
      document.addEventListener('keydown', handleEscClose);
    }
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, selectedCard]);

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <ImagePopup
        card={selectedCard}
        onClose={() => {
          closeAllPopups()
        }}
        onOverlayClick={() => {
          handleOverlayClose()
        }}
      />

      <PopupWithForm
        title={'Редактировать профиль'}
        name={'profile'}
        buttonText={'Сохранить'}
        isOpen={isEditProfilePopupOpen}
        onClose={() => {
          closeAllPopups()
        }}
        onOverlayClick={() => {
          handleOverlayClose()
        }}
      >
        <label className="popup__field">
          <input id="name-input"
                 name="name"
                 className="popup__input popup__input_type_name"
                 type="text"
                 placeholder="Имя"
                 required
                 minLength="2" maxLength="40" />
          <span className="name-input-error popup__error"/>
        </label>
        <label className="popup__field">
          <input id="job-input"
                 name="about"
                 className="popup__input popup__input_type_job"
                 type="text"
                 placeholder="Род деятельности"
                 required
                 minLength="2" maxLength="200" />
          <span className="job-input-error popup__error"/>
        </label>
      </PopupWithForm>

      <PopupWithForm
        title={'Обновить аватар'}
        name={'avatar'}
        buttonText={'Сохранить'}
        isOpen={isEditAvatarPopupOpen}
        onClose={() => {
          closeAllPopups()
        }}
        onOverlayClick={() => {
          handleOverlayClose()
        }}
      >
        <label className="popup__field">
          <input id="avatar-input"
                 name="avatar"
                 className="popup__input popup__input_type_avatar"
                 type="url"
                 placeholder="Ссылка на картинку"
                 required />
            <span className="avatar-input-error popup__error"/>
        </label>
      </PopupWithForm>

      <PopupWithForm
        title={'Новое место'}
        name={'card'}
        buttonText={'Создать'}
        isOpen={isAddPlacePopupOpen}
        onClose={() => {
          closeAllPopups()
        }}
        onOverlayClick={() => {
          handleOverlayClose()
        }}
      >
        <label className="popup__field">
          <input id="card-input"
                 name="name"
                 className="popup__input popup__input_type_card"
                 type="text"
                 placeholder="Название"
                 required
                 minLength="2" maxLength="30" />
            <span className="card-input-error popup__error"/>
        </label>
        <label className="popup__field">
          <input id="link-input"
                 name="link"
                 className="popup__input popup__input_type_link"
                 type="url"
                 placeholder="Ссылка на картинку"
                 required />
            <span className="link-input-error popup__error"/>
        </label>
      </PopupWithForm>

      <PopupWithForm
        title = 'Редактировать профиль'
        name = 'profile'
        buttonText = 'Сохранить'
        onClose={() => {
          closeAllPopups()
        }}
        onOverlayClick={() => {
          handleOverlayClose()
        }}
      >
        <label className="popup__field">
          <input id="name-input"
                 name="name"
                 className="popup__input popup__input_type_name"
                 type="text"
                 placeholder="Имя"
                 required
                 minLength="2" maxLength="40"/>
          <span className="name-input-error popup__error"/>
        </label>
        <label className="popup__field">
          <input id="job-input"
                 name="about"
                 className="popup__input popup__input_type_job"
                 type="text"
                 placeholder="Род деятельности"
                 required
                 minLength="2" maxLength="200"/>
          <span className="job-input-error popup__error"/>
        </label>
      </PopupWithForm>

      <PopupWithForm
        title={'Вы уверены?'}
        name={'card-remove'}
        buttonText={'Да'}
        onClose={() => {
          closeAllPopups()
        }}
        onOverlayClick={() => {
          handleOverlayClose()
        }}
      />

    </div>
  );
}

export default App;
