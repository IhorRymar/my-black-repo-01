import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  input: document.querySelector('.feedback-form input'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));
refs.input.addEventListener('input', throttle(onInput, 500));

refs.form.addEventListener('input', e => {
  formData[e.target.name] = e.target.value;
  const formDataJSON = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, formDataJSON);

  // console.log(formData);
  // console.log(formDataJSON);
});

populateTextarea();
populateInput();

function onFormSubmit(e) {
  e.preventDefault();

  const formElements = e.currentTarget.elements;

  const mail = formElements.email.value;
  const textarea = formElements.message.value;

  if (mail === '' || textarea === '') {
    return alert('Введіть Вашу пошту та повідомлення!');
  } else {
    const formData = {
      mail,
      textarea,
    };
    console.log(formData);
  }

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(e) {
  const message = e.target.value;
  localStorage.setItem(STORAGE_KEY, message);
}

function populateTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessage) {
    refs.textarea.value = savedMessage.message;
  }
}

function onInput(e) {
  const email = e.target.value;
  localStorage.setItem(STORAGE_KEY, email);
}

function populateInput() {
  const savedEmail = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedEmail) {
    refs.input.value = savedEmail.email;
  }
}
