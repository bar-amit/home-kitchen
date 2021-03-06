class Validation {
  constructor(configuration, form) {
    this._form = form;

    // selectors
    this._inputSelector = configuration.inputSelector;
    this._submitButtonSelector = configuration.submitButtonSelector;

    // classes
    this._inactiveButtonClass = configuration.inactiveButtonClass;
    this._inputErrorClass = configuration.inputErrorClass;
    this._errorClass = configuration.errorClass;

    this._boundHandleInput = this._handleInput.bind(this);
  }

  enableValidation() {
    this._inputElements = this._form.querySelectorAll(this._inputSelector);
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);

    this._setEventListeners();
  }

  resetValidation() {
    this._inputElements.forEach(input=>{
      this._hideError(input);
    });
    this._disableButton();
  }

  _handleInput(e){
    this._isValid(e.target);
    this._setButtonState();
  }

  _isValid(input) {
    if(input.validity.valid){
      this._hideError(input);
    }
    else{
      this._showError(input);
    }
  }

  _hideError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = '';
    error.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
  }

  _showError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    error.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
  }

  _setEventListeners() {
    this._inputElements.forEach(input => input.addEventListener('input', this._boundHandleInput));
  }

  _setButtonState() {
    if(this._hasInvalidInput()) {
      this._disableButton();
    }
    else{
      this._enableButton();
    }
  }

  _hasInvalidInput() {
    return Array.from(this._inputElements).some(input=>!input.validity.valid);
  }

  _disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }
}
