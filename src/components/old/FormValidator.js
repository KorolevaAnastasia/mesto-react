export class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
    this._submitButton = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
  }

  showInputError(inputElement)  {
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    this._errorElement.classList.add(this._validationConfig.errorClass);
    this._errorElement.textContent = inputElement.validationMessage;
  }

  hideInputError(inputElement)  {
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    this._errorElement.classList.remove(this._validationConfig.errorClass);
    this._errorElement.textContent = '';
  }

  disableButton() {
    this._submitButton.classList.add(this._validationConfig.inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  enableButton() {
    this._submitButton.classList.remove(this._validationConfig.inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  hasInvalidInput() {
    return this._inputList.some(input => !input.validity.valid)
  };

  toggleSubmitButton()  {
    if(this.hasInvalidInput(this._inputList)) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this.showInputError(inputElement);
    } else {
      this.hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    this.toggleSubmitButton();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleSubmitButton();
      });
    });
  }

  resetValidation() {
    this.toggleSubmitButton();
    this._inputList.forEach((inputElement) => {
      this.hideInputError(inputElement);
    });
  }

  enableValidation()  {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

