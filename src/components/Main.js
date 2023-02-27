import React, {useEffect, useState} from 'react';
import api from "../utils/api";
import PopupWithForm from "./PopupWithForm";
import Card from "./Card";

function Main(props) {
  const [cards, setCards] = useState([]);
  const [userData, setUserInfo] = useState({
    userName: '',
    userAvatar: '',
    userDescription: '',
  });


  useEffect(() => {
    Promise.all([api.getUserProfileData(), api.getInitialCards()]).then(([profileInfo, card]) => {
      setUserInfo({
        userName: profileInfo.name,
        userAvatar: profileInfo.avatar,
        userDescription: profileInfo.about});
      setCards(card);
    }).catch((err) => {
      console.error(err);
    })
  }, [])


  return (
    <>
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-block">
          <div className="profile__overlay"
               onClick={props.onEditAvatar}>
          </div>
          <img className="profile__avatar"
               src={userData.userAvatar}
               alt="Фотография профиля пользователя" />
        </div>
        <div className="profile__info">
          <div className="profile__edit">
            <h1 className="profile__name">{userData.userName}</h1>
            <button aria-label="Редактировать"
                    type="button"
                    className="profile__edit-button"
                    onClick={props.onEditProfile}>
            </button>
          </div>
        <p className="profile__job">{userData.userDescription}</p>
        </div>
        <button aria-label="Добавить"
                type="button"
                className="profile__card-button"
                onClick={props.onAddPlace}></button>
      </section>

      <section className="cards">
        {cards.map((card, id) => (
          <Card
            card={card}
            key={id}
            name={card.name}
            link={card.link}
            likes={card.likes.length}
            onCardClick={props.onCardClick}
          />
        ))}
      </section>
    </main>

    <PopupWithForm
        title = 'Редактировать профиль'
        name = 'profile'
        buttonText = 'Сохранить'
    >
      <label className="popup__field">
        <input id="name-input" name="name" className="popup__input popup__input_type_name"
               type="text" placeholder="Имя" required minLength="2" maxLength="40"/>
          <span className="name-input-error popup__error"></span>
      </label>
      <label className="popup__field">
        <input id="job-input" name="about" className="popup__input popup__input_type_job"
               type="text" placeholder="Род деятельности" required minLength="2" maxLength="200"/>
          <span className="job-input-error popup__error"></span>
      </label>
    </PopupWithForm>

    </>
  );
}

export default Main;
