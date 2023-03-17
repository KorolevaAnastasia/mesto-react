import React, {useEffect, useState} from 'react';

import api from "../utils/api";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import SubmitPopup from "./SubmitPopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isSubmitPopupOpen, setSubmitPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setUserInfo] = React.useState({});
  const [cards, setCards] = useState([]);
  const [cardRemove, setCardRemove] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    Promise.all([api.getUserProfileData(), api.getInitialCards()]).then(([profileInfo, cards]) => {
      setUserInfo(profileInfo);
      setCards(cards);
    }).catch((err) => {
      console.error(err);
    })
  }, [])

  useEffect(() => {
    if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || selectedCard || isSubmitPopupOpen) {
      document.addEventListener('keydown', handleEscClose);
    }
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, selectedCard, isSubmitPopupOpen]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => {
      console.error(err);
    });
  }

  function handleCardDelete(evt) {
    evt.preventDefault();
    setIsLoading(true);
    api.removeCard(cardRemove._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== cardRemove._id && c));
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  function handleSubmitCardDelete(card) {
    setSubmitPopupOpen(true);
    setCardRemove(card);
  }

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api.updateUserProfileData(userData).then((profileInfo) => {
      setUserInfo(profileInfo);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  function handleUpdateAvatar(avatarData) {
    setIsLoading(true);
    api.changeUserProfileAvatar(avatarData).then((profileInfo) => {
      setUserInfo(profileInfo);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  function handleAddPlace(cardData) {
    setIsLoading(true);
    api.addCard(cardData).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    }).finally(() => {
      setIsLoading(false);
    });
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

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSubmitPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          cards={cards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDeleteClick={handleSubmitCardDelete}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClose}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClose}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClose}
          isLoading={isLoading}
          >
        </EditAvatarPopup>

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlace}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClose}
          isLoading={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClose}
        />

        <SubmitPopup
          title={'Вы уверены?'}
          name={'card-remove'}
          buttonText={'Да'}
          loadingButtonText={'Удаление...'}
          isOpen={isSubmitPopupOpen}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClose}
          onSubmit={handleCardDelete}
          isLoading={isLoading}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
