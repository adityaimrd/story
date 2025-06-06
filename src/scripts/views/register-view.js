import { getRegisterTemplate } from '../../templates/pages/register-page.js';

class RegisterView {
  render() {
    const main = document.querySelector('#main-content');
    main.innerHTML = getRegisterTemplate();
  }

  bindSubmit(handler) {
    const form = document.getElementById('register-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        handler();
      });
    }
  }

  getFormData() {
    return {
      name: document.getElementById('name')?.value || '',
      email: document.getElementById('email')?.value || '',
      password: document.getElementById('password')?.value || '',
    };
  }

  getSubmitButton() {
    return document.querySelector('#register-form button[type="submit"]');
  }

  showAlert(message) {
    alert(message);
  }

  showButtonLoading(button) {
    if (!button) return '';
    
    const originalText = button.innerHTML;
    button.classList.add('button-loading', 'disabled-button');
    const span = document.createElement('span');
    span.textContent = button.textContent;
    button.innerHTML = '';
    button.appendChild(span);
    return originalText;
  }

  hideButtonLoading(button, originalText) {
    if (!button) return;
    
    button.classList.remove('button-loading', 'disabled-button');
    button.innerHTML = originalText;
  }
}

export default RegisterView;
