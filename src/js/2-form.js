const formElem = document.querySelector('.feedback-form');
const KeyLocalStorage = "feedback-form-state";

formElem.addEventListener('input', processFormInput);

function processFormInput(event) {
    const email = formElem.elements.email.value.trim();
    const message = formElem.elements.message.value.trim();
    const data = { email, message };
    saveToLS(KeyLocalStorage, data);
}

function saveToLS(key, info) {
    const jsonString = JSON.stringify(info);
    localStorage.setItem(key, jsonString);
}

formElem.addEventListener('submit', processFormSubmit);

function processFormSubmit(event) {
    event.preventDefault();

    const email = formElem.elements.email.value;
    const message = formElem.elements.message.value;
    const data = { email, message };

    if (!email || !message) {
        alert('All form fields must be filled in');
        return;
    }

    console.log(data);

    localStorage.removeItem(KeyLocalStorage);
    formElem.reset();
}

function loadFromLocalStorage(KeyLocalStorage) {
    const jsonString = localStorage.getItem(KeyLocalStorage);
    try {
        const data = JSON.parse(jsonString);
        return data;
    } catch {
        return jsonString;
    }
}

function restoreData() {
    const data = loadFromLocalStorage(KeyLocalStorage) || {};
    formElem.elements.email.value = data.email || '';
    formElem.elements.message.value = data.message || '';
}

restoreData();
