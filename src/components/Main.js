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
                    onClick={props.onEditProfile}/>
          </div>
        <p className="profile__job">{userData.userDescription}</p>
        </div>
        <button aria-label="Добавить"
                type="button"
                className="profile__card-button"
                onClick={props.onAddPlace}/>
      </section>

      <section className="cards">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            name={card.name}
            link={card.link}
            likes={card.likes.length}
            onCardClick={props.onCardClick}
          />
        ))}
      </section>
    </main>

    </>
  );
}

export default Main;
