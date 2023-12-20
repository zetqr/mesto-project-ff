function showError(formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
}

function hideError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement, config) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideError(formElement, inputElement, config);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function disableSubmitButton(buttonElement, config) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
}

function enableSubmitButton(buttonElement, config) {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
}

function toggleButtonState(inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
        disableSubmitButton(buttonElement, config);
    } else {
        enableSubmitButton(buttonElement, config);
    }
}

function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            toggleButtonState(inputList, buttonElement, config);
            checkInputValidity(formElement, inputElement, config);
        });
    });
}

export function enableValidation(config) {
    const forms = Array.from(document.querySelectorAll(config.formSelector));
    forms.forEach((formElement) => {
        setEventListeners(formElement, config);
    });
}

export function clearValidation(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    inputList.forEach((inputElement) => {
        hideError(formElement, inputElement, config);
    });
    disableSubmitButton(buttonElement, config);
}
