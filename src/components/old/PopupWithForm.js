import {Popup} from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._submitButton = this._popupForm.querySelector('.popup__button');
    this._popupButtonTextContent = this._submitButton.textContent;

    this._submitFormCallback = submitFormCallback;
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      this.renderDataLoading(true);
      this._submitFormCallback(this._getInputValues())
        .then(() => this.close())
        .finally(() => {
          this.renderDataLoading(false);
        })
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  renderDataLoading(isLoading) {
    if(isLoading)
      this._submitButton.textContent = 'Сохранение...';
    else
      this._submitButton.textContent = this._popupButtonTextContent;
  }
}
