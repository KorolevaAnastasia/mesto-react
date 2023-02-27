import {Popup} from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardImg = this._popup.querySelector('.popup__card-img');
    this._cardDesc = this._popup.querySelector('.popup__card-description');
  }

  open(name, link) {
    super.open();
    this._cardImg.src = link;
    this._cardImg.alt = name;
    this._cardDesc.textContent = name;
  }
}
