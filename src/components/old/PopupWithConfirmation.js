import {Popup} from "./Popup";

export class PopupWithConfirmation extends Popup{
  constructor(popupSelector) {
    super(popupSelector)
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  addEvent(event){
    this._handleSubmitCallback = event;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', e => {
      e.preventDefault()
      this._handleSubmitCallback();
    })
  }
}
