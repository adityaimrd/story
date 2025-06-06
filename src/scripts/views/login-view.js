import { getLoginTemplate } from '../../templates/pages/login-page.js';

class LoginView {
  render() {
    const main = document.querySelector('#main-content');
    main.innerHTML = getLoginTemplate();
  }

  bindSubmit(handler) {
    const form = document.getElementById('login-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        handler();
      });
    }
  }

  getFormData() {
    return {
      email: document.getElementById('email')?.value || '',
      password: document.getElementById('password')?.value || '',
    };
  }

  getSubmitButton() {
    return document.querySelector('#login-form button[type="submit"]');
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

export default LoginView;
