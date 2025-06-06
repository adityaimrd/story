import LoginView from '../views/login-view.js';
import API from '../data/api.js';

class LoginPresenter {
  constructor() {
    this._view = new LoginView();
  }

  async show() {
    this._view.render();
    this._setupEventListeners();
  }

  _setupEventListeners() {
    this._view.bindSubmit(async () => {
      const { email, password } = this._view.getFormData();
      const submitButton = this._view.getSubmitButton();
      let originalText = '';

      try {
        originalText = this._view.showButtonLoading(submitButton) || submitButton.innerHTML;

        const { error, message, loginResult } = await API.login({ email, password });

        if (error) {
          throw new Error(message);
        }

        localStorage.setItem('token', loginResult.token);
        localStorage.setItem('user', JSON.stringify({
          id: loginResult.userId,
          name: loginResult.name,
        }));

        window.location.hash = '#/home';
      } catch (error) {
        this._view.showAlert(`Login failed: ${error.message}`);
      } finally {
        this._view.hideButtonLoading(submitButton, originalText);
      }
    });
  }
}

export default LoginPresenter;
