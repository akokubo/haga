/* global nameValue, nextValue */

function restoreSessionStorage() {
  const input = sessionStorage.getItem(nameValue);
  const inputElement = document.querySelector(`input[name="${nameValue}"]`);
  if (input && inputElement) {
    inputElement.value = input;
  }
}

function activateSubmit() {
  const inputElement = document.querySelector(`input[name="${nameValue}"]`);
  const submitButton = document.getElementById('submit');
  if (inputElement && submitButton) {
    const input = inputElement.value;
    submitButton.disabled = !input;
  }
}

const entries = performance.getEntriesByType('navigation');
entries.forEach(() => {
  restoreSessionStorage(nameValue);
  activateSubmit(nameValue);
});

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('input', (e) => {
    if (e.target.matches(`input[name="${nameValue}"]`)) {
      activateSubmit(nameValue);
    }
  });

  const submitButton = document.getElementById('submit');
  if (submitButton) {
    submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      const inputElement = document.querySelector(`input[name="${nameValue}"]`);
      if (inputElement) {
        const input = inputElement.value;
        sessionStorage.setItem(nameValue, input);
        document.location.href = `${nextValue}.html`;
      }
    });
  }
});
