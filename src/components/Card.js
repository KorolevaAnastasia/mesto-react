import React from "react";

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card)
  }

  return(
    <article className="card">
      <button type="button" aria-label="Удалить" className="card__delete-button"></button>
      <img className="card__img" src={props.link} alt="Изображение" onClick={handleClick}/>
        <div className="card__group">
          <h2 className="card__name">{props.name}</h2>
          <div className="card__like-block">
            <button type="button" aria-label="Лайк" className="card__like-button"></button>
            <span className="card__like-counter">{props.likes}</span>
          </div>
        </div>
    </article>
  )
}

export default Card;
